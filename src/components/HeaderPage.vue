<template>
  <div class="bg-white flex flex-col sm:flex-row justify-between items-center px-4 py-2 sm:px-6 h-auto sm:h-16 w-full shadow-lg font-sans relative">
    
    <div class="flex items-center space-x-3 flex-shrink-0">
      <div class="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
        <span class="font-bold text-gray-700">AMS</span>
      </div>
      <span class="font-semibold text-gray-800 text-lg">AMS</span>
    </div>

    <button @click="toggleMenu" class="absolute right-4 top-4 sm:hidden focus:outline-none">
      <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path v-if="!menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <div 
      :class="[
        'flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto',
        'transition-all duration-300 ease-in-out',
        menuOpen ? 'flex' : 'hidden sm:flex'
      ]"
    >
      
      <div class="relative w-full sm:w-auto">
        <input
          v-model="searchQuery"
          class="rounded-full bg-gray-100 px-4 py-2 w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors pl-10"
          type="search"
          placeholder="Search..."
          @input="$emit('search', searchQuery)"
        />
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <nav class="flex flex-col sm:flex-row justify-center sm:justify-start gap-3 text-sm font-medium w-full">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          class="px-3 py-2 rounded-full transition-colors duration-200 text-center"
          :class="{'bg-indigo-600 text-white shadow-md': isCurrentRoute(link.path), 'text-gray-700 hover:bg-gray-100': !isCurrentRoute(link.path)}"
          @click="closeMenu"
        >
          {{ link.name }}
        </router-link>
      </nav>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  emits: ['search'],
  data() {
    return {
      searchQuery: '',
      menuOpen: false,
      navLinks: [
        { name: "Home", path: "/home" },
        { name: "Report", path: "/report" },
        { name: "Student", path: "/student" },
        { name: "Dashboard", path: "/dashboard" },
        
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    isCurrentRoute(path) {
      return this.$route.path === path;
    },
  },
};
</script>

<style scoped>
/* No custom styles needed. Tailwind handles everything. */
</style>