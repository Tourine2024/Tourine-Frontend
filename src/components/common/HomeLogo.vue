<template>
  <RouterLink class="logo" :to="{ name: 'home' }">
    <img src="@/assets/icon/tourine_logo.svg" alt="Tourine Logo" height="50" />
    <p>Tourine</p>
  </RouterLink>
</template>
<style scoped>
.logo {
  width: 262px;
  height: 78px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  padding: 2rem;

  background-color: white;
  border-radius: 12px;
}
p {
  margin-left: 1rem;
  color: #27292c;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
}
</style>
