<template>
  <div id="div-trip-detail-top">
    <div class="wrapper">
      <TripDetailTitleItem :trip="trip" />
      <template v-if="diaries.length > 0">
        <MapItem :center="mapCenter" :markers="markers" />
      </template>
      <div class="mx-1 pt-5 pb-3">
        <v-row class="d-flex justify-space-between">
          <span class="flex-1-0 align-self-center pl-5">
            <h1 class="font-weight-black text-center">여행 기록</h1>
          </span>
          <span>
            <v-btn-toggle
              v-model="btnText"
              class="d-flex flex-row-reverse mr-5"
              color="indigo-accent-3"
              group
            >
              <v-btn
                class="rounded-t-lg px-3 mr-1 align-self-end"
                value="order-by-location"
                height="40px"
                >장소별 기록 보기</v-btn
              >
              <v-btn
                class="rounded-t-lg px-3 align-self-end"
                value="order-by-date"
                height="40px"
                >날짜별 기록 보기</v-btn
              >
            </v-btn-toggle>
          </span>
        </v-row>
        <template v-if="btnText === 'order-by-date'">
          <div v-for="(tripDate, key) in tripDates" :key="key">
            <DiariesByDayItem
              :dayCnt="++dayCnt"
              :tripNo="trip.tripNo"
              :tripDate="tripDate"
              :diaries="getDiariesByDate(tripDate)"
            />
          </div>
        </template>
        <template v-if="btnText === 'order-by-location'"> </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import TripDetailTitleItem from "@/components/trip/TripDetailTitleItem.vue";
import MapItem from "@/components/common/MapItem.vue";
import DiariesByDayItem from "@/components/diary/DiariesByDayItem.vue";
import { dateFormatter } from "@/util/date/dateFormat";
import { getTripInfo, getDiaryLists } from "@/api/trip";
import { getLocationInfo } from "@/api/location";

import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const trip = ref({});
const diaries = ref([]);
const tripDates = reactive([]);
const mapCenter = ref({ lat: 0.0, lng: 0.0 });
const markers = reactive([]);
const btnText = ref("order-by-date");

async function getDiaryDates() {
  let tmpDate = new Date(trip.value.tripStartDate);
  let endDate = new Date(trip.value.tripEndDate);
  while (tmpDate <= endDate) {
    const dateStr = dateFormatter(tmpDate);
    tripDates.push(dateStr);
    tmpDate.setDate(tmpDate.getDate() + 1);
  }
}

async function getDiaries() {
  try {
    const response = await getDiaryLists(route.params.tripNo);
    diaries.value = response;
    if (diaries.value.length > 0) {
      mapCenter.value = await getLocation(diaries.value[0].locationNo);
    }
    const _ = await getMarkers();
  } catch (error) {
    console.error(error);
  }
}

async function getMarkers() {
  diaries.value.forEach((diary) => {
    getMarkerByDiary(diary.locationNo);
  });
}

async function getMarkerByDiary(locationNo) {
  const locationLatLng = await getLocation(locationNo);
  markers.push(locationLatLng);
}

async function getLocation(locationNo) {
  try {
    const response = await getLocationInfo(locationNo);
    return {
      lat: response.locationLatitude,
      lng: response.locationLongitude,
    };
  } catch (error) {
    console.error(error);
  }
}

let dayCnt = 0;
function getDiariesByDate(tripDate) {
  if (tripDate === trip.value.tripEndDate) dayCnt = 0;
  return diaries.value.filter((diary) => diary.diaryDate === tripDate);
}

onMounted(async () => {
  const data = await getTripInfo(route.params.tripNo);
  Object.assign(trip.value, data);
  getDiaryDates();
  getDiaries();
});
</script>

<style scoped>
#div-trip-detail-top {
  padding: 0 1.5rem;
  background-color: #cfedfe;
  height: fit-content;
}

.wrapper {
  padding-bottom: 3rem;
}
</style>
