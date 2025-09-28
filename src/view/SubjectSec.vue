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
      <div class="p-6">
        <div
          class="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 font-sans"
        >
          <!-- Header + Search + Add Button -->
          <div
            class="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4"
          >
            <h3
              class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0"
            >
              Subjects
            </h3>

            <div
              class="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto"
            >
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search subjects..."
                class="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              />
              <button
                @click="openForm()"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition w-full sm:w-auto"
              >
                + Add Subject
              </button>
            </div>
          </div>

          <!-- Table Header -->
          <div
            class="hidden sm:grid grid-cols-4 md:grid-cols-5 text-left font-bold text-gray-600 uppercase tracking-wider h-12 bg-gray-100 rounded-lg px-4 items-center mb-2"
          >
            <div
              class="col-span-1 md:col-span-2 cursor-pointer"
              @click="sortBy('code')"
            >
              Code
            </div>
            <div class="cursor-pointer" @click="sortBy('name')">Name</div>
            <div
              class="hidden md:block cursor-pointer"
              @click="sortBy('semester')"
            >
              Semester
            </div>
            <div>Actions</div>
          </div>

          <!-- Table Body -->
          <transition-group name="list" tag="div" class="space-y-4">
            <div
              v-for="subject in filteredSubjects"
              :key="subject.id"
              class="flex flex-col sm:grid sm:grid-cols-4 md:grid-cols-5 text-left text-base p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
            >
              <!-- Mobile Layout -->
              <div class="flex items-center justify-between sm:hidden mb-2">
                <div class="font-bold text-gray-800">{{ subject.code }}</div>
                <div class="flex gap-2 text-sm">
                  <span class="text-gray-600 font-bold">{{
                    subject.name
                  }}</span>
                  <span class="text-gray-600">Sem: {{ subject.semester }}</span>
                </div>
              </div>

              <!-- Desktop Layout -->
              <div
                class="hidden sm:block col-span-1 md:col-span-2 font-medium text-gray-800"
              >
                {{ subject.code }}
              </div>
              <div class="hidden sm:block text-gray-600">
                {{ subject.name }}
              </div>
              <div class="hidden md:block text-gray-600 font-bold">
                {{ subject.semester }}
              </div>

              <!-- Actions -->
              <div class="mt-2 sm:mt-0 flex flex-col sm:flex-row gap-2">
                <button
                  class="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-sm w-full sm:w-auto"
                  @click="openEdit(subject)"
                >
                  Edit
                </button>
                <button
                  class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm w-full sm:w-auto"
                  @click="deleteSubject(subject.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </transition-group>
        </div>

        <!-- Modal Form -->
        <div
          v-if="showForm"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">
              {{ editing ? "Edit Subject" : "Add Subject" }}
            </h2>

            <form @submit.prevent="saveSubject">
              <div class="mb-4">
                <label class="block text-gray-700 mb-2">Code</label>
                <input
                  v-model="form.code"
                  type="text"
                  required
                  class="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 mb-2">Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 mb-2">Semester</label>
                <input
                  v-model="form.semester"
                  type="text"
                  required
                  class="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 mb-2">Credits</label>
                <input
                  v-model.number="form.credits"
                  type="number"
                  min="0"
                  required
                  class="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
                />
              </div>

              <div class="flex justify-end gap-2">
                <button
                  type="button"
                  @click="closeForm"
                  class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
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
import { ref, computed, onMounted } from "vue";
import SideBar from "@/components/common/SideBar.vue";
import HeaderBar from "@/components/common/HeaderBar.vue";

export default {
  name: "SubjectsDashboard",
  components: { SideBar, HeaderBar },
  setup() {
    const isSidebarOpen = ref(false);
    const showForm = ref(false);
    const editing = ref(false);
    const form = ref({
      id: null,
      code: "",
      name: "",
      semester: "",
      credits: 0,
    });
    const searchQuery = ref("");
    const subjects = ref([]);

    onMounted(() => {
      const raw = localStorage.getItem("subjects");
      subjects.value = raw ? JSON.parse(raw) : [];
    });

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

    const filteredSubjects = computed(() => {
      if (!searchQuery.value) return subjects.value;
      return subjects.value.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          s.code.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const openForm = () => {
      editing.value = false;
      form.value = { id: null, code: "", name: "", semester: "", credits: 0 };
      showForm.value = true;
    };

    const openEdit = (subject) => {
      editing.value = true;
      form.value = { ...subject };
      showForm.value = true;
    };

    const saveSubject = () => {
      if (editing.value) {
        const index = subjects.value.findIndex((s) => s.id === form.value.id);
        subjects.value[index] = { ...form.value };
      } else {
        subjects.value.push({ ...form.value, id: Date.now() });
      }
      localStorage.setItem("subjects", JSON.stringify(subjects.value));
      closeForm();
    };

    const deleteSubject = (id) => {
      subjects.value = subjects.value.filter((s) => s.id !== id);
      localStorage.setItem("subjects", JSON.stringify(subjects.value));
    };

    const closeForm = () => {
      showForm.value = false;
    };

    return {
      isSidebarOpen,
      toggleSidebar,
      mainContentClasses,
      showForm,
      editing,
      form,
      subjects,
      filteredSubjects,
      searchQuery,
      openForm,
      openEdit,
      saveSubject,
      deleteSubject,
      closeForm,
    };
  },
};
</script>

<style>
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
