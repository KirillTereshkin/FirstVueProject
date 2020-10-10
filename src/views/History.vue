<template>
  <main class="app-content">
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>История записей</h3>
        </div>

        <div class="history-chart">
          <canvas ref="canvas"></canvas>
        </div>

        <Loader v-if="!isLoaded" />
        <p v-else-if="!Object.keys($store.getters.getRecords).length">
          Записей пока нет,
          <router-link to="/records">добавить запись</router-link>
        </p>
        <HistoryTable v-else />
      </div>
    </div>
  </main>
</template>
<script>
import HistoryTable from "@/components/HistoryTable";
import Loader from "@/components/app/CSSLoader";
import { Pie } from "vue-chartjs";

export default {
  name: "history",
  extends: Pie,
  data: () => ({
    isLoaded: false,
  }),
  components: {
    HistoryTable,
    Loader,
  },
  methods: {
    changePage(e) {
      console.log(e);
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("fetchRecords");
      this.isLoaded = true;
    } catch (e) {}

    let income = 0,
      outcome = 0;

    Object.values(this.$store.getters.getRecords).forEach((item) => {
      if (item.type === "income") income += item.sum;
      if (item.type === "outcome") outcome += item.sum;
    });

    this.renderChart({
      labels: ["Доход", "Расход", "Остаток"],
      datasets: [
        {
          label: "Итог",
          data: [income,outcome, this.$store.getters.getUserInfo.bill],
          backgroundColor: [
            "rgba(75, 192, 192, 0.5)",
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  },
};
</script>