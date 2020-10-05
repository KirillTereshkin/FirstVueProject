<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>
<script>
import { toastMessages, toastStyles } from "@/utils/toast-info";

export default {
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      this.$addToast(
        toastMessages[fbError.code] || "Ошибка",
        toastStyles.error
      );
    },
  },
};
</script>
