<template>
  <div class="bg-gray-100 ">
    <HeaderPage />
    <StudentSection />
  </div>
</template>

<script>
import StudentSection from "../components/students/StudentSection.vue";
import HeaderPage from "@/components/HeaderPage.vue";

export default {
  name: "StudentPage",
  components: {
    StudentSection,
    HeaderPage,
    
  },
};
</script>

<style></style>
