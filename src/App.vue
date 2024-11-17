<script setup>
import { RouterView } from "vue-router";
import Footer from "./components/common/Footer.vue";
import Header from "./components/common/Header.vue";
</script>

<template>
  <v-app>
    <Header />

    <RouterView />

    <Footer />
  </v-app>
</template>

<style scoped>
.v-app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

/* header {
  line-height: 1.5;
  max-height: 100vh;
} */
</style>
