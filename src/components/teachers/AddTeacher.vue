<template>
  <div class="bg-white rounded shadow p-6 mb-6">
    <h3 class="text-xl font-bold mb-4">
      {{ editing ? "Update Teacher" : "Add Teacher" }}
    </h3>

    <form @submit.prevent="saveTeacher" class="space-y-4">
      <div>
        <label class="block text-gray-700">Roll</label>
        <input
          v-model="form.roll"
          type="text"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label class="block text-gray-700">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label class="block text-gray-700">Semester</label>
        <input
          v-model="form.semester"
          type="text"
          class="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label class="block text-gray-700">Section</label>
        <input
          v-model="form.section"
          type="text"
          class="w-full border rounded px-3 py-2"
        />
      </div>

      <div class="flex gap-3">
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {{ editing ? "Update" : "Add" }}
        </button>

        <button
          v-if="editing"
          type="button"
          class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          @click="resetForm"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import bus from "@/eventBus";

export default {
  name: "TeachersForm",
  data() {
    return {
      editing: false,
      form: {
        id: null,
        roll: "",
        name: "",
        semester: "",
        section: "",
      },
    };
  },
  methods: {
    saveTeacher() {
      let teachers = JSON.parse(localStorage.getItem("teachers") || "[]");

      if (this.editing) {
        const index = teachers.findIndex((t) => t.id === this.form.id);
        if (index !== -1) {
          teachers[index] = { ...this.form };
        }
      } else {
        this.form.id = Date.now();
        teachers.push({ ...this.form });
      }

      localStorage.setItem("teachers", JSON.stringify(teachers));
      bus.$emit("teachers:updated");
      this.resetForm();
    },
    editTeacher(item) {
      this.form = { ...item };
      this.editing = true;
    },
    resetForm() {
      this.editing = false;
      this.form = {
        id: null,
        roll: "",
        name: "",
        semester: "",
        section: "",
      };
    },
  },
  created() {
    bus.$on("teacher:edit", this.editTeacher);
  },
  beforeDestroy() {
    bus.$off("teacher:edit", this.editTeacher);
  },
};
</script>
