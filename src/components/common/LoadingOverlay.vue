<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-white flex items-center justify-center z-50"
  >
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingOverlay",
  props: {
    visible: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.loader {
  width: 50px;
  height: 50px;
  border: 6px solid #ddd;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
