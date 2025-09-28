<template>
  <div class="flex items-center space-x-2">
    <button
      @click="$emit('view', id)"
      title="View Details"
      class="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition duration-150"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    </button>
    
    <button
      v-if="canEdit"
      @click="$emit('edit', id)"
      title="Edit"
      class="p-1 rounded-full text-amber-600 hover:bg-amber-100 transition duration-150"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    </button>

    <button
      v-if="canDelete"
      @click="confirmDelete"
      title="Delete"
      class="p-1 rounded-full text-red-600 hover:bg-red-100 transition duration-150"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  name: "ActionSec",
  props: {
    id: {
      type: [String, Number],
      default: null,
    },
    disableView: {
      type: Boolean,
      default: false,
    },
    disableEdit: {
      type: Boolean,
      default: false,
    },
    disableDelete: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    confirmDelete() {
      // 💡 استخدام دالة تأكيد بسيطة (يمكن استبدالها بـ Modal احترافي لاحقاً)
      if (confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
        this.$emit('delete', this.id);
      }
    },
  },
  // 💡 تحديد الأحداث التي يصدرها المكون
  emits: ['view', 'edit', 'delete'],
};

</script>

<style scoped></style>
