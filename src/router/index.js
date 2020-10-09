import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("../views/Login")
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty" },
    component: () => import("../views/Register")
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Categories")
  },
  {
    path: "/detail-record/:id",
    name: "detail-record",
    meta: { layout: "main", auth: true },
    component: () => import("../views/DetailRecord")
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main", auth: true },
    component: () => import("../views/History")
  },
  {
    path: "/",
    name: "home",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Home")
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Planning")
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Profile")
  },
  {
    path: "/records",
    name: "records",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Records")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !firebase.auth().currentUser)
    next("/login?message=login");
  else next();
});

export default router;
