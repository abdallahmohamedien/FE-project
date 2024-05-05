<template>
  <div class="bg-gray-400">
    <HeaderPage />
    <SearchBar />
    <StudentSection />
  </div>
</template>

<script>
import StudentSection from "../components/StudentSection.vue";
import HeaderPage from "@/components/HeaderPage.vue";
import SearchBar from "@/components/SearchBar.vue";
export default {
  name: "StudentPage",
  components: {
    StudentSection,
    HeaderPage,
    SearchBar,
  },
};
</script>

<style></style>
