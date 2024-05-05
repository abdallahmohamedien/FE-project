<template>
  <div class="w-screen px-10 py-4">
    <div class="grid lg:grid-cols-2 h-screen">
      <div class="flex w-full bg-gray-300 justify-center items-center">
        <form id="login-form" class="text-center w-full">
          <div class="h-20 p-2">
            <label for="username" class="font-bold text-black-50"
              >Username:</label
            ><br />
            <input
              type="text"
              id="username"
              name="username"
              class="w-64 h-10 rounded-md p-2"
            />
          </div>
          <div class="p-2">
            <label for="password" class="font-bold text-black-50"
              >Password:</label
            ><br />
            <input
              type="password"
              id="password"
              name="password"
              class="w-64 h-10 rounded-md p-2"
            />
          </div>
          <div class="p-3 text-center">
            <button class="px-6 py-2 bg-gray-800 text-white rounded-lg">
              Login
            </button>
          </div>
        </form>
      </div>
      <div class="flex bg-gray-800 lg:w-full h-screen items-center">
        <h1 class="text-white text-center px-10 text-3xl lg:text-6xl">
          Attendance Management System
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
