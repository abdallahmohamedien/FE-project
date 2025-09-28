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
      <HeaderBar @toggle-sidebar="toggleSidebar" />

      <!-- Page Content -->
      <div class="p-4">
        

        <!-- Students Table -->
        <AttendTable />

        <!-- Add Student Form (Modal) -->
        <div
          v-if="showForm"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Add New Student</h2>
            <form @submit.prevent="addStudent">
              <div class="mb-4">
                <label class="block mb-1 font-medium">Name</label>
                <input
                  v-model="newStudent.name"
                  type="text"
                  class="w-full border rounded px-3 py-2"
                  placeholder="Enter student name"
                  required
                />
              </div>
              <div class="mb-4">
                <label class="block mb-1 font-medium">Email</label>
                <input
                  v-model="newStudent.email"
                  type="email"
                  class="w-full border rounded px-3 py-2"
                  placeholder="Enter student email"
                  required
                />
              </div>
              <div class="mb-4">
                <label class="block mb-1 font-medium">Class</label>
                <input
                  v-model="newStudent.class"
                  type="text"
                  class="w-full border rounded px-3 py-2"
                  placeholder="Enter class"
                  required
                />
              </div>

              <div class="flex justify-end gap-2">
                <button
                  type="button"
                  @click="showForm = false"
                  class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import SideBar from "@/components/common/SideBar.vue";
import HeaderBar from "@/components/common/HeaderBar.vue";
import AttendTable from "@/components/attendances/AttendTable.vue";

export default {
  name: "DashBoard",
  components: {
    SideBar,
    HeaderBar,
    AttendTable,
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
