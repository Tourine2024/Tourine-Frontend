<template>
  <div id="div-trips-top" class="my-5">
    <!-- 제목 섹션 -->
    <v-row align="center" justify="space-between" class="mx-5">
      <h1 class="title">나의 여행</h1>
      <v-btn prepend-icon="mdi-plus" color="green" rounded="lg" :to="{ name: 'tripNew' }"> 새 여행 만들기 </v-btn>
    </v-row>

    <!-- 여행 리스트 -->
    <template v-for="(trip, key) in trips" :key="key">
      <RouterLink :to="{ name: 'tripDetail', params: { tripNo: trip.tripNo } }">
        <TripItem :trip="trip" />
      </RouterLink>
    </template>

    <!-- 더 보기 버튼 -->
    <div id="div-more-btn">
      <v-btn class="my-3" rounded="xl" color="blue">Load more 100+</v-btn>
    </div>
  </div>
</template>

<script setup>
import TripItem from "@/components/trip/TripItem.vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const trips = ref([
  {
    tripNo: 1,
    tripName: "서울 탐험",
    tripSummary:
      "The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening, or next month when we go on holidays is not here yet.",
    tripThumbnailUrl: "https://example.com/thumbnails/seoul.jpg",
    tripStartDate: "2024.03.01",
    tripEndDate: "2024.03.07",
    memberNo: 1,
  },
  {
    tripNo: 2,
    tripName: "도쿄 여행",
    tripSummary:
      "The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening, or next month when we go on holidays is not here yet.",
    tripThumbnailUrl: "https://example.com/thumbnails/tokyo.jpg",
    tripStartDate: "2024.05.01",
    tripEndDate: "2024.05.07",
    memberNo: 2,
  },
  {
    tripNo: 3,
    tripName: "파리 여행",
    tripSummary:
      "The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening, or next month when we go on holidays is not here yet.",
    tripThumbnailUrl: "https://example.com/thumbnails/paris.jpg",
    tripStartDate: "2024.06.15",
    tripEndDate: "2024.06.20",
    memberNo: 3,
  },
  {
    tripNo: 4,
    tripName: "런던 탐방",
    tripSummary:
      "The only moment, the only life we have is in the NOW. What happened a few moments or several years ago is gone, what will happen this evening, or next month when we go on holidays is not here yet.",
    tripThumbnailUrl: "https://example.com/thumbnails/london.jpg",
    tripStartDate: "2024.07.10",
    tripEndDate: "2024.07.17",
    memberNo: 4,
  },
]);
</script>

<style scoped>
#div-trips-top {
  background-color: white;
  margin: 0 20px;
  border-radius: 16px;
}

h1.title {
  font-weight: bold;
  margin: 0;
  padding: 20px 0;
}

#div-more-btn {
  text-align: center;
  padding-bottom: 20px;
}
</style>
