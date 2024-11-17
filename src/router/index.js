import { createRouter, createWebHistory } from "vue-router";

import AboutView from "../views/AboutView.vue";
import DiaryDetailView from "@/views/DiaryDetailView.vue";

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
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/trips",
      name: "trips",
      component: () => import("@/views/TripsView.vue"),
    },
    {
      path: "/trips/new",
      name: "tripNew",
      component: () => import("@/views/TripInsertView.vue"),
    },
    {
      path: "/trip/:tripNo",
      name: "tripDetail",
      component: () => import("@/views/TripDetailView.vue"),
    },
    {
      path: "/trip/:tripNo/diary/new",
      name: "diaryNew",
      component: () => import("@/views/DiaryInsertView.vue"),
    },
    {
      path: "/trip/:tripNo/diary/:diaryNo",
      name: "diaryDetail",
      component: () => import("@/views/DiaryDetailView.vue"),
    },
  ],
});

export default router;
