<script setup>
import HomeLogo from "./HomeLogo.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="header">
    <div class="wrapper">
      <HomeLogo />
      <nav>
        <RouterLink :to="{ name: 'trips' }"
          ><img src="@/assets/icon/menu_travel.svg" />나의 여행</RouterLink
        >
        <RouterLink to="/mypage"><img src="@/assets/icon/menu_mypage.svg" />마이 페이지</RouterLink>
      </nav>
    </div>
  </div>
</template>
<style scoped>
.header {
  background-color: #cfedfe;
  display: flex;
  justify-content: center;
  height: fit-content;
}

.wrapper {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  width: 90%;
  height: 65px;

  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: end;

  background-color: white;
  border-radius: 12px;

  font-size: 24px;
  font-weight: bold;

  margin-right: 1.5rem;
}

nav a {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  margin-right: 20px;

  min-width: fit-content;
}

nav a img {
  margin-right: 1rem;
}

nav a:hover {
  color: #00507a;
  font-weight: bolder;
}

nav a.router-link-exact-active {
  color: #27292c;
  font-weight: bolder;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

/* nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
} */

nav a:first-of-type {
  border: 0;
}
</style>
