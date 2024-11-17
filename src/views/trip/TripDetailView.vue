<template>
  <div id="div-trip-detail-top" class="my-5">
    <TripDetailTitleItem :trip="trip" />
    <MapItem :center="mapCenter" />
    <div class="mx-1 py-3">
      <v-row class="d-flex justify-space-between">
        <span class="flex-1-0 align-self-center pl-5">
          <h1 class="font-weight-black text-center">여행 기록</h1>
        </span>
        <span>
          <v-btn-toggle v-model="btnText" class="d-flex flex-row-reverse mr-5" color="indigo-accent-3" group>
            <v-btn class="rounded-t-lg px-3 mr-1 align-self-end" value="order-by-location" height="40px">장소별 기록 보기</v-btn>
            <v-btn class="rounded-t-lg px-3 align-self-end" value="order-by-date" height="40px">날짜별 기록 보기</v-btn>
          </v-btn-toggle>
        </span>
      </v-row>
      <template v-if="btnText === 'order-by-date'">
        <template v-for="(tripDate, key) in tripDates" :key="key">
          <DiariesByDayItem :dayCnt="++dayCnt" :tripNo="trip.tripNo" :tripDate="tripDate" :diaries="getDiariesByDate(tripDate)" />
        </template>
      </template>
      <template v-if="btnText === 'order-by-location'"> </template>
    </div>
  </div>
</template>

<script setup>
import TripDetailTitleItem from "@/components/trip/TripDetailTitleItem.vue";
import MapItem from "@/components/common/MapItem.vue";
import DiariesByDayItem from "@/components/diary/DiariesByDayItem.vue";

import { ref, reactive } from "vue";

const btnText = ref("order-by-date");

const mapCenter = { lat: 15.882632, lng: 108.325234 };

const trip = reactive({
  tripNo: 1,
  tripName: "13반과 호이안 여행",
  tripSummary:
    "Et labore harum non nobis ipsum eum molestias mollitia et corporis praesentium a laudantium internos. Non quis eius quo eligendi corrupti et fugiat nulla qui soluta recusandae in maxime quasi aut ducimus illum aut optio quibusdam!",
  tripThumbnailUrl: "https://example.com/thumbnails/hoian.jpg",
  tripStartDate: "2024.12.01",
  tripEndDate: "2024.12.06",
  memberNo: 1,
});

const diaries = reactive([
  {
    diaryNo: 0,
    diaryTitle: "출발",
    diaryDate: "2024.12.01",
    diaryTime: "00:00",
    diaryContent: "비행기를 타고 출발~",
    locationNo: 0,
    tripNo: 1,
  },
  {
    diaryNo: 1,
    diaryTitle: "호이안 도착",
    diaryDate: "2024.12.01",
    diaryTime: "09:00",
    diaryContent: "호이안에 도착했다. 한국은 추웠는데 여기는 무척이나 더웠다.",
    locationNo: 1,
    tripNo: 1,
  },
  {
    diaryNo: 2,
    diaryTitle: "숙소 체크인",
    diaryDate: "2024.12.01",
    diaryTime: "15:00",
    diaryContent: "숙소가 아주 넓어서 좋았다. 수영장도 있었다.",
    locationNo: 2,
    tripNo: 1,
  },
  {
    diaryNo: 3,
    diaryTitle: "저녁 식사",
    diaryDate: "2024.12.01",
    diaryTime: "18:00",
    diaryContent: "쌀국수가 맛있었다.",
    locationNo: 3,
    tripNo: 1,
  },
  {
    diaryNo: 4,
    diaryTitle: "둘째 날 아침",
    diaryDate: "2024.12.02",
    diaryTime: "09:00",
    diaryContent: "눈부신 햇살에 잠이 깼다.",
    locationNo: 4,
    tripNo: 1,
  },
  {
    diaryNo: 5,
    diaryTitle: "점심 식사",
    diaryDate: "2024.12.02",
    diaryTime: "13:00",
    diaryContent: "식당에 사람이 아주 많았다.",
    locationNo: 5,
    tripNo: 1,
  },
  {
    diaryNo: 6,
    diaryTitle: "넷째 날 아침",
    diaryDate: "2024.12.04",
    diaryTime: "09:00",
    diaryContent: "숙소에서 아침 식사를 했다.",
    locationNo: 6,
    tripNo: 1,
  },
  {
    diaryNo: 7,
    diaryTitle: "숙소 체크아웃",
    diaryDate: "2024.12.06",
    diaryTime: "11:00",
    diaryContent: "아쉬움을 뒤로 하고 떠날 시간.",
    locationNo: 7,
    tripNo: 1,
  },
]);

const tripDates = reactive([]);
let tmpDate = new Date(trip.tripStartDate);
let endDate = new Date(trip.tripEndDate);
while (tmpDate <= endDate) {
  let dateStr = "";
  dateStr += tmpDate.getFullYear() + ".";
  dateStr += tmpDate.getMonth() + 1 + ".";
  if (tmpDate.getDate() < 10) dateStr += "0" + tmpDate.getDate();
  else dateStr += tmpDate.getDate();
  tripDates.push(dateStr);
  tmpDate.setDate(tmpDate.getDate() + 1);
}

let dayCnt = 0;
function getDiariesByDate(tripDate) {
  if (tripDate === trip.tripEndDate) dayCnt = 0;
  return diaries.filter((diary) => diary.diaryDate === tripDate);
}
</script>

<style scoped>
#div-trip-detail-top {
  margin: 0 20px;
  border-radius: 16px;
}
</style>
