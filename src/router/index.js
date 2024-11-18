import { createRouter, createWebHistory } from "vue-router";

import AboutView from "../views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";
import LandingView from "@/views/landing/LandingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
      meta: { hideHeaderFooter: true },
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/trips",
      name: "trips",
      component: () => import("@/views/trip/TripsView.vue"),
    },
    {
      path: "/trips/new",
      name: "tripNew",
      component: () => import("@/views/trip/TripInsertView.vue"),
    },
    {
      path: "/trip/:tripNo",
      name: "tripDetail",
      component: () => import("@/views/trip/TripDetailView.vue"),
    },
    {
      path: "/trip/:tripNo/diary/new",
      name: "diaryNew",
      component: () => import("@/views/diary/DiaryInsertView.vue"),
    },
    {
      path: "/trip/:tripNo/diary/:diaryNo",
      name: "diaryDetail",
      component: () => import("@/views/diary/DiaryDetailView.vue"),
    },
  ],
});

export default router;
