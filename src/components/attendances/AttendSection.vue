<template>
  <div class="bg-gray-100 min-h-screen p-6 sm:p-10 font-sans">
    <div class="max-w-7xl mx-auto p-6 sm:p-10 bg-white rounded-xl shadow-2xl">
      <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between">
        <h1 class="text-3xl font-extrabold text-gray-800 mb-4 sm:mb-0">Student Attendance</h1>
        
        <select 
          v-model="selectedSection" 
          class="bg-blue-100 text-blue-700 h-12 w-full sm:w-48 rounded-lg px-4 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="">All Sections</option>
          <option v-for="section in sections" :key="section" :value="section">
            Section {{ section }}
          </option>
        </select>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-2 sm:p-0">
        <div 
          v-for="student in filteredStudents" 
          :key="student.id" 
          :class="['flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors duration-200 shadow-sm border',
            student.isPresent ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300 hover:bg-gray-50']"
          @click="toggleAttendance(student)"
        >
          <p class="text-gray-800 font-semibold truncate">{{ student.name }}</p>
          <input 
            type="checkbox" 
            v-model="student.isPresent"
            class="form-checkbox h-5 w-5 text-green-600 rounded-full"
            @click.stop
          />
        </div>
      </div>
      
      <div class="mt-8 pt-6 border-t border-gray-200">
        <p class="text-lg font-semibold text-gray-700">Attendance Summary for Section {{ selectedSection || 'All' }}:</p>
        <p class="text-gray-600 mt-2">
          <span class="font-bold text-green-600">{{ attendanceCount.present }}</span> students present,
          <span class="font-bold text-red-600">{{ attendanceCount.absent }}</span> students absent.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendanceList',
  data() {
    return {
      selectedSection: '',
      students: [
        { id: 1, name: "Abdallah Elsayed Elsayed", section: 'A', isPresent: false },
        { id: 2, name: "Abdelrhman Ehab Mosad", section: 'A', isPresent: false },
        { id: 3, name: "Shiren Abdelwahab", section: 'B', isPresent: false },
        { id: 4, name: "Hamada Ali", section: 'C', isPresent: false },
        { id: 5, name: "Mohamed Tarek", section: 'A', isPresent: false },
        { id: 6, name: "Sara Ahmed", section: 'B', isPresent: false },
        { id: 7, name: "Youssef Khaled", section: 'C', isPresent: false },
        { id: 8, name: "Mariam Hassan", section: 'A', isPresent: false },
        { id: 9, name: "Omar Mostafa", section: 'B', isPresent: false },
        { id: 10, name: "Nourhan Ibrahim", section: 'C', isPresent: false },
        { id: 11, name: "Ahmed Yassin", section: 'A', isPresent: false },
        { id: 12, name: "Fatma Adel", section: 'B', isPresent: false },
        { id: 13, name: "Karim Saeed", section: 'C', isPresent: false },
        { id: 14, name: "Laila Samir", section: 'A', isPresent: false },
        { id: 15, name: "Hossam Magdy", section: 'B', isPresent: false },
      ],
    };
  },
  computed: {
    sections() {
      const uniqueSections = new Set(this.students.map(s => s.section));
      return Array.from(uniqueSections).sort();
    },
    filteredStudents() {
      if (!this.selectedSection) {
        return this.students;
      }
      return this.students.filter(student => student.section === this.selectedSection);
    },
    attendanceCount() {
      const studentsToCount = this.filteredStudents;
      const present = studentsToCount.filter(s => s.isPresent).length;
      const absent = studentsToCount.length - present;
      return { present, absent };
    },
  },
  methods: {
    toggleAttendance(student) {
      student.isPresent = !student.isPresent;
    },
  },
};
</script>
