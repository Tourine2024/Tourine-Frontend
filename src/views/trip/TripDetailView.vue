<template>
  <div id="div-trip-detail-top">
    <div class="wrapper">
      <TripDetailTitleItem :trip="trip" />
      <template v-if="diaries.length > 0">
        <v-row>
          <v-col cols="8">
            <MapItem
              :center="mapCenter"
              :markers="markers"
              :zoom="11"
              :path="path"
            />
          </v-col>
          <v-col>
            <v-locale-provider locale="ko">
              <DatePicker
                v-model="selectedDate"
                :allowed-dates="allowedDates"
                :year="parseInt(trip.tripStartDate.substr(0, 4))"
                :month="parseInt(trip.tripStartDate.substr(5, 2)) - 1"
                class="w-100 mt-5"
              />
            </v-locale-provider>
            <v-btn @click="resetDate">초기화</v-btn>
          </v-col>
        </v-row>
      </template>
      <div class="mx-1 pt-5 pb-3">
        <v-row class="d-flex justify-space-between">
          <span class="flex-1-0 align-self-center pl-5">
            <h1 class="font-weight-black text-center">여행 기록</h1>
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
import DatePicker from "@/components/common/DatePicker.vue";
import { dateFormatter } from "@/util/date/dateFormat";
import { getTripInfo, getDiaryLists } from "@/api/trip";
import { getLocationInfo } from "@/api/location";

import { ref, reactive, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const trip = ref({});
const diaries = ref([]);
const tripDates = reactive([]);
const mapCenter = ref({ lat: 0.0, lng: 0.0 });
const markers = ref([]);
const path = ref(null);
const selectedDate = ref(null);
const btnText = ref("order-by-date");

watch(selectedDate, async () => {
  if (selectedDate.value) {
    getMarkersByDate(dateFormatter(selectedDate.value));
  } else {
    getMarkers();
  }
});

function resetDate() {
  selectedDate.value = null;
}

async function getDiaryDates() {
  let tmpDate = new Date(trip.value.tripStartDate);
  let endDate = new Date(trip.value.tripEndDate);
  while (tmpDate <= endDate) {
    const dateStr = dateFormatter(tmpDate);
    tripDates.push(dateStr);
    tmpDate.setDate(tmpDate.getDate() + 1);
  }
}

const allowedDates = (date) => {
  const formattedDate = dateFormatter(date);
  return (
    formattedDate >= trip.value.tripStartDate &&
    formattedDate <= trip.value.tripEndDate
  );
};

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
  markers.value = [];
  diaries.value.forEach((diary) => {
    getMarkerByDiary(diary.locationNo);
  });
}

async function getMarkersByDate(tripDate) {
  if (tripDate) {
    markers.value = [];
    diaries.value
      .filter((diary) => diary.diaryDate === tripDate)
      .forEach((diary) => {
        getMarkerByDiary(diary.locationNo);
      });
  } else {
    getMarkers();
  }
}

async function getMarkerByDiary(locationNo) {
  const locationLatLng = await getLocation(locationNo);
  markers.value.push(locationLatLng);
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
