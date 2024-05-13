<template>
  <div class="flex justify-around items-center w-full h-24 bg-white">
    <div class="rounded-xl">
      <img src="../assets/logo.png" width="100" height="50" alt="" />
    </div>
    <div class="flex">
      <ul class="flex gap-10">
        <router-link to="/home">Home</router-link>
        <router-link to="/report">Report</router-link>
        <router-link to="/student">Student</router-link>
        <router-link to="/login">Login Out</router-link>
        <router-link to="/dashboard">DashBoard</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
