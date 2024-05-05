<template>
  <div class="grid grid-cols-10">
    <div class="col-span-2">
      <SideBar />
    </div>
    <div class="col-span-8">
      <HeaderBar />
      <WelcomeSec />
      <AttendTable />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import WelcomeSec from "@/components/WelcomeSec.vue";
import AttendTable from "@/components/AttendTable.vue"
export default {
  name: "DashBoard",
  components: {
    SideBar,
    HeaderBar,
    WelcomeSec,
    AttendTable
  },
};
</script>

<style></style>
