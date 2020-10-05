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

        <Loader v-if="getRecordsLoadingStatus" />
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
  components: {
    HistoryTable,
    Loader,
  },
  computed: {
    getRecordsLoadingStatus() {
      return this.$store.getRecordsLoadingStatus;
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("fetchRecords");
    } catch (e) {}
  },
};
</script>