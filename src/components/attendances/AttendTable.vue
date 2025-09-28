<template>
  <div class="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-2xl font-sans">
    
    <div class="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
      <h3 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Daily Attendance Tracker</h3>
      
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search students..."
        class="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
      />
    </div>

    <div class="mb-4 text-right">
      <button
        @click="openForm()"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
      >
        + Add Student
      </button>
    </div>
    
    <div class="hidden sm:grid grid-cols-5 text-left font-bold text-gray-600 uppercase tracking-wider h-12 bg-gray-100 rounded-lg px-4 items-center mb-2">
      <div class="col-span-2 cursor-pointer" @click="sortBy('name')">
        Name <span v-if="sortKey==='name'">{{ sortAsc ? '⬆️' : '⬇️' }}</span>
      </div>
      <div class="cursor-pointer" @click="sortBy('section')">
        Section <span v-if="sortKey==='section'">{{ sortAsc ? '⬆️' : '⬇️' }}</span>
      </div>
      <div class="cursor-pointer" @click="sortBy('status')">
        Status <span v-if="sortKey==='status'">{{ sortAsc ? '⬆️' : '⬇️' }}</span>
      </div>
      <div>Actions</div>
    </div>

    <transition-group name="list" tag="div" class="space-y-4">
      <div 
        v-for="record in filteredRecords" 
        :key="record.id" 
        class="flex flex-col sm:grid sm:grid-cols-5 text-left text-base p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
      >
        <div class="col-span-2 font-medium text-gray-800 truncate">
             <span class="sm:hidden text-xs text-gray-500 block mb-1">Student:</span>
            {{ record.name }}
        </div>
        
        <div class="text-gray-600 mb-2 sm:mb-0">
            <span class="sm:hidden font-semibold">Section: </span>{{ record.section }}
        </div>
        
        <div class="flex flex-col sm:flex-row items-baseline gap-2 mb-2 sm:mb-0">
          <span class="sm:hidden text-xs text-gray-500 block">Status:</span>
          <span 
            :class="{
              'bg-green-100 text-green-700': record.status === 'present',
              'bg-red-100 text-red-700': record.status === 'absent',
              'bg-yellow-100 text-yellow-700': record.status === 'late',
            }"
            class="px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
          >
            {{ record.status }}
          </span>
          <span v-if="record.time" class="text-xs text-gray-500">{{ record.time }}</span>
        </div>
        
        <div class="mt-2 sm:mt-0 flex flex-wrap gap-2 justify-end sm:justify-start col-span-5 sm:col-span-1">
          <button 
            :disabled="record.status === 'present'"
            class="flex-1 sm:flex-none px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-xs sm:text-sm disabled:opacity-50"
            @click="setAttendance(record, 'present')"
          >
            Present
          </button>
          <button 
            :disabled="record.status === 'late'"
            class="flex-1 sm:flex-none px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-xs sm:text-sm disabled:opacity-50"
            @click="setAttendance(record, 'late')"
          >
            Late
          </button>
          <button 
            :disabled="record.status === 'absent'"
            class="flex-1 sm:flex-none px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-xs sm:text-sm disabled:opacity-50"
            @click="setAttendance(record, 'absent')"
          >
            Absent
          </button>
        </div>
      </div>
    </transition-group>

    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">{{ editingRecord ? 'Edit Student Details' : 'Add New Student' }}</h2>
        
        <form @submit.prevent="saveRecord">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Name</label>
            <input v-model="form.name" type="text" required class="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200"/>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Section</label>
            <input v-model="form.section" type="text" required class="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200"/>
          </div>
          
          <div class="mb-4" v-if="editingRecord"> 
            <label class="block text-gray-700 mb-2">Current Status</label>
            <select v-model="form.status" class="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200">
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
            </select>
          </div>
          
          <div class="flex justify-end gap-2">
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AttendanceTable",
  data() {
    return {
      records: [
        { id: 1, name: "Abdelrhman Ehab", section: "C", count: 2 },
        { id: 2, name: "Abdallah Elsayed", section: "C", count: 2 },
        { id: 3, name: "Hamada Ebrahim", section: "B", count: 2 },
        { id: 4, name: "Omar Khaled", section: "A", count: 1 },
        { id: 5, name: "Mostafa Mahmoud", section: "A", count: 3 },
        { id: 6, name: "Ahmed Tarek", section: "B", count: 0 },
        { id: 7, name: "Mohamed Gamal", section: "C", count: 4 },
        { id: 8, name: "Youssef Adel", section: "B", count: 1 },
        { id: 9, name: "Khaled Hassan", section: "A", count: 5 },
        { id: 10, name: "Ali Fathy", section: "C", count: 2 },
        { id: 11, name: "Eslam Mohamed", section: "B", count: 1 },
        { id: 12, name: "Mahmoud Ashraf", section: "C", count: 0 },
        { id: 13, name: "Karim Samir", section: "A", count: 2 },
        { id: 14, name: "Othman Ibrahim", section: "B", count: 3 },
        { id: 15, name: "Walid Farouk", section: "C", count: 1 },
      ],
      searchQuery: "",
      sortKey: "name",
      sortAsc: true,
      showForm: false,
      editingRecord: null,
      form: { id: null, name: "", section: "", status: "absent", time: null },
      cutOffTime: "08:30",
    };
  },
  computed: {
    filteredRecords() {
      let result = this.records.filter((r) =>
        r.name.toLowerCase().includes(this.searchQuery.toLowerCase())
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
    setAttendance(record, status) {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // 💡 منطق تحديد حالة الحضور
      if (status === "present") {
        record.status = "present";
        record.time = timeString;
      } else if (status === "absent") {
        record.status = "absent";
        record.time = null;
      } else if (status === "late") {
        record.status = "late";
        record.time = timeString;
      }
    },
    removeRecord(id) {
      if (confirm("Are you sure you want to delete this record?")) {
        this.records = this.records.filter((r) => r.id !== id);
      }
    },
    openForm(record = null) {
      this.editingRecord = record;
      this.form = record ? { ...record } : { id: Date.now(), name: "", section: "", status: "absent", time: null };
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.editingRecord = null;
    },
    saveRecord() {
      if (this.editingRecord) {
        Object.assign(this.editingRecord, this.form);
      } else {
        this.records.unshift({ ...this.form, id: Date.now() });
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
