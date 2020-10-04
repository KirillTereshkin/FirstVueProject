import Vue from "vue";
import Vuelidate from "vuelidate";
import toastPlugin from "@/utils/toast.util";
import App from "./App.vue";
import Loader from "@/components/app/CSSLoader";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import tooltipDirective from "@/directives/tooltip.directive";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(toastPlugin);
Vue.use(Vuelidate);

Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);

Vue.directive('tooltip', tooltipDirective);

Vue.component("Loader", Loader);

firebase.initializeApp({
  apiKey: "AIzaSyDv2y8jMVRj86fZ_JfAKFcAc8B9vvBd9IA",
  authDomain: "vue-train-project.firebaseapp.com",
  databaseURL: "https://vue-train-project.firebaseio.com",
  projectId: "vue-train-project",
  storageBucket: "vue-train-project.appspot.com",
  messagingSenderId: "763574070923",
  appId: "1:763574070923:web:b008f9ba317c98011b6e8e",
  measurementId: "G-JMCN5W1BZD"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app)
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
});
