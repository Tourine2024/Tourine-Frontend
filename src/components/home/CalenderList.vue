<template>
  <div class="date">
    <v-locale-provider locale="ko">
      <DatePicker class="datePicker" :allowed-dates="allowedDates" v-model="selectedDate" />
    </v-locale-provider>
    <div class="diary-cards">
      <v-card
        v-for="diary in filteredDiaries"
        :key="diary.id"
        :to="{
          name: 'diaryDetail',
          params: { tripNo: diary.tripNo, diaryNo: diary.diaryNo },
        }"
        class="card mx-auto"
        height="96px"
        link
      >
        <img src="@/assets/icon/bus.svg" />
        <p>{{ diary.diaryTitle }}</p>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DatePicker from "@/components/common/DatePicker.vue";
import { getAllDiarys } from "@/api/home";
import { dateFormatter } from "@/util/date/dateFormat";

const diaries = ref([]);
const selectedDate = ref(null);
const memberNo = localStorage.getItem("memberNo");

const diaryDates = new Set();

onMounted(async () => {
  await getDiaries();
});

async function getDiaries() {
  try {
    const response = await getAllDiarys(memberNo);
    diaries.value = response;
    console.log("Diaries loaded:", diaries.value);
    response.forEach((diary) => {
      diaryDates.add(diary.diaryDate.replace(/-/g, ".")); // 날짜 부분만 추출
    });
  } catch (error) {
    console.error("Failed to load diaries:", error);
  }
}

const allowedDates = (date) => {
  const formattedDate = dateFormatter(date);
  return diaryDates.has(formattedDate);
};

const filteredDiaries = computed(() => {
  if (selectedDate.value) {
    const selectedDateString = dateFormatter(selectedDate.value);
    return diaries.value.filter(
      (diary) => diary.diaryDate.replace(/-/g, ".") === selectedDateString
    );
  } else {
    return null;
  }
});
</script>

<style scoped>
.date {
  position: relative;
  width: 100%;
  height: 755px;
  border-radius: 12px;
  background-color: white;
  margin-right: 2rem;
  padding: 1rem;
}

.datePicker {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.diary-cards {
  overflow-y: auto;
  max-height: 300px;
  padding: 0 1rem;
}

.card {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: rgba(0, 133, 86, 0.1);
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

img {
  margin-right: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

p {
  font-size: 16px;
  font-weight: bold;
  flex-grow: 1;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
