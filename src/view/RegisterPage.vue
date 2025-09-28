<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold text-center text-indigo-600 mb-6">Register</h2>
      <form @submit.prevent="register">
        <!-- Username -->
        <div class="mb-4">
          <label class="block text-gray-700">Username</label>
          <input v-model="username" type="text" class="w-full p-2 border rounded-lg" required />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input v-model="email" type="email" class="w-full p-2 border rounded-lg" required />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input v-model="password" type="password" class="w-full p-2 border rounded-lg" required />
        </div>

        <!-- Confirm Password -->
        <div class="mb-6">
          <label class="block text-gray-700">Confirm Password</label>
          <input v-model="confirmPassword" type="password" class="w-full p-2 border rounded-lg" required />
        </div>

        <!-- Role -->
        <div class="mb-6">
          <label class="block text-gray-700">Role</label>
          <select v-model="role" class="w-full p-2 border rounded-lg" required>
            <option disabled value="">-- Select Role --</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-600 text-sm mb-4">{{ errorMessage }}</p>

        <!-- Register Button -->
        <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-lg">Register</button>
      </form>

      <!-- Link to Login -->
      <p class="text-sm text-gray-600 mt-4 text-center">
        Already have an account?
        <router-link to="/login" class="text-indigo-600 hover:underline">
          Login here
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      errorMessage: "",
    };
  },
  methods: {
    register() {
      this.errorMessage = "";

      // ✅ Regex للتحقق من الإيميل
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.errorMessage = "Please enter a valid email address.";
        return;
      }

      // ✅ التحقق من طول الباسورد
      if (this.password.length < 6) {
        this.errorMessage = "Password must be at least 6 characters long.";
        return;
      }

      // ✅ التحقق من تطابق الباسورد
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match.";
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];

      // ✅ التأكد إن اسم المستخدم مش موجود
      if (users.find(u => u.username === this.username)) {
        this.errorMessage = "Username already exists!";
        return;
      }

      // ✅ التأكد إن الإيميل مش مستخدم قبل كده
      if (users.find(u => u.email === this.email)) {
        this.errorMessage = "Email already registered!";
        return;
      }

      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration successful! You can now login.");
      this.$router.push("/login");
    },
  },
};
</script>
