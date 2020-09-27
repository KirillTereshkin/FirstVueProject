<template>
  <main class="app-content">
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>Счет</h3>

          <button
            class="btn waves-effect waves-light btn-small"
            @click="refresh"
          >
            <i class="material-icons">refresh</i>
          </button>
        </div>

        <Loader ref="LoaderRef" v-if="!currency" />
        <div v-else class="row">
          <HomeBillCard :currency="currency.rates" />

          <HomeCurrencyCard :currency="currency.rates" :date="currency.date" />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import HomeBillCard from "@/components/HomeBillCard";
import HomeCurrencyCard from "@/components/HomeCurrencyCard";
import { toastStyles } from "@/utils/toast-info";

export default {
  name: "home",
  data: () => ({
    currency: null,
    totalBill: null
  }),
  components: {
    HomeBillCard,
    HomeCurrencyCard
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.currency = null;
      this.$store
        .dispatch("fetchCurrency")
        .then(r => (this.currency = this.$store.getters.currency));
    }
  }
};
</script>
