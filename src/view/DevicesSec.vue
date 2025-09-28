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
      <HeaderBar @toggle-sidebar="toggleSidebar"  />

      <!-- Page Content -->
      <div class="p-4 sm:p-6 lg:p-10 bg-slate-50 min-h-[500px] rounded-xl shadow-lg">
        <!-- Header + Add Button -->
        <div class="flex flex-col sm:flex-row justify-between items-center bg-sky-600 p-4 rounded-xl shadow-md mb-6">
          <h1 class="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-0">
            Devices Management
          </h1>
          <button
            @click="openForm()"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            + Add Device
          </button>
        </div>

        <!-- Devices Table -->
        <div class="bg-white rounded-xl shadow-inner p-2 md:p-4 border border-slate-200">
          <!-- Table Header -->
          <div class="hidden lg:grid grid-cols-5 font-bold text-sm text-slate-600 bg-slate-100 rounded-lg px-4 py-3 border-b border-slate-300">
            <div>Device Name</div>
            <div>Device ID</div>
            <div>Added Date</div>
            <div>Mode</div>
            <div>Actions</div>
          </div>

          <!-- Table Body -->
          <transition-group name="list" tag="div" class="mt-2">
            <div
              v-for="device in devices"
              :key="device.uid"
              class="flex flex-col md:flex-row lg:grid lg:grid-cols-5 gap-3 md:gap-4 items-center py-4 px-4 bg-white mb-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors duration-200"
            >
              <!-- Mobile Layout -->
              <div class="flex justify-between w-full md:hidden mb-2">
                <div class="font-semibold">{{ device.name }}</div>
                <div class="text-sm text-slate-500">
                  ID: {{ device.uid }} | Date: {{ device.date }}
                </div>
              </div>

              <!-- Tablet/Desktop Layout -->
              <div class="flex-1 md:flex-none font-medium text-slate-800">{{ device.name }}</div>
              <div class="flex-1 md:flex-none text-slate-500">{{ device.uid }}</div>
              <div class="hidden md:block text-slate-500">{{ device.date }}</div>

              <!-- Mode Buttons -->
              <div class="flex flex-wrap justify-start gap-2 w-full sm:w-auto">
                <button
                  class="py-1 px-3 rounded-full text-xs font-medium transition-all duration-300 flex-1 sm:flex-none text-center"
                  :class="device.mode==='enrollment' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-600 hover:bg-indigo-100'"
                  @click="setMode(device,'enrollment')"
                >
                  Enrollment
                </button>
                <button
                  class="py-1 px-3 rounded-full text-xs font-medium transition-all duration-300 flex-1 sm:flex-none text-center"
                  :class="device.mode==='attendance' ? 'bg-red-600 text-white shadow-md' : 'bg-slate-200 text-slate-600 hover:bg-red-100'"
                  @click="setMode(device,'attendance')"
                >
                  Attendance
                </button>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-wrap justify-start gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                <button
                  class="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors shadow-sm flex-1 sm:flex-none text-center"
                  @click="openForm(device)"
                >
                  Edit
                </button>
                <button
                  class="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors shadow-sm flex-1 sm:flex-none text-center"
                  @click="removeDevice(device.uid)"
                >
                  Delete
                </button>
              </div>
            </div>

            <div v-if="devices.length === 0" class="text-center py-10 text-slate-500 text-lg">
              No devices registered. Click "Add Device" to get started.
            </div>
          </transition-group>
        </div>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="showForm" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button @click="closeForm()" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>

        <h3 class="text-xl font-bold mb-4 text-indigo-700">
          {{ editingDevice ? "Edit Device" : "Add New Device" }}
        </h3>

        <form @submit.prevent="saveDevice" class="grid grid-cols-1 gap-4">
          <div>
            <label class="block mb-1 font-medium">Device Name</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter device name"
              required
            />
          </div>
          <div>
            <label class="block mb-1 font-medium">Device ID</label>
            <input
              v-model="form.uid"
              type="text"
              class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter device ID"
              required
            />
          </div>
          <div>
            <label class="block mb-1 font-medium">Added Date</label>
            <input
              v-model="form.date"
              type="date"
              class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div class="flex justify-end gap-2 mt-4">
            <button type="button" @click="closeForm()" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Save</button>
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

export default {
  name: "DevicesDashboard",
  components: { SideBar, HeaderBar },
  setup() {
    const isSidebarOpen = ref(false);
    const showForm = ref(false);
    const editingDevice = ref(null);
    const devices = ref([
      { name: "Front Gate Scanner", uid: "uydrte34w536475708", date: "2024-06-12", mode: "enrollment" },
      { name: "Main Office Check-in", uid: "uydrte34w536478979", date: "2024-05-30", mode: "attendance" },
    ]);

    const form = ref({ name: "", uid: "", date: "" });

    const openForm = (device = null) => {
      if (device) {
        editingDevice.value = device;
        form.value = { ...device };
      } else {
        editingDevice.value = null;
        form.value = { name: "", uid: "", date: "" };
      }
      showForm.value = true;
    };

    const closeForm = () => {
      showForm.value = false;
      editingDevice.value = null;
    };

    const saveDevice = () => {
      if (editingDevice.value) {
        Object.assign(editingDevice.value, form.value);
      } else {
        devices.value.unshift({ ...form.value, mode: "enrollment" });
      }
      closeForm();
    };

    const removeDevice = (uid) => {
      if (confirm("Are you sure you want to delete this device?")) {
        devices.value = devices.value.filter(d => d.uid !== uid);
      }
    };

    const setMode = (device, mode) => {
      device.mode = mode;
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

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    return {
      isSidebarOpen,
      toggleSidebar,
      mainContentClasses,
      showForm,
      form,
      openForm,
      closeForm,
      saveDevice,
      devices,
      removeDevice,
      editingDevice,
      setMode,
    };
  },
};
</script>

<style scoped>
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
