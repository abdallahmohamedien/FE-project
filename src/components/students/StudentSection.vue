<template>
  <div class="font-sans py-10">
    <div class="max-w-7xl mx-auto bg-white rounded-xl shadow-xl">
      <div class="p-4 sm:p-6 lg:p-8 space-y-6">
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div class="flex items-center gap-4">
            <h2 class="text-2xl font-extrabold text-gray-800">Students List</h2>

            <button
              v-if="userRole === 'admin' || userRole === 'teacher'"
              @click="onAddStudent"
              class="flex items-center px-4 py-2 rounded-lg text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Add Student
            </button>
          </div>

          <div class="flex flex-row items-center gap-3 w-full sm:w-auto">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by Name or Roll No."
              class="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            <button
              @click="resetData"
              class="text-sm px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition whitespace-nowrap"
            >
              Reset Data
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <div class="min-w-full">
            <div
              class="grid grid-cols-5 font-extrabold text-sm uppercase text-gray-600 bg-gray-50 border-b border-t border-gray-200 py-3 px-4 rounded-t-lg"
            >
              <button class="text-left" @click="sortBy('roll')">
                Roll no
                <span v-if="sortKey === 'roll'">{{ sortAsc ? "▲" : "▼" }}</span>
              </button>
              <button class="text-left" @click="sortBy('name')">
                Name
                <span v-if="sortKey === 'name'">{{ sortAsc ? "▲" : "▼" }}</span>
              </button>
              <button class="text-left" @click="sortBy('semester')">
                Semester
                <span v-if="sortKey === 'semester'">{{
                  sortAsc ? "▲" : "▼"
                }}</span>
              </button>
              <button class="text-left" @click="sortBy('section')">
                Section
                <span v-if="sortKey === 'section'">{{
                  sortAsc ? "▲" : "▼"
                }}</span>
              </button>
              <div class="text-left">Action</div>
            </div>

            <transition-group name="fade" tag="div">
              <div
                v-for="student in filteredSortedStudents"
                :key="student.id"
                class="grid grid-cols-5 text-sm items-center gap-2 px-4 py-3 border-b border-gray-100 hover:bg-indigo-50/50 transition duration-150"
              >
                <div class="font-medium text-gray-900">{{ student.roll }}</div>
                <div class="truncate text-gray-700">{{ student.name }}</div>
                <div class="text-gray-700">{{ student.semester }}</div>
                <div class="text-gray-700">{{ student.section }}</div>

                <div class="flex items-center space-x-2">
                  <ActionSec
                    :id="student.id"
                    :can-edit="userRole === 'admin' || userRole === 'teacher'"
                    :can-delete="userRole === 'admin'"
                    @view="onView"
                    @edit="onEdit"
                    @delete="onDelete"
                  />
                </div>
              </div>
            </transition-group>

            <div
              v-if="filteredSortedStudents.length === 0"
              class="text-center text-gray-500 py-10 border-t border-gray-200"
            >
              No students found matching your criteria.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ActionSec from "./ActionSec.vue"; 
import axios from "axios";
export default {
  name: "StudentSection",
  components: { ActionSec },
  data() {
    return {
      students: [],
      searchQuery: "",
      sortKey: "roll",
      sortAsc: true,
      showForm: false,
      editingStudent: null, 
      form: { id: null, name: "", roll: "", section: "", semester: "" },
    };
  },
  computed: {
    userRole() {
      return localStorage.getItem("userRole") || "guest";
    },

    filteredSortedStudents() {
      const q = this.searchQuery.trim().toLowerCase();

      const list = this.students.slice();

      const filtered = q
        ? list.filter((s) => {
            return (
              String(s.roll).toLowerCase().includes(q) ||
              String(s.semester).toLowerCase().includes(q) ||
              (s.section || "").toLowerCase().includes(q) ||
              (s.name || "").toLowerCase().includes(q)
            );
          })
        : list;

      const key = this.sortKey;
      const asc = this.sortAsc ? 1 : -1;
      return filtered.sort((a, b) => {
        const va = (a[key] ?? "").toString().toLowerCase();
        const vb = (b[key] ?? "").toString().toLowerCase();
        if (va < vb) return -1 * asc;
        if (va > vb) return 1 * asc;
        return 0;
      });
    },
  },
  methods: {
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    },
    onAddStudent() {
      alert("Navigating to Add Student Form/Modal...");
    },
    onView(id) {
      const s = this.students.find((x) => x.id === id);
      if (s) alert(`Viewing ${s.name}`);
    },
    onEdit(id) {
      const s = this.students.find((x) => x.id === id);
      if (s) alert(`Editing ${s.name}`);
    },
    async onDelete(id) {
      if (!confirm("Are you sure you want to delete this student?")) {
        return;
      }

      const token = localStorage.getItem("token");

      try {
        await axios.delete(`/api/students/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.students = this.students.filter((s) => s.id !== id);
        alert("Student deleted successfully!");
      } catch (e) {
        console.error("Failed to delete student:", e);
        alert("Error deleting student. Please check your permissions.");
        this.loadStudents();
      }
    },
    
    async saveStudent() {
      const token = localStorage.getItem("token");
      const studentData = { ...this.form };
      try {
        if (this.editingStudent) {
          await axios.put(`/api/students/${studentData.id}`, studentData, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert("Student updated successfully!");
        } else {
          await axios.post("/api/students", studentData, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert("Student added successfully!");
        }

        this.closeForm();
        this.loadStudents();
      } catch (e) {
        console.error(
          "Failed to save student:",
          e.response ? e.response.data : e
        );
        alert("Error saving student. Please check the data.");
      }
    },
    loadStudents() {
      let parsed = null;
      try {
        const raw = localStorage.getItem("students");
        if (raw) parsed = JSON.parse(raw);
      } catch (e) {
        parsed = null;
      }

      if (Array.isArray(parsed) && parsed.length >= 25) {
        this.students = parsed;
        return;
      }
      this.students = [
        {
          id: 1,
          roll: 1,
          name: "Abdelrhman Ehab Mosad",
          semester: 2,
          section: "B",
        },
        {
          id: 2,
          roll: 2,
          name: "Abdallah Elsayed Mohamedien",
          semester: 2,
          section: "B",
        },
        {
          id: 3,
          roll: 3,
          name: "Shiren Abdelwahab",
          semester: 2,
          section: "C",
        },
        { id: 4, roll: 4, name: "Hamada Ebrahim", semester: 2, section: "D" },
        { id: 5, roll: 5, name: "Sara Ahmed", semester: 1, section: "A" },
        { id: 6, roll: 6, name: "Mostafa Mahmoud", semester: 1, section: "A" },
        { id: 7, roll: 7, name: "Aya Ali", semester: 3, section: "B" },
        { id: 8, roll: 8, name: "Omar Khaled", semester: 3, section: "C" },
        { id: 9, roll: 9, name: "Nourhan Mohamed", semester: 4, section: "A" },
        { id: 10, roll: 10, name: "Mahmoud Tarek", semester: 4, section: "B" },
        { id: 11, roll: 11, name: "Fatma Hassan", semester: 1, section: "C" },
        { id: 12, roll: 12, name: "Karim Saad", semester: 2, section: "D" },
        { id: 13, roll: 13, name: "Hossam Magdy", semester: 2, section: "A" },
        { id: 14, roll: 14, name: "Mona Adel", semester: 3, section: "B" },
        {
          id: 15,
          roll: 15,
          name: "Youssef Ibrahim",
          semester: 3,
          section: "C",
        },
        { id: 16, roll: 16, name: "Laila Mohamed", semester: 4, section: "D" },
        { id: 17, roll: 17, name: "Ali Hassan", semester: 1, section: "A" },
        { id: 18, roll: 18, name: "Rana Ashraf", semester: 2, section: "B" },
        { id: 19, roll: 19, name: "Tamer Reda", semester: 3, section: "C" },
        { id: 20, roll: 20, name: "Dina Salah", semester: 4, section: "D" },
        { id: 21, roll: 21, name: "Mohamed Yasser", semester: 2, section: "A" },
        { id: 22, roll: 22, name: "Salma Nabil", semester: 3, section: "B" },
        { id: 23, roll: 23, name: "Ibrahim Adel", semester: 1, section: "C" },
        { id: 24, roll: 24, name: "Hagar Mostafa", semester: 2, section: "D" },
        { id: 25, roll: 25, name: "Yasmin Fathy", semester: 4, section: "B" },
      ];
      this.saveStudents();
    },
    resetData() {
      localStorage.removeItem("students");
      this.loadStudents();
    },
  },
  created() {
    this.loadStudents();
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
