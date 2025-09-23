<template>
  <div class="grid grid-cols-10 bg-gray-200">
    <div class="col-span-2">
      <SideBar />
    </div>
    <div class="col-span-8">
      <HeaderBar />
      <div class="p-10">
        <DevicesTable />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import DevicesTable from "@/components/DevicesTable.vue";

export default {
  name: "DashBoard",
  components: {
    SideBar,
    HeaderBar,
    DevicesTable,
  },
};
</script>

<style></style>
