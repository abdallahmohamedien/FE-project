<!-- Home.vue -->
<template>
  <div class="bg-gray-50 ">
    <HeaderPage />
    <AttendSection />
  </div>
</template>

<script>
import AttendSection from "@/components/attendances/AttendSection.vue";
import HeaderPage from "@/components/HeaderPage.vue";
export default {
  name: "HomePage",
  components: {
    AttendSection,
    HeaderPage,
  },
};
</script>
