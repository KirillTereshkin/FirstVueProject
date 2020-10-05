<template>
  <main class="app-content" v-if="getRecordsLoadingStatus">
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>Планирование</h3>
          <h4>{{ getTotalBill | currency }}</h4>
        </div>

        <p v-if="!Object.keys(categories).length">
          Категории отсутствуют,
          <router-link to="/categories">добавить категорию</router-link>
        </p>

        <section
          v-else
          v-for="cat in Object.entries(categories)"
          :key="cat[0]"
          :style="{ cursor: 'pointer' }"
          v-tooltip="{ html: cat[1].text }"
        >
          <div>
            <p>
              <strong>{{ cat[1].name }}:</strong>
              {{ cat[1].sum | currency }} из {{ cat[1].limit | currency }}
            </p>
            <div class="progress">
              <div
                class="determinate"
                :class="cat[1].color"
                :style="{
                  width: `${
                    cat[1].percentage > 100 ? 100 : cat[1].percentage
                  }%`,
                }"
              ></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
  <Loader v-else />
</template>
<script>
import Loader from "@/components/app/CSSLoader";

export default {
  name: "planing",
  data: () => ({
    categories: {},
  }),
  components: {
    Loader,
  },
  computed: {
    getTotalBill() {
      return this.$store.getters.getUserInfo.bill;
    },
    getRecordsLoadingStatus() {
      return this.$store.getters.getRecordsLoadingStatus;
    },
    getCategories() {
      return this.$store.getters.getCategories;
    },
  },
  methods: {
    getPercantage(cat) {
      return (cat.sum / cat.limit) * 100;
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch("fetchRecords");

      const newCategories = {};

      Object.entries(this.$store.getters.getCategories).forEach(
        ([key, val]) => {
          if (!newCategories[key]) {
            const sum = Object.values(this.$store.getters.getRecords).reduce(
              (prevVal, item) =>
                prevVal +
                (item.id === key ? item.sum : 0) *
                  (item.type === "income" ? -1 : 1),
              0
            );
            const percentage = (sum / val.limit) * 100;
            const color =
              percentage < 60
                ? "green"
                : percentage < 80
                ? "yellow"
                : percentage < 100
                ? "red"
                : "red accent-4";
            const text =
              percentage > 100
                ? "Превышено на: "
                : "Доступно: " +
                  this.$options.filters.currency(
                    (Math.abs(percentage - 100) / 100) * val.limit
                  ) +
                  `, использовано ${percentage.toFixed(0)}%`;
            newCategories[key] = {
              name: val.name,
              limit: val.limit,
              sum,
              percentage,
              color,
              text,
            };
          }
        }
      );
      this.categories = newCategories;
    } catch (e) {}
  },
};
</script>