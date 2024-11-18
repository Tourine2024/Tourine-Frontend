<script setup>
import { RouterView, useRoute } from "vue-router"; // useRoute로 현재 경로 확인
import Footer from "./components/common/Footer.vue";
import Header from "./components/common/Header.vue";

const route = useRoute(); // 현재 경로 정보
</script>

<template>
  <v-app>
    <!-- Header 조건부 렌더링 -->
    <Header v-if="!route.meta.hideHeaderFooter" />

    <RouterView />

    <!-- Footer 조건부 렌더링 -->
    <Footer v-if="!route.meta.hideHeaderFooter" />
  </v-app>
</template>

<style scoped>
.v-app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}
</style>
