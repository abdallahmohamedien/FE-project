<template>
  <div class="flex min-h-screen bg-slate-100  text-slate-900">
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
      <div class="p-6">
        

        <!-- Teachers Table -->
        <TeacherTable />
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showForm"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <!-- Close Button -->
        <button
          @click="showForm = false"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h3 class="text-xl font-bold mb-4 text-indigo-700">Add New Teacher</h3>

        <form @submit.prevent="addTeacher" class="grid grid-cols-1 gap-4">
          <div>
            <label class="block mb-1 font-medium">Roll</label>
            <input
              v-model="newTeacher.roll"
              type="text"
              class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter teacher roll"
              required
            />
          </div>
          <div>
            <label class="block mb-1 font-medium">Name</label>
            <input
              v-model="newTeacher.name"
              type="text"
              class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter teacher name"
              required
            />
          </div>
          <div>
            <label class="block mb-1 font-medium">Semester</label>
            <input
              v-model="newTeacher.semester"
              type="text"
              class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter semester"
              required
            />
          </div>
          <div>
            <label class="block mb-1 font-medium">Section</label>
            <input
              v-model="newTeacher.section"
              type="text"
              class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter section"
              required
            />
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-2 mt-4">
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
</template>

<script>
import { ref, computed } from "vue";
import SideBar from "@/components/common/SideBar.vue";
import HeaderBar from "@/components/common/HeaderBar.vue";
import TeacherTable from "@/components/teachers/TeachersTable.vue";
import bus from "@/eventBus";

export default {
  name: "TeacherDashBoard",
  components: { SideBar, HeaderBar, TeacherTable },
  setup() {
    const isSidebarOpen = ref(false);
    const showForm = ref(false);

    const newTeacher = ref({ roll: "", name: "", semester: "", section: "" });

    const addTeacher = () => {
      const raw = localStorage.getItem("teachers");
      const teachers = raw ? JSON.parse(raw) : [];
      teachers.push({ id: Date.now(), ...newTeacher.value });
      localStorage.setItem("teachers", JSON.stringify(teachers));

      bus.$emit("teachers:updated"); // notify table
      newTeacher.value = { roll: "", name: "", semester: "", section: "" };
      showForm.value = false; // close modal
    };

    const mainContentClasses = computed(() => [
      "flex-1",
      "flex",
      "flex-col",
      "transition-all",
      "duration-300",
      "ease-in-out",
      "w-full",
      isSidebarOpen.value ? "md:ml-56" : "md:ml-0",
    ]);

    const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);

    return {
      isSidebarOpen,
      toggleSidebar,
      mainContentClasses,
      showForm,
      newTeacher,
      addTeacher,
    };
  },
};
</script>
