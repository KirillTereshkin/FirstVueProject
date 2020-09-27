<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p
          v-for="(curencyName, index) in Object.keys(currency)"
          :key="index"
          class="currency-line"
        >
          <span>{{
            getBillInCurrency(curencyName) | currency(curencyName)
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home-bill-card",
  props: {
    currency: {
      type: Object,
      required: true
    }
  },
  computed: {
    billTotal() {
      return this.$store.getters.getUserInfo.bill;
    }
  },
  methods: {
    getBillInCurrency(curencyName) {
      return (this.billTotal / this.currency.RUB) * this.currency[curencyName];
    }
  }
};
</script>
