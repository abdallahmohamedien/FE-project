<template>
  <div class="grid grid-cols-10 bg-gray-200">
    <div class="col-span-2">
      <SideBar />
    </div>
    <div class="col-span-8">
      <HeaderBar />
      <div class="flex p-10 gap-10">
        <AddTeacher />
        <AttendTable />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import AddTeacher from "@/components/AddTeacher.vue";
import AttendTable from "@/components/AttendTable.vue";
export default {
  name: "DashBoard",
  components: {
    SideBar,
    HeaderBar,
    AddTeacher,
    AttendTable,
  },
};
</script>

<style></style>
