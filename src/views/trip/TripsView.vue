<template>
  <div id="div-trips-top">
    <div class="wrapper">
      <!-- 제목 섹션 -->
      <v-row align="center" justify="space-between" class="mx-5">
        <h1 class="title">나의 여행</h1>
        <v-btn
          class="newTrip"
          prepend-icon="mdi-plus"
          color="blue-darken-2"
          rounded="lg"
          :to="{ name: 'tripNew' }"
          style="font-size: 18px"
        >
          새 여행 만들기
        </v-btn>
      </v-row>

      <template v-if="trips.length > 0">
        <!-- 여행 리스트 -->
        <div v-for="(trip, key) in trips" :key="key">
          <RouterLink :to="{ name: 'tripDetail', params: { tripNo: trip.tripNo } }">
            <TripItem :trip="trip" />
          </RouterLink>
        </div>
      </template>
      <template v-else>
        <div class="text-center" style="font-size: 25px">여행이 없습니다.</div>
      </template>

      <!-- 더 보기 버튼 -->
      <div id="div-more-btn">
        <v-btn
          v-if="showButton"
          style="font-size: 18px"
          class="my-3"
          rounded="xl"
          color="blue"
          @click="getTrips"
          >Load more</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import TripItem from "@/components/trip/TripItem.vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { getTripLists } from "@/api/trip";

const trips = ref([]);
const showButton = ref(true);
let pageNo = 1;

async function getTrips() {
  try {
    const response = await getTripLists(pageNo++);
    // const response = await localAxios.get("/trips?pageNo=" + pageNo++);
    trips.value.push(...response);

    // const moreResponse = await localAxios().get("/trips?pageNo=" + pageNo);
    const moreResponse = await getTripLists(pageNo);
    if (moreResponse.length == 0) {
      showButton.value = false;
    }
  } catch (error) {
    console.error("Error fetching trips:", error);
  }
}

getTrips();
</script>

<style scoped>
#div-trips-top {
  background-color: #cfedfe;
  padding: 0 1rem;
  height: 100%;
}

.wrapper {
  width: 90%;
  margin: 0 auto;
}

h1.title {
  font-weight: bold;
  margin: 0;
  padding: 20px 0;
}

#div-more-btn {
  text-align: center;
  padding-bottom: 20px;
  margin-bottom: 3rem;
}

.newTrip {
  font-size: 20px;
  height: 50px;
}
</style>
