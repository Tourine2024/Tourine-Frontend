<template>
  <div class="container">
    <!-- 상단 버튼 섹션 -->
    <div class="button-row mx-10" justify="space-between" align="center">
      <v-btn
        prepend-icon="mdi-arrow-u-left-top"
        :to="{ name: 'tripDetail', params: { tripNo: diary.tripNo } }"
      >
        여행으로 돌아가기
      </v-btn>
      <div>
        <v-btn class="mx-1" @click="showModifyDialog">수정</v-btn>
        <v-btn class="mx-1" color="red" @click="showDeleteDialog = true"
          >삭제</v-btn
        >
      </div>
    </div>
    <div class="wrapper">
      <!-- 제목 및 날짜 섹션 -->
      <div class="mx-1">
        <v-col>
          <h1 class="font-weight-bold mb-3">{{ diary.diaryTitle }}</h1>
          <div class="text-subtitle-1 mb-3">
            {{ diary.diaryDate }} {{ diary.diaryTime }}
          </div>
          <div class="clickable-icon" @click="showMapDialog = true">
            <v-icon icon="mdi-map-marker" />
            {{ locationName }}
          </div>
        </v-col>
      </div>

      <!-- 지도 섹션 -->
      <!-- <MapItem class="mb-5" :center="mapCenter" /> -->

      <!-- 내용 섹션 -->
      <v-row class="mx-1 mb-3">
        <v-col>
          <div v-html="diary.diaryContent" />
        </v-col>
      </v-row>

      <!-- 삭제 모달 -->
      <v-dialog v-model="showDeleteDialog" max-width="400">
        <v-card>
          <v-card-title class="headline">삭제 확인</v-card-title>
          <v-card-text>정말로 삭제하시겠습니까?</v-card-text>
          <v-card-actions>
            <v-btn color="red" text @click="deleteDiary">삭제</v-btn>
            <v-btn color="grey" text @click="showDeleteDialog = false"
              >취소</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 지도 모달 -->
      <v-dialog v-model="showMapDialog" max-width="800">
        <v-card>
          <v-card-title class="headline">지도 보기</v-card-title>
          <v-card-text>
            <MapItem :center="mapCenter" />
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="showMapDialog = false"
              >닫기</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import MapItem from "@/components/common/MapItem.vue";

const mapCenter = reactive({ lat: 37.458649, lng: 126.441946 });

const diary = reactive({
  diaryNo: 0,
  diaryTitle: "출발",
  diaryDate: "2024.12.01",
  diaryTime: "00:00",
  diaryContent: `
    <img src="https://www.casenews.co.kr/news/photo/202408/16250_35442_5945.jpg" width="300px"/>
    <br><br>
    오늘 드디어 비행기를 타고 여행을 시작했다. 
    인천공항에서 아침 일찍 출발했는데도 공항이 굉장히 붐볐다.
    설레는 마음으로 비행기에 올라타서 창밖을 보니 구름이 정말 아름다웠다. 
    이번 여행이 내게 어떤 추억으로 남을지 기대가 된다.
  `,
  locationNo: 0,
  tripNo: 1,
});

const locationName = "인천공항";

const showModifyDialog = () => {};

// 삭제 모달 제어
const showDeleteDialog = ref(false);

// 지도 모달 제어
const showMapDialog = ref(false);

const deleteDiary = () => {
  alert("삭제되었습니다.");
  showDeleteDialog.value = false;
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: #cfedfe;

  padding: 0 2rem;
  min-height: 100vh;
}

.wrapper {
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 12px;
}

.v-row {
  height: fit-content;
}

.button-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
}

.clickable-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: fit-content;
  background-color: #e3f2f0;
}

.clickable-icon:hover {
  background-color: #e3f2fd; /* Hover 시 배경색 */
  color: #1976d2; /* Hover 시 텍스트/아이콘 색상 */
}

.v-card {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.v-card-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}
</style>
