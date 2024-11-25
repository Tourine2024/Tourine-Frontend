import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import LandingView from "@/views/landing/LandingView.vue";
import LoginView from "@/views/member/LoginView.vue";
import RegisterVue from "@/views/member/RegisterView.vue";
import KakaoLoginView from "@/views/member/KakaoLoginView.vue";

const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) {
      const element = document.querySelector(to.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return { selector: to.hash };
      }
    }
    return { top: 0 };
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
      meta: { hideHeaderFooter: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { hideHeaderFooter: true },
    },
    {
      path: "/login/kakao",
      name: "kakaoLogin",
      component: KakaoLoginView,
      meta: { hideHeaderFooter: true },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterVue,
      meta: { hideHeaderFooter: true },
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/mypage",
      name: "mypage",
      component: () => import("@/views/MyPageView.vue"),
    },
    {
      path: "/collection",
      name: "collection",
      component: () => import("@/views/collection/CollectionView.vue"),
      meta: { hideHeaderFooter: true },
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
      path: "/trip/:tripNo/modify",
      name: "tripModify",
      component: () => import("@/views/trip/TripUpdateView.vue"),
    },
    {
      path: "/trip/:tripNo/diary/new",
      name: "diaryNew",
      component: () => import("@/views/diary/DiaryInsertView.vue"),
      props: true,
    },
    {
      path: "/trip/:tripNo/diary/:diaryNo",
      name: "diaryDetail",
      component: () => import("@/views/diary/DiaryDetailView.vue"),
      props: true,
    },
    {
      path: "/trip/:tripNo/diary/:diaryNo/edit",
      name: "diaryUpdate",
      component: () => import("@/views/diary/DiaryUpdateView.vue"),
      props: true,
    },
  ],
});

export default router;
