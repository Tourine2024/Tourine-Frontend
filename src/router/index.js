import { createRouter, createWebHistory } from "vue-router";

import AboutView from "../views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: AboutView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/trips",
      name: "trips",
      component: () => import("../views/TripsView.vue"),
    },
    {
      path: "/trip/:tripNo",
      name: "tripDetail",
      component: () => import("../views/TripDetailView.vue"),
    },
  ],
});

export default router;
