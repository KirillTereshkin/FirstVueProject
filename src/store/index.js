import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import info from "./info";
import categories from "./categories";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    currency: null
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setCurrency(state, currency) {
      state.currency = currency;
    }
  },
  getters: {
    error: s => s.error,
    currency: s => s.currency
  },
  actions: {
    async fetchCurrency({ commit }) {
      try {
        const body = await fetch(
          "https://api.exchangeratesapi.io/latest?symbols=USD,RUB"
        );
        const currency = await body.json();
        commit("setCurrency", {
          date: currency.date,
          rates: { [currency.base]: 1, ...currency.rates }
        });
      } catch (e) {
        commit("setError", e);
      }
    }
  },
  modules: {
    auth,
    info,
    categories
  }
});
