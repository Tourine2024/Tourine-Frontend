<script setup></script>

<template>
  <div class="tripdays">
    <h3>올해 내가 여행한 날짜 🗓️</h3>
    <p>{{ tripDays }} days</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getTripDays } from "@/api/home";

// const memberNo = 1; // 이후 세션에서 가져올 것
const memberNo = localStorage.getItem("memberNo");
const tripDays = ref(0);

onMounted(async () => {
  tripDays.value = await getTripDays(memberNo);
});
</script>

<style scoped>
.tripdays {
  /* width: 339px; */
  position: relative;
  width: 100%;
  height: 171px;
  border-radius: 12px;
  background-color: white;

  margin-right: 2rem;

  padding: 1rem;
}

h3 {
  width: 100%;

  font-size: 16px;
  font-weight: bold;
  color: #9aa2ac;
}

p {
  position: absolute;
  width: 100%;
  left: 0%;
  bottom: 30%;

  font-size: 32px;
  font-weight: bold;

  text-align: center;
  justify-content: center;
}
</style>
