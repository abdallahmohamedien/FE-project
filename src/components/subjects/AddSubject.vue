<template>
  <div>
    <div class="w-96 h-full p-10 bg-white shadow-2xl rounded-lg">
      <h2 class="text-lg font-semibold mb-2">Add a Subject</h2>
      <form class="grid gap-7" @submit.prevent="onSubmit">
        <div class="grid justify-start">
          <label class="flex font-extrabold" for="">Subject Id</label>
          <input
            class="w-72 h-10 rounded-md p-2 shadow-xl bg-gray-200"
            type="text"
            placeholder="Subject Id"
            v-model="form.id"
          />
        </div>
        <div class="grid justify-start">
          <label class="flex" for="">Subject Name</label>
          <input
            class="w-72 h-10 rounded-md p-2 shadow-2xl bg-gray-200"
            type="text"
            placeholder="Subject Name"
            v-model="form.name"
          />
        </div>
        <div class="grid justify-start">
          <label class="flex" for="">Semester</label>
          <input
            class="w-72 h-10 rounded-md p-2 shadow-2xl bg-gray-200"
            type="text"
            placeholder="Select Semester"
            v-model="form.semester"
          />
        </div>

        <button
          class="bg-green-600 text-white px-2 py-2 w-72 rounded-md hover:bg-green-500"
          :disabled="submitting"
        >
          {{ submitting ? "Adding..." : "Add" }}
        </button>
        <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
        <p v-if="success" class="text-green-700 text-sm">Subject added.</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddSubject",
  data() {
    return {
      form: { id: "", name: "", semester: "" },
      submitting: false,
      error: "",
      success: false,
    };
  },
  methods: {
    onSubmit() {
      this.error = "";
      this.success = false;
      const { id, name, semester } = this.form;
      if (!id || !name || !semester) {
        this.error = "Please fill all fields";
        return;
      }
      this.submitting = true;
      const list = this.loadSubjects();
      const key = `${id}`;
      list.unshift({ key, id, name, semester });
      localStorage.setItem("subjects", JSON.stringify(list));
      this.submitting = false;
      this.success = true;
      // notify tables
      import("@/eventBus").then(({ default: bus }) => bus.$emit("subjects:updated"));
      this.form = { id: "", name: "", semester: "" };
      setTimeout(() => (this.success = false), 1200);
    },
    loadSubjects() {
      try {
        const raw = localStorage.getItem("subjects");
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    },
  },
};
</script>

<style></style>
