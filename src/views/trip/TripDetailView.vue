<template>
  <div id="div-trip-detail-top">
    <div class="wrapper">
      <TripDetailTitleItem :trip="trip" />
      <template v-if="diaries.length > 0">
        <v-row id="map">
          <v-col cols="8">
            <MapItem
              :center="mapCenter"
              :markers="markers"
              :zoom="2"
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
            <v-row class="mt-4">
              <v-col cols="6" class="pr-0">
                <v-btn
                  :class="{ 'btn-active': showPath }"
                  :color="showPath ? 'blue' : 'white'"
                  @click="showPath = true"
                  block
                >
                  동선 보이기
                </v-btn>
              </v-col>
              <v-col cols="6" class="pl-0">
                <v-btn
                  :class="{ 'btn-active': !showPath }"
                  :color="!showPath ? 'blue' : 'white'"
                  @click="showPath = false"
                  block
                >
                  동선 숨기기
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn v-if="selectedDate" @click="resetDate" block
                  >모든 날짜 보기</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col col="12">
                <v-btn v-if="selectedDate" @click="setDiaryData" block
                  >기록 추가하기</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>
      <div class="mx-1 pt-5 pb-3">
        <v-row class="d-flex justify-space-between">
          <span class="flex-1-0 align-self-center pl-5">
            <h1 class="font-weight-black text-center">여행 기록</h1>
          </span>
        </v-row>
        <div v-for="(tripDate, key) in tripDates" :key="key">
          <template
            v-if="!selectedDate || tripDate === dateFormatter(selectedDate)"
          >
            <DiariesByDayItem
              :dayCnt="getDayCnt(tripDate)"
              :tripNo="trip.tripNo"
              :tripDate="tripDate"
              :diaries="getDiariesByDate(tripDate)"
            />
          </template>
        </div>
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
import { useDiaryStore } from "@/stores/diary";

import { ref, reactive, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const diaryStore = useDiaryStore();

const trip = ref({});
const diaries = ref([]);
const tripDates = reactive([]);
const mapCenter = ref({ lat: 0.0, lng: 0.0 });
const markers = ref([]);
const path = ref(null);
const showPath = ref(false);
const selectedDate = ref(null);

watch(selectedDate, async () => {
  if (selectedDate.value) {
    await getMarkersByDate(dateFormatter(selectedDate.value));
  } else {
    await getMarkers();
  }
  router.push({ path: route.fullPath, hash: "#map" });
});

watch([showPath, markers], ([newShowPath, newMarkers]) => {
  if (newShowPath && newMarkers.length > 0) {
    path.value = {
      path: newMarkers,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    };
  } else {
    path.value = null; // 숨기기
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
      trip.value.tripDiaryCount = diaries.value.length;
    }
    await getMarkers();
  } catch (error) {
    console.error(error);
  }
}

async function getMarkers() {
  const tmpMarkers = [];
  for (const diary of diaries.value) {
    const locationLatLng = await getLocation(diary.locationNo);
    tmpMarkers.push(locationLatLng);
  }
  markers.value = tmpMarkers;
}

async function getMarkersByDate(tripDate) {
  if (tripDate) {
    const tmpMarkers = [];
    const filteredDiaries = diaries.value.filter(
      (diary) => diary.diaryDate === tripDate
    );
    for (const diary of filteredDiaries) {
      const locationLatLng = await getLocation(diary.locationNo);
      tmpMarkers.push(locationLatLng);
    }
    markers.value = tmpMarkers;
  } else {
    await getMarkers();
  }
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

function getDayCnt(tripDate) {
  return (
    Math.abs(
      (new Date(tripDate).getTime() -
        new Date(trip.value.tripStartDate).getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1
  );
}

function getDiariesByDate(tripDate) {
  return diaries.value.filter((diary) => diary.diaryDate === tripDate);
}

const setDiaryData = () => {
  diaryStore.tripDate = dateFormatter(selectedDate.value);
  router.push({
    name: "diaryNew",
    params: { tripNo: trip.value.tripNo },
  });
};

onMounted(async () => {
  const data = await getTripInfo(route.params.tripNo);
  trip.value = {
    ...data,
    tripDiaryCount: 0,
  };
  // Object.assign(trip.value, data);
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
