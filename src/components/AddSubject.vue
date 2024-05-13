<template>
    <div>
      <div class="w-96 h-full p-10 bg-white shadow-2xl rounded-lg">
        <h2>Add a Subject</h2>
        <form class="grid gap-7" action="">
          <div class="grid justify-start">
            <label class="flex font-extrabold" for="">Subject Id</label>
            <input
              class="w-72 h-10 rounded-md p-2 shadow-xl bg-gray-200"
              type="text"
              placeholder="Subject Id"
            />
          </div>
          <div class="grid justify-start">
            <label class="flex" for="">Subject Name</label>
            <input
              class="w-72 h-10 rounded-md p-2 shadow-2xl bg-gray-200"
              type="text"
              placeholder="Subject Name"
            />
          </div>
          <div class="grid justify-start">
            <label class="flex" for="">Semester</label>
            <input
              class="w-72 h-10 rounded-md p-2 shadow-2xl bg-gray-200"
              type="text"
              placeholder="Select Semester"
            />
          </div>
          
          <button class="bg-green-600 px-2 py-2 w-72 rounded-md">Add</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style></style>
  