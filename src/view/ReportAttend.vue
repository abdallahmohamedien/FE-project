<template>
  <div class="bg-gray-400">
    <HeaderPage />
    <ReportSection />
  </div>
</template>

<script>

import HeaderPage from "../components/HeaderPage.vue";
import ReportSection from "../components/students/ReportSection.vue";

export default {
  name: "ReportAttend",
  components: {
    HeaderPage,
    ReportSection,
    
  },
};
</script>
