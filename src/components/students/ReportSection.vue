<template>
  <div class="bg-gray-100 min-h-screen p-4 sm:p-10 font-sans">
    <div class="max-w-7xl mx-auto p-6 sm:p-10 bg-white rounded-xl shadow-2xl">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 text-center border-b pb-4">
        Detailed Student Attendance Report
      </h2>

      <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 p-4 bg-gray-50 rounded-lg shadow-inner">
        
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by Name or Semester..."
          class="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
        />

        <select
          v-model="filterSection"
          class="w-full md:w-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
        >
          <option value="">Filter by Section</option>
          <option v-for="sec in availableSections" :key="sec" :value="sec">{{ sec }}</option>
        </select>
        
        <div class="w-full md:w-56 text-gray-400 italic text-sm p-2 border border-dashed rounded-lg text-center">
            [Date Range Picker]
        </div>
      </div>
      
      <div class="hidden sm:grid grid-cols-6 text-base font-bold text-gray-600 border-b-2 border-indigo-500 pb-3 mb-3">
        <button class="text-left" @click="sortBy('name')">
          Name <span v-if="sortKey==='name'">{{ sortAsc ? '▲' : '▼' }}</span>
        </button>
        <button class="text-left" @click="sortBy('section')">
          Section <span v-if="sortKey==='section'">{{ sortAsc ? '▲' : '▼' }}</span>
        </button>
        <button class="text-left" @click="sortBy('semester')">
          Semester <span v-if="sortKey==='semester'">{{ sortAsc ? '▲' : '▼' }}</span>
        </button>
        <button class="text-center" @click="sortBy('attendanceCount')">
          Count <span v-if="sortKey==='attendanceCount'">{{ sortAsc ? '▲' : '▼' }}</span>
        </button>
        <button class="text-center" @click="sortBy('attendanceAvg')">
          Avg % <span v-if="sortKey==='attendanceAvg'">{{ sortAsc ? '▲' : '▼' }}</span>
        </button>
        <span class="text-center">Performance</span>
      </div>

      <div v-if="filteredSortedStudents.length > 0" class="space-y-2">
        <div v-for="student in filteredSortedStudents" :key="student.name" class="relative bg-white hover:bg-indigo-50/50 rounded-lg transition duration-150">
          <div class="grid grid-cols-1 sm:grid-cols-6 gap-y-2 sm:gap-y-0 text-base py-3 px-2 border-b border-gray-100 items-center">
            
            <span class="font-semibold sm:font-normal col-span-1">{{ student.name }}</span>
            
            <span class="text-gray-600">
                <span class="sm:hidden font-bold">Section: </span>{{ student.section }}
            </span>
            <span class="text-gray-600">
                <span class="sm:hidden font-bold">Semester: </span>{{ student.semester }}
            </span>
            
            <div class="text-center text-gray-700">
              <span class="sm:hidden font-bold">Count: </span>
              <span class="font-bold text-blue-600">{{ student.attendanceCount }}</span>
            </div>
            
            <div class="p-1 sm:p-0">
              <span class="sm:hidden font-bold">Avg: </span>
              <div class="flex items-center justify-center">
                <span class="font-bold mr-2" :class="{'text-red-500': student.attendanceAvg < 50, 'text-green-600': student.attendanceAvg >= 70}">{{ student.attendanceAvg }}%</span>
                <div class="w-16 h-2 bg-gray-200 rounded-full hidden sm:block">
                  <div 
                    class="h-2 rounded-full transition-all duration-500" 
                    :class="getPerformanceStatus(student.attendanceAvg).color.replace('-100', '-500').replace('-800', '')"
                    :style="{ width: student.attendanceAvg + '%' }"
                  ></div>
                </div>
              </div>
            </div>
            
            <div class="text-center sm:block">
                <span 
                    :class="getPerformanceStatus(student.attendanceAvg).color"
                    class="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider whitespace-nowrap"
                >
                    {{ getPerformanceStatus(student.attendanceAvg).status }}
                </span>
            </div>

          </div>
        </div>
      </div>

      <div v-else class="text-center p-8 text-gray-500 italic border border-dashed rounded-lg">
        No students found matching your criteria.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AttendanceReport", // 💡 اسم أكثر دقة
  data() {
    return {
      students: [
        // ... (البيانات كما هي) ...
        { name: "Abdallah Elsayed Elsayed", section: "A", semester: 9, attendanceCount: 10, attendanceAvg: 90 },
        { name: "Abdelrhman Ehab Mosad", section: "A", semester: 2, attendanceCount: 7, attendanceAvg: 70 },
        { name: "Shiren Abdelwahab", section: "B", semester: 2, attendanceCount: 9, attendanceAvg: 90 },
        { name: "Hamada Ali", section: "C", semester: 2, attendanceCount: 7, attendanceAvg: 70 },
        { name: "Mohamed Tarek", section: "A", semester: 3, attendanceCount: 8, attendanceAvg: 80 },
        { name: "Sara Ahmed", section: "B", semester: 4, attendanceCount: 6, attendanceAvg: 60 },
        { name: "Youssef Khaled", section: "C", semester: 1, attendanceCount: 10, attendanceAvg: 95 },
        { name: "Mariam Hassan", section: "A", semester: 5, attendanceCount: 9, attendanceAvg: 85 },
        { name: "Omar Mostafa", section: "B", semester: 6, attendanceCount: 7, attendanceAvg: 75 },
        { name: "Nourhan Ibrahim", section: "C", semester: 7, attendanceCount: 8, attendanceAvg: 88 },
        { name: "Ahmed Yassin", section: "A", semester: 8, attendanceCount: 5, attendanceAvg: 50 },
        { name: "Fatma Adel", section: "B", semester: 2, attendanceCount: 9, attendanceAvg: 92 },
        { name: "Karim Saeed", section: "C", semester: 3, attendanceCount: 6, attendanceAvg: 65 },
        { name: "Laila Samir", section: "A", semester: 1, attendanceCount: 10, attendanceAvg: 100 },
        { name: "Hossam Magdy", section: "B", semester: 4, attendanceCount: 7, attendanceAvg: 72 },
      ],
      
      // 💡 متغيرات جديدة للتحكم
      searchQuery: '',
      filterSection: '',
      sortKey: 'name',
      sortAsc: true,
      
      // 💡 خيارات الأقسام لاستخدامها في قائمة التصفية المنسدلة
      availableSections: ['All', 'A', 'B', 'C'], 
    };
  },
  computed: {
    // 💡 الخاصية المحسوبة الموحدة للبحث والتصفية والفرز
    filteredSortedStudents() {
      let filtered = this.students;
      const query = this.searchQuery.toLowerCase().trim();
      const section = this.filterSection;

      // 1. التصفية حسب القسم
      if (section && section !== 'All') {
        filtered = filtered.filter(s => s.section === section);
      }

      // 2. البحث (حسب الاسم أو الفصل)
      if (query) {
        filtered = filtered.filter(s => 
          s.name.toLowerCase().includes(query) ||
          String(s.semester).includes(query)
        );
      }
      
      // 3. الفرز
      const key = this.sortKey;
      const asc = this.sortAsc ? 1 : -1;
      filtered.sort((a, b) => {
        const valA = (a[key] ?? "").toString().toLowerCase();
        const valB = (b[key] ?? "").toString().toLowerCase();
        if (valA < valB) return -1 * asc;
        if (valA > valB) return 1 * asc;
        return 0;
      });

      return filtered;
    }
  },
  methods: {
    // 💡 دالة تحديد حالة الأداء
    getPerformanceStatus(avg) {
      if (avg >= 85) return { status: 'Excellent', color: 'bg-green-100 text-green-800' };
      if (avg >= 70) return { status: 'Good', color: 'bg-blue-100 text-blue-800' };
      if (avg >= 50) return { status: 'Monitoring', color: 'bg-yellow-100 text-yellow-800' };
      return { status: 'Critical', color: 'bg-red-100 text-red-800' };
    },
    // 💡 دالة الفرز
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    }
  }
};
</script>

<style scoped>
/* Tailwind handles styling, so scoped CSS is optional */
</style>
