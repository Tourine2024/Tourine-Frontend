<script setup></script>

<template>
  <div class="recentTrip">
    <h3>최근 여행</h3>
    <h1>Rome</h1>
    <div class="btn-group">
      <button><img src="@/assets/icon/button/arrow_left.svg" /></button>
      <button><img src="@/assets/icon/button/arrow_right.svg" /></button>
    </div>
    <img src="@/assets/image/home_rome.svg" alt="Rome" />
  </div>
</template>
<style scoped>
.recentTrip {
  position: relative;
  /* width: 798px; */
  height: 302px;
  border-radius: 12px;
  background-color: #feeccf;

  padding: 2rem;
}

.recentTrip h3 {
  font-size: 24px;
  font-weight: 700;
}

.recentTrip h1 {
  font-size: 72px;
  font-weight: bold;
}

.btn-group {
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.btn-group > button {
  margin-right: 1rem;
}

.recentTrip > img {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
