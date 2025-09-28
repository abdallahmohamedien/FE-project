<template>
  <div class="flex min-h-screen bg-slate-100 text-slate-900">
    <!-- Sidebar -->
    <SideBar
      :is-open="isSidebarOpen"
      class="fixed md:relative z-50 transition-transform duration-300 ease-in-out"
    />

    <!-- Overlay (mobile only) -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 md:hidden"
      @click="toggleSidebar"
    ></div>

    <!-- Main Content -->
    <div :class="mainContentClasses">
      <!-- Header -->
      <HeaderBar @toggle-sidebar="toggleSidebar" :user-name="currentUserName" :user-email="currentUserEmail" @logout="doLogout" @search="onSearch" />

      <!-- Page Content -->
      <WelcomeSec />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import SideBar from "@/components/common/SideBar.vue";
import HeaderBar from "@/components/common/HeaderBar.vue";
import WelcomeSec from "@/components/WelcomeSec.vue";

export default {
  name: "DashBoard",
  components: {
    SideBar,
    HeaderBar,
    WelcomeSec
  },
  setup() {
    const isSidebarOpen = ref(false);
    const showForm = ref(false);

    const newStudent = ref({
      name: "",
      email: "",
      class: "",
    });

    const addStudent = () => {
      console.log("New student added:", newStudent.value);
      // TODO: send student data to API or store
      showForm.value = false;
      newStudent.value = { name: "", email: "", class: "" };
    };

    const mainContentClasses = computed(() => {
      return [
        "flex-1",
        "flex",
        "flex-col",
        "transition-all",
        "duration-300",
        "ease-in-out",
        "w-full",
        isSidebarOpen.value ? "md:ml-56" : "md:ml-0",
      ];
    });

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    return {
      isSidebarOpen,
      mainContentClasses,
      toggleSidebar,
      showForm,
      newStudent,
      addStudent,
    };
  },
};
</script>
