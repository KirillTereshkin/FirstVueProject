<template>
  <main class="app-content">
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>История записей</h3>
        </div>

        <div class="history-chart">
          <canvas></canvas>
        </div>

        <Loader v-if="!isLoaded" />
        <p v-else-if="!Object.keys($store.getters.getRecords).length">
          Записей пока нет,
          <router-link to="/records">добавить запись</router-link>
        </p>
        <HistoryTable v-else/>
      </div>
    </div>
  </main>
</template>
<script>
import HistoryTable from "@/components/HistoryTable";
import Loader from "@/components/app/CSSLoader";

export default {
  name: "history",
  data: () => ({
    isLoaded: false,
  }),
  components: {
    HistoryTable,
    Loader,
  },
  async mounted() {
    try {
      await this.$store.dispatch("fetchRecords");
      this.isLoaded = true;
    } catch (e) {}
  },
};
</script>