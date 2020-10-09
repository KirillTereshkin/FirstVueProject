<template>
  <div class="app-main-layout" v-if="isFetchingFinished">
    <Sidebar @hide-navbar="isSideBarOpen = !isSideBarOpen" />

    <Navbar :isOpen="isSideBarOpen" />

    <main class="app-content" :class="{ full: !isSideBarOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div
      class="fixed-action-btn"
      v-tooltip="{ html: 'Добавить новую запись', position: 'top' }"
    >
      <router-link class="btn-floating btn-large blue" to="/records">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
  <Loader v-else />
</template>
<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import { toastMessages, toastStyles } from "@/utils/toast-info.js";
import Loader from "@/components/app/CSSLoader";

export default {
  name: "main-layout",
  data: () => ({
    isSideBarOpen: true,
    isFetchingFinished: false,
  }),
  components: {
    Navbar,
    Sidebar,
    Loader,
  },
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
  async mounted() {
    try {
      if (!Object.keys(this.$store.getters.getUserInfo).length) {
        await this.$store.dispatch("fetchUerInfo");
        await this.$store.dispatch("fetchCategories");
        await this.$store.dispatch("fetchRecords");
        this.isFetchingFinished = true;
      }
    } catch (e) {
      this.$addToast(toastMessages.unknownError, toastStyles.error);
    }
  },
};
</script>
