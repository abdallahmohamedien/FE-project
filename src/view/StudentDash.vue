<template>
  <div class="grid grid-cols-10 bg-gray-200">
    <div class="col-span-2">
      <SideBar />
    </div>
    <div class="col-span-8">
      <HeaderBar />
      <div class="flex p-10 gap-10">
        <AddForm />
        <AttendTable />
      </div>
      <div>
        <router-link to="/student_update"
          ><button class="px-2 py-2 bg-blue-400 rounded-lg">
            Update Student
          </button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import AddForm from "@/components/AddForm.vue";
import AttendTable from "@/components/AttendTable.vue";
export default {
  name: "DashBoard",
  components: {
    SideBar,
    HeaderBar,
    AddForm,
    AttendTable,
  },
};
</script>

<style></style>
