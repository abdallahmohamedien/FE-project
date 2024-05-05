<template>
  <div class="bg-gray-400">
    <HeaderPage />
    <SearchBarVue />
    <ReportSection />
  </div>
</template>

<script>
import SearchBarVue from "@/components/SearchBar.vue";
import HeaderPage from "../components/HeaderPage.vue";
import ReportSection from "../components/ReportSection.vue";

export default {
  name: "ReportAttend",
  components: {
    HeaderPage,
    ReportSection,
    SearchBarVue,
  },
};
</script>
