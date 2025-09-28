<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold text-center text-indigo-600 mb-6">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700">Username</label>
          <input v-model="username" type="text" class="w-full p-2 border rounded-lg" required />
        </div>

        <div class="mb-6">
          <label class="block text-gray-700">Password</label>
          <input v-model="password" type="password" class="w-full p-2 border rounded-lg" required />
        </div>

        <p v-if="errorMessage" class="text-red-600 text-sm mb-4">{{ errorMessage }}</p>

        <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-lg">Login</button>
      </form>

      <!-- رابط للتسجيل -->
      <p class="text-sm text-gray-600 mt-4 text-center">
        Don’t have an account?
        <router-link to="/register" class="text-indigo-600 hover:underline">
          Register here
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.username === this.username && u.password === this.password);

      if (!user) {
        this.errorMessage = "Invalid username or password.";
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", user.username);
      localStorage.setItem("userRole", user.role);

      if (this.$root && this.$root.$emit) {
        this.$root.$emit("auth-changed", { role: user.role, username: user.username });
      }

      if (user.role === "admin") this.$router.push("/dashboard");
      else if (user.role === "teacher") this.$router.push("/teacher");
      else if (user.role === "student") this.$router.push("/student_");
      else this.$router.push("/home");
    },
  },
};
</script>
