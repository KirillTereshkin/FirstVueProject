<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(currencyName, index) in Object.keys(currency)"
              :key="index"
            >
              <td>{{ currencyName }}</td>
              <td>{{ currency[currencyName].toFixed(2) }}</td>
              <td>{{ currencyDate | date("date") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home-currency-card",
  props: {
    date: {
      type: String,
      required: true
    },
    currency: {
      type: Object,
      required: true
    }
  },
  computed: {
    currencyDate() {
      return new Date(this.date);
    }
  },
  methods: { 
  }
};
</script>
