<!-- About.vue -->
<template>
  <div class="bg-gray-400">
    <HeaderPage />

    <AttendSection />
  </div>
</template>

<script>
import HeaderPage from "../components/HeaderPage.vue";
import AttendSection from "../components/AttendSection.vue";

export default {
  name: "AboutUs",
  components: {
    HeaderPage,
    AttendSection,
  },
};
</script>
