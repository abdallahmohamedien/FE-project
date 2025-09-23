<template>
  <div>
    <div class="flex justify-around bg-gray-500 p-2 rounded-lg">
      <h1 class="text-center p-2">Devices</h1>
      <button class="bg-green-300 p-2 rounded-xl" @click="addDevice">
        Add Device
      </button>
    </div>
    <div class="p-3 bg-gray-300">
      <div class="grid grid-cols-5">
        <div>
          Device Name
          <ul class="py-2">
            <li class="py-8">abdo</li>
            <li>mo</li>
          </ul>
        </div>
        <div>
          Device UID
          <ul class="py-2">
            <li class="py-8">uydrte34w536475708</li>
            <li>uydrte34w536478979</li>
          </ul>
        </div>
        <div>
          Device Date
          <ul class="py-2">
            <li class="py-8">12/06/2024</li>
            <li>30/05/2024</li>
          </ul>
        </div>
        <div>
          Device Mode
          <ul class="py-2">
            <li class="py-8">
              <div class="">
                <button class="bg-green-500 py-1 p-2 rounded-md">
                  Enrollment</button
                ><button class="ml-4 bg-blue-500 py-1 p-2 rounded-md">
                  Attendance
                </button>
              </div>
            </li>
            <li>
              <div class="">
                <button class="bg-green-500 py-1 p-2 rounded-md">
                  Enrollment</button
                ><button class="ml-4 bg-blue-500 py-1 p-2 rounded-md">
                  Attendance
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div>
          Device Config
          <ul class="py-2">
            <li class="py-8">hh</li>
            <li>hh</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
