<template>
  <div class="bg-gray-900 h-screen p-3">
    <h1 class="flex justify-start text-2xl font-extrabold text-gray-400">
      AMS
    </h1>
    <ul class="grid gap-10 justify-start p-7 text-gray-500">
      <router-link to="/dashboard">DashBoard</router-link>
      <router-link to="/student_">Student</router-link>
      <router-link to="/add_teacher">Teacher</router-link>
      <router-link to="/add_subject">Subject</router-link>
      <router-link to="/devices">Devices</router-link>
    </ul>
    <div>
      <button class="hover:text-white">Log Out</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
