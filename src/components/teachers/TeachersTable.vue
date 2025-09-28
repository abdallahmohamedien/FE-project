<template>
  <div
    class="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-2xl font-sans"
  >
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8"
    >
      <h3 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
        Teacher Management
      </h3>

      <!-- Search Bar -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search teachers..."
        class="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
      />
    </div>

    <!-- Add Button -->
    <div class="mb-4 text-right">
      <button
        @click="openForm()"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
      >
        + Add Teacher
      </button>
    </div>

    <!-- Table Header -->
    <div
      class="hidden sm:grid grid-cols-4 md:grid-cols-5 text-left font-bold text-gray-600 uppercase tracking-wider h-12 bg-gray-100 rounded-lg px-4 items-center mb-2"
    >
      <div
        class="col-span-1 md:col-span-2 cursor-pointer"
        @click="sortBy('name')"
      >
        Name <span v-if="sortKey === 'name'">{{ sortAsc ? "⬆️" : "⬇️" }}</span>
      </div>
      <div class="cursor-pointer" @click="sortBy('subject')">
        Subject
        <span v-if="sortKey === 'subject'">{{ sortAsc ? "⬆️" : "⬇️" }}</span>
      </div>
      <div class="hidden md:block cursor-pointer" @click="sortBy('section')">
        Section
        <span v-if="sortKey === 'section'">{{ sortAsc ? "⬆️" : "⬇️" }}</span>
      </div>
      <div>Actions</div>
    </div>

    <!-- Table Body -->
    <transition-group name="list" tag="div" class="space-y-4">
      <div
        v-for="teacher in filteredTeachers"
        :key="teacher.id"
        class="flex flex-col sm:grid sm:grid-cols-4 md:grid-cols-5 text-left text-base p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
      >
        <!-- Mobile Layout -->
        <div class="flex items-center justify-between sm:hidden mb-2">
          <div class="font-bold text-gray-800">{{ teacher.name }}</div>
          <div class="flex gap-2 text-sm">
            <span class="text-gray-600">Subject: {{ teacher.subject }}</span>
            <span class="text-gray-600">Section: {{ teacher.section }}</span>
          </div>
        </div>

        <!-- Desktop Layout -->
        <div
          class="hidden sm:block col-span-1 md:col-span-2 font-medium text-gray-800"
        >
          {{ teacher.name }}
        </div>
        <div class="hidden sm:block text-gray-600">{{ teacher.subject }}</div>
        <div class="hidden md:block text-gray-600">{{ teacher.section }}</div>

        <!-- Actions -->
        <div class="mt-2 sm:mt-0 flex flex-col sm:flex-row gap-2">
          <button
            class="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-sm"
            @click="openForm(teacher)"
          >
            Edit
          </button>
          <button
            class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
            @click="removeTeacher(teacher.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </transition-group>

    <!-- Modal Form -->
    <div
      v-if="showForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">
          {{ editingTeacher ? "Edit Teacher" : "Add Teacher" }}
        </h2>

        <form @submit.prevent="saveTeacher">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Name</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Subject</label>
            <input
              v-model="form.subject"
              type="text"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Section</label>
            <input
              v-model="form.section"
              type="text"
              required
              class="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
            />
          </div>

          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="closeForm"
              class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeacherTable",
  data() {
    return {
      teachers: [
        { id: 1, name: "Ahmed Ali", subject: "Math", section: "A", exp: 2 },
        {
          id: 2,
          name: "Sara Mohamed",
          subject: "Physics",
          section: "B",
          exp: 1,
        },
        {
          id: 3,
          name: "Hassan Omar",
          subject: "Biology",
          section: "C",
          exp: 3,
        },
        {
          id: 4,
          name: "Laila Hassan",
          subject: "Chemistry",
          section: "A",
          exp: 0,
        },
      ],
      searchQuery: "",
      sortKey: "name",
      sortAsc: true,
      showForm: false,
      editingTeacher: null,
      form: { name: "", subject: "", section: "" },
    };
  },
  computed: {
    filteredTeachers() {
      let result = this.teachers.filter(
        (t) =>
          t.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          t.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          t.section.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      result.sort((a, b) => {
        let valA = a[this.sortKey];
        let valB = b[this.sortKey];
        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();
        if (valA < valB) return this.sortAsc ? -1 : 1;
        if (valA > valB) return this.sortAsc ? 1 : -1;
        return 0;
      });
      return result;
    },
  },
  methods: {
    increment(teacher) {
      teacher.exp += 1;
    },
    removeTeacher(id) {
      if (confirm("Are you sure you want to delete this teacher?")) {
        this.teachers = this.teachers.filter((t) => t.id !== id);
      }
    },
    openForm(teacher = null) {
      this.editingTeacher = teacher;
      this.form = teacher
        ? { ...teacher }
        : { name: "", subject: "", section: "" };
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.editingTeacher = null;
    },
    saveTeacher() {
      if (this.editingTeacher) {
        Object.assign(this.editingTeacher, this.form);
      } else {
        this.teachers.unshift({ ...this.form, id: Date.now(), exp: 0 });
      }
      this.closeForm();
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    },
  },
};
</script>

<style>
/* Transition styles for the list animation */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.list-move {
  transition: transform 0.5s ease;
}
</style>
