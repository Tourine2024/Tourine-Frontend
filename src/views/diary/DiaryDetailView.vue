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
        <v-btn class="mx-1" :to="{ name: 'diaryUpdate' }">수정</v-btn>
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
            {{ location.locationName }}
          </div>
        </v-col>
      </div>

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
            <MapItem :center="mapCenter" :markers="[mapCenter]" />
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
import { ref, onMounted, reactive, watch } from "vue";
import { getDiaryInfo } from "@/api/diary";
import { useRoute } from "vue-router";
import MapItem from "@/components/common/MapItem.vue";
import { useDiaryStore } from "@/stores/diary";
import { getLocationInfo } from "@/api/location";
import Editor from "@toast-ui/editor";

const route = useRoute();
const tripNo = route.params.tripNo;
const diaryNo = route.params.diaryNo;

const diaryStore = useDiaryStore();

const diary = ref({
  diaryNo: diaryNo,
  diaryTitle: "",
  diaryDate: "",
  diaryTime: "",
  diaryContent: "",
  locationNo: 1,
  tripNo: tripNo,
});

const location = ref({});
const mapCenter = reactive({ lat: 0, lng: 0 });

onMounted(async () => {
  // getDiary();
  // const diaryData = await getDiaryInfo(route.params.diaryNo);
  // Object.assign(diary.value, diaryData);

  // //html 변환
  // diary.diaryContent = convertMarkdownToHTML(diary.value.diaryContent);
  // console.log("html", diary.diaryContent);

  const data = await getDiaryInfo(diaryNo);
  // diary 객체 전체를 한 번에 업데이트하지 않고, 필드별로 업데이트
  diary.value.diaryTitle = data.diaryTitle;
  diary.value.diaryDate = data.diaryDate;
  diary.value.diaryTime = data.diaryTime;

  diary.value.diaryContent = convertMarkdownToHTML(data.diaryContent);
  diaryStore.diaryContent = data.diaryContent;
  console.log("html", diary.value.diaryContent);

  diary.value.locationNo = data.locationNo;
  diary.value.tripNo = data.tripNo;

  const locationData = await getLocationInfo(diary.value.locationNo);
  Object.assign(location.value, locationData);
  mapCenter.lat = locationData.locationLatitude;
  mapCenter.lng = locationData.locationLongitude;
});

//const mapCenter = reactive({ lat: 37.458649, lng: 126.441946 });

//const locationName = "인천공항";

const getDiary = async () => {
  try {
    const data = await getDiaryInfo(diaryNo);
    console.log(data);

    // diary 객체 전체를 한 번에 업데이트
    diary.value = data;
    console.log("html", diary.diaryContent);
    diary.diaryContent = convertMarkdownToHTML(diary.diaryContent);

    // diaryStore.diary = data;
  } catch (error) {
    console.error("일기 데이터를 가져오는 중 오류 발생:", error);
  }
};

// Markdown to HTML 변환 함수
function convertMarkdownToHTML(markdown) {
  const editor = new Editor({
    el: document.createElement("div"), // 임시로 사용할 보이지 않는 엘리먼트를 생성
    initialEditType: "markdown",
    initialValue: markdown, // 변환할 Markdown 내용을 입력
  });

  return editor.getHTML(); // 변환된 HTML을 반환
}

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
  min-height: 85vh;
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
  background-color: #e3f2fd;
  /* Hover 시 배경색 */
  color: #1976d2;
  /* Hover 시 텍스트/아이콘 색상 */
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
