<template>
  <div
    class="recentTrip"
    :style="{
      backgroundImage: `url(${currentTrip.tripThumbnailUrl || defaultTripPic})`,
    }"
  >
    <div class="content" @click="routeDetail(currentTrip.tripNo)">
      <h1>최근 여행</h1>
      <h3>{{ currentTrip.tripName }}</h3>
      <p>{{ currentTrip.tripStartDate }} - {{ currentTrip.tripEndDate }}</p>
      <div class="btn-group">
        <button
          :class="{
            'button-visible': showPrevButton,
            'button-invisible': !showPrevButton,
          }"
          @click.stop="prevTrip"
        >
          <img src="@/assets/icon/button/arrow_left.svg" />
        </button>
        <button
          :class="{
            'button-visible': showNextButton,
            'button-invisible': !showNextButton,
          }"
          @click.stop="nextTrip"
        >
          <img src="@/assets/icon/button/arrow_right.svg" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import defaultTripPic from "@/assets/image/landing/swiss.jpg";
import { getAllTrips } from "@/api/home";
import { useRouter } from "vue-router";

const router = useRouter();
// const memberNo = 1;
const memberNo = localStorage.getItem("memberNo");
const tripList = ref([]);
const currentTripIndex = ref(0);

onMounted(async () => {
  tripList.value = await getAllTrips(memberNo);
});

const currentTrip = computed(() => {
  return tripList.value[currentTripIndex.value] || {};
});

const showPrevButton = computed(() => {
  return currentTripIndex.value > 0;
});

const showNextButton = computed(() => {
  return currentTripIndex.value < tripList.value.length - 1;
});

function nextTrip() {
  if (showNextButton.value) {
    currentTripIndex.value++;
  }
}

function prevTrip() {
  if (showPrevButton.value) {
    currentTripIndex.value--;
  }
}

function routeDetail(tripNo) {
  router.push({
    name: "tripDetail",
    params: { tripNo: tripNo },
  });
}
</script>

<style scoped>
.recentTrip {
  position: relative;
  height: 302px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  padding: 1rem;
  overflow: hidden;
}

.content {
  height: 250px;
  position: absolute;
  left: 2rem;
  right: 2rem;
  color: white;
  text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.7);
  cursor: pointer;
}

.recentTrip h1,
h3,
p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recentTrip h1 {
  font-size: 24px;
  font-weight: 700;
}

.recentTrip h3 {
  margin-top: 1rem;
  font-size: 50px;
  font-weight: 900;
}

.recentTrip p {
  font-size: 18px;
  font-weight: 500;
  margin-top: 0.5rem;
}

.btn-group {
  position: absolute;
  right: 2rem;
  bottom: 0rem;
  display: flex;
}

.btn-group > button {
  margin: 0 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.3s;
}

.button-visible {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.button-invisible {
  background: transparent;
  box-shadow: none;
}

.btn-group > button:hover {
  background-color: #ffffff;
  transform: scale(1.1);
}

.btn-group > button.button-invisible:hover {
  background-color: transparent;
  transform: none;
}

.btn-group > button img {
  height: 24px;
}
</style>
