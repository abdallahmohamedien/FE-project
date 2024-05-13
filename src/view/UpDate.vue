<template>
  <div class="grid grid-cols-10 bg-gray-200">
    <div class="col-span-2">
      <SideBar />
    </div>
    <div class="col-span-8">
      <HeaderBar />
      <div class="flex justify-center py-10">
        <UpdateStu />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import UpdateStu from "@/components/UpdateStu.vue";
export default {
  name: "DashBoard",
  components: {
    SideBar,
    HeaderBar,
    UpdateStu,
  },
};
</script>

<style></style>
