<template>
  <div class="space-y-8 p-4">
    <div
      class="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-t-4 border-indigo-600"
    >
      <div v-if="isLoggedIn">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">
          Hello, <span class="text-indigo-600">{{ userName }}</span> 👋
        </h1>
        <p class="mt-1 text-gray-500">
          Welcome back! Here is a snapshot of your attendance system.
        </p>
      </div>
      <div v-else></div>
    </div>

    <div
      v-if="userRole === 'admin' || userRole === 'teacher'"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4"
    >
      <div
        v-if="userRole === 'admin'"
        class="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition"
      >
        <p class="text-sm font-medium text-gray-500 truncate">Total Students</p>
        <div class="mt-1 text-3xl font-bold text-gray-900">
          {{ kpis.totalStudents }}
        </div>
      </div>

      <div
        class="bg-white p-5 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition"
      >
        <p class="text-sm font-medium text-gray-500 truncate">
          Attendance Rate (Today)
        </p>
        <div class="mt-1 flex items-baseline justify-between">
          <span class="text-3xl font-bold text-gray-900"
            >{{ kpis.attendanceToday }}%</span
          >
          <span class="text-sm text-green-500 font-semibold"
            >+4% vs Yesterday</span
          >
        </div>
      </div>

      <div
        class="bg-white p-5 rounded-xl shadow-md border-l-4 border-red-500 hover:shadow-lg transition"
      >
        <p class="text-sm font-medium text-gray-500 truncate">
          Absent Students
        </p>
        <div class="mt-1 text-3xl font-bold text-gray-900">
          {{ kpis.absentToday }}
        </div>
      </div>

      <div
        class="bg-white p-5 rounded-xl shadow-md border-l-4 border-amber-500 hover:shadow-lg transition"
      >
        <p class="text-sm font-medium text-gray-500 truncate">Late Arrivals</p>
        <div class="mt-1 text-3xl font-bold text-gray-900">
          {{ kpis.lateArrivals }}
        </div>
      </div>
    </div>

    <div
      v-if="userRole === 'admin' || userRole === 'teacher'"
      class="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 class="text-xl font-bold text-gray-800 mb-4">
        Monthly Attendance Trend
      </h2>
      <div
        class="h-80 flex items-center justify-center text-gray-400 border border-dashed rounded-lg p-4"
        style="height: 320px"
      >
        <MonthlyTrendChart class="w-full h-full" />
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      <router-link
        v-for="action in filteredQuickActions"
        :key="action.name"
        :to="action.to"
        :title="action.name"
        :class="[
          action.color,
          'p-5 flex flex-col items-center justify-center rounded-xl shadow-lg text-white font-semibold transition hover:scale-[1.03]',
        ]"
      >
        <span v-html="action.icon" class="w-8 h-8 mb-2"></span>
        <span class="text-sm text-center">{{ action.name }}</span>
      </router-link>

      <button
        @click="logout"
        title="Sign Out"
        class="p-5 flex flex-col items-center justify-center bg-red-500 text-white rounded-xl shadow-lg font-semibold hover:bg-red-600 transition hover:scale-[1.03]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
          />
        </svg>
        <span class="text-sm">Log Out</span>
      </button>
    </div>
  </div>
</template>

<script>
import MonthlyTrendChart from "@/components/charts/MonthlyTrendChart.vue";
export default {
  name: "WelcomePage",
  components: {
    MonthlyTrendChart, 
  },
  data() {
    return {
      isLoggedIn: true,
      userName: "Admin User",
      userRole: "",
      
      quickActions: [
        {
          name: "Manage Students",
          to: "/student",
          roles: ["admin", "teacher"],
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 011.5 2.15l-1.5 1.5-1.5-1.5A4 4 0 0113 7z" /></svg>`,
          color: "bg-indigo-600 hover:bg-indigo-700",
        },
        {
          name: "View Reports",
          to: "/report",
          roles: ["admin", "teacher"],
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l4-2m0 0l4 2m-4-2v13M9 19H3v-6a2 2 0 012-2h4V6m0 0v-2" /></svg>`,
          color: "bg-green-600 hover:bg-green-700",
        },
        {
          name: "Manage Devices",
          to: "/devices",
          roles: ["admin"],
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4m-4-4l-4 4m-4 4l-4 4m4 4l4-4m4 4l-4-4" /></svg>`,
          color: "bg-purple-600 hover:bg-purple-700",
        },
        {
          name: "My Dashboard",
          to: "/student_",
          roles: ["student"],
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
          color: "bg-indigo-600 hover:bg-indigo-700",
        },
      ],
      kpis: {
        totalStudents: 150,
        totalTeachers: 12,
        attendanceToday: 88,
        absentToday: 12,
        lateArrivals: 5,
      },
    };
  },
  computed: {
    filteredQuickActions() {
      const role = this.userRole;

      return this.quickActions.filter((action) => action.roles.includes(role));
    },
  },
  mounted() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    this.userName = localStorage.getItem("userName") || "User";
    this.userRole = localStorage.getItem("userRole") || "guest";
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    },
    logout() {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      this.$router.push("/login");
    },
  },
};
</script>
