<!-- Home.vue -->
<template>
  <div class="bg-gray-400">
    <HeaderPage />
    <TitleSec />
    <AttendSection />
  </div>
</template>

<script>
import AttendSection from "@/components/AttendSection.vue";
import HeaderPage from "@/components/HeaderPage.vue";
import TitleSec from "../components/TitleSec.vue";
export default {
  name: "HomePage",
  components: {
    AttendSection,
    HeaderPage,
    TitleSec
  },
};
</script>
