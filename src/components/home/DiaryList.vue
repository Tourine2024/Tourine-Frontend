<template>
  <div class="list">
    <h3>나의 여행 기록</h3>
    <v-data-table
      :headers="headers"
      :items="diaries"
      density="comfortable"
      item-key="diaryTitle"
      height="450px"
      hide-default-footer
    ></v-data-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAllDiarys } from "@/api/home";

const diaries = ref([]);

const headers = ref([
  { title: "날짜", key: "diaryDate" },
  { title: "여행명", key: "tripName" },
  { title: "제목", key: "diaryTitle" },
  { title: "여행지", key: "locationName" },
]);

// const memberNo = 1;
const memberNo = localStorage.getItem("memberNo");

onMounted(async () => {
  await getDiaries();
});

async function getDiaries() {
  try {
    const response = await getAllDiarys(memberNo);
    diaries.value = response;
    console.log(diaries.value);
  } catch (error) {
    console.error("Failed to load diaries:", error);
  }
}
</script>

<style scoped>
.list {
  position: relative;
  width: 100%;
  height: 560px;
  border-radius: 12px;
  background-color: white;
  margin: 0.8rem;
  padding: 1.5rem;
}

h3 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.v-btn {
  width: 100%;
  margin-top: 1rem;
}
</style>
