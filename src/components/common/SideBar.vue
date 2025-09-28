<template>
  <div class="flex">
    <!-- Sidebar -->
    <div
      :class="[
        'bg-indigo-900 text-indigo-100 min-h-screen w-64 space-y-6 py-6 px-4 absolute inset-y-0 left-0 transform transition duration-300 ease-in-out lg:relative lg:translate-x-0 z-50',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <!-- Close Button (Small Screens Only) -->
      <button
        @click="sidebarOpen = false"
        class="lg:hidden absolute top-4 right-4 text-indigo-100 hover:text-white focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Logo + User Info -->
      <h1
        class="flex items-center text-2xl font-extrabold text-indigo-200 mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 mr-2 text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        AMS
      </h1>
      <div
        class="flex items-center gap-3 p-3 mb-4 rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
      >
        <!-- Avatar Icon -->
        <div
          class="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-lg font-bold uppercase"
        >
          {{ (userName || "G")[0] }}
        </div>

        <!-- User Info -->
        <div>
          <p class="text-sm">Welcome back,</p>
          <p class="text-base font-semibold">
            {{ userName || "Guest" }}
            <span class="ml-2 px-2 py-0.5 text-xs rounded-full bg-white/20">
              {{ role || "Visitor" }}
            </span>
          </p>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="mt-6 space-y-2">
        <router-link
          v-for="item in filteredNavItems"
          :key="item.name"
          :to="item.to"
          class="flex items-center px-3 py-2 rounded-md transition-colors hover:bg-indigo-800 hover:text-white"
          active-class="bg-indigo-800 text-white"
          exact
        >
          <span v-html="item.icon" class="mr-3 w-5 h-5"></span>
          <span>{{ item.name }}</span>
        </router-link>
      </nav>

      <!-- Logout -->
      <div class="mt-6">
        <button
          @click="logout"
          class="w-full flex items-center justify-center px-3 py-2 rounded-md bg-red-600 hover:bg-red-500 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
            />
          </svg>
          Log Out
        </button>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1">
      <!-- Mobile Toggle Button -->
      <button
        @click="sidebarOpen = !sidebarOpen"
        class="lg:hidden p-2 m-2 rounded-md bg-indigo-900 text-indigo-100 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <!-- Page content -->
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSidebar",
  data() {
    return {
      sidebarOpen: false,
      role: localStorage.getItem("userRole") || "guest",
      userName: localStorage.getItem("userName") || "",
      navItems: [
        {
          name: "Home",
          to: "/home",
          roles: ["admin", "teacher", "student"],
          icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 9.75l8.25-6.75 8.25 6.75M4.5 10.5V21h6v-6h3v6h6V10.5"/></svg>`,
        },
        {
          name: "Dashboard",
          to: "/dashboard",
          roles: ["admin", "teacher", "student"],
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h7v7H3V3zm11 0h7v11h-7V3zM3 14h7v7H3v-7zm11 4h7v3h-7v-3z"/></svg>`,
        },
        {
          name: "Students",
          to: "/student_",
          roles: ["admin", "teacher", "student"],
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9.969 9.969 0 0112 15c2.21 0 4.254.72 5.879 1.929M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
        },
        {
          name: "Teachers",
          to: "/teacher",
          roles: ["admin"],
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 7v-5.5M5 20h14"/></svg>`,
        },
        {
          name: "Subjects",
          to: "/subject",
          roles: ["admin", "teacher"],
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6"/></svg>`,
        },
        {
          name: "Devices",
          to: "/devices",
          roles: ["admin"],
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2h6v2m-7-6h8V7H8v4zm-3 6V5h14v12H5z"/></svg>`,
        },
        {
          name: "Reports",
          to: "/report",
          roles: ["admin", "teacher"],
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z"/></svg>`,
        },
      ],
    };
  },
  computed: {
    filteredNavItems() {
      return this.navItems.filter((item) => item.roles.includes(this.role));
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("userRole");
      this.$router.push("/login");
    },
  },
};
</script>
