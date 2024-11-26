<template>
  <div class="container">
    <!-- 상단 버튼 섹션 -->
    <div class="button-row">
      <v-btn
        color="blue-lighten-5"
        prepend-icon="mdi-arrow-u-left-top"
        :to="{ name: 'tripDetail', params: { tripNo: diary.tripNo } }"
      >
        여행으로 돌아가기
      </v-btn>
      <div>
        <v-btn
          class="mx-1"
          :to="{
            name: 'diaryUpdate',
            params: { tripNo: diary.tripNo, diaryNo: diary.diaryNo },
          }"
          color="blue-darken-3"
          style="font-size: 18px"
          >수정</v-btn
        >
        <v-btn class="mx-1" color="red" @click="showDeleteDialog = true" style="font-size: 18px"
          >삭제</v-btn
        >
      </div>
    </div>
    <div class="wrapper">
      <!-- 제목 및 날짜 섹션 -->
      <div class="mx-1">
        <v-col>
          <h1 class="font-weight-bold mb-3">{{ diary.diaryTitle }}</h1>
          <div class="text-subtitle-1 mb-3" style="font-size: 18px">
            {{ diary.diaryDate }} {{ diary.diaryTime }}
          </div>
          <div class="d-flex">
            <span
              class="px-2 mr-3 rounded-lg d-inline-flex align-center"
              :class="getClassByCategory(diary)"
            >
              <template v-if="diary.diaryCategory === 1">
                <img src="@/assets/icon/luggage.svg" class="mr-1" />
                <span>관광</span>
              </template>
              <template v-else-if="diary.diaryCategory === 2">
                <img src="@/assets/icon/food.svg" class="mr-1" />
                <span>음식</span>
              </template>
              <template v-else-if="diary.diaryCategory === 3">
                <img src="@/assets/icon/activity.svg" class="mr-1" />
                <span>액티비티</span>
              </template>
              <template v-else-if="diary.diaryCategory === 0">
                <img src="@/assets/icon/etc.svg" class="mr-1" />
                <span>기타</span>
              </template>
            </span>
            <span class="clickable-icon" @click="showMapDialog = true">
              <v-icon icon="mdi-map-marker" />
              {{ location.locationName }}
            </span>
          </div>
        </v-col>
      </div>

      <!-- 내용 섹션 -->
      <v-row class="mx-1 my-4">
        <v-col>
          <div class="content" v-html="diary.diaryContent" />
        </v-col>
      </v-row>

      <!-- 삭제 모달 -->
      <v-dialog v-model="showDeleteDialog" max-width="400">
        <v-card>
          <v-card-title class="headline">삭제 확인</v-card-title>
          <v-card-text>정말로 삭제하시겠습니까?</v-card-text>
          <v-card-actions>
            <v-btn color="red" text @click="deleteDiaryReq" style="font-size: 18px">삭제</v-btn>
            <v-btn color="grey" text @click="showDeleteDialog = false" style="font-size: 18px"
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
            <v-btn color="primary" text @click="showMapDialog = false" style="font-size: 18px"
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
import { useRoute, useRouter } from "vue-router";
import MapItem from "@/components/common/MapItem.vue";
import { useDiaryStore } from "@/stores/diary";
import { getLocationInfo } from "@/api/location";
import Editor from "@toast-ui/editor";
import { deleteDiary } from "@/api/diary";

const route = useRoute();
const router = useRouter();
const tripNo = route.params.tripNo;
const diaryNo = route.params.diaryNo;

const diaryStore = useDiaryStore();

const diary = ref({
  diaryNo: diaryNo,
  diaryTitle: "",
  diaryDate: "",
  diaryTime: "",
  diaryCategory: null,
  diaryContent: "",
  locationNo: 1,
  tripNo: tripNo,
});

const location = ref({});
const mapCenter = reactive({ lat: 0, lng: 0 });

onMounted(async () => {
  await getDiary();
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
  diary.value.diaryCategory = data.diaryCategory;

  diary.value.diaryContent = updateImageWidthInHtml(
    convertMarkdownToHTML(data.diaryContent)
  );
  diaryStore.diaryContent = data.diaryContent;
  console.log("html", diary.value.diaryContent);

  diary.value.locationNo = data.locationNo;
  diary.value.tripNo = data.tripNo;

  const locationData = await getLocationInfo(diary.value.locationNo);
  location.value = { ...locationData };
  mapCenter.lat = locationData.locationLatitude;
  mapCenter.lng = locationData.locationLongitude;
});

const getDiary = async () => {
  try {
    const data = await getDiaryInfo(diaryNo);
    console.log(data);

    // diary 객체 전체를 한 번에 업데이트
    diary.value = data;
    console.log("html", diary.diaryContent);
    diary.diaryContent = updateImageWidthInHtml(
      convertMarkdownToHTML(diary.diaryContent)
    );

    console.log(diary.diaryContent);

    // diaryStore.diary = data;
  } catch (error) {
    console.error("일기 데이터를 가져오는 중 오류 발생:", error);
  }
};

const getClassByCategory = (diary) => {
  if (diary.diaryCategory === 1) {
    return "bg-green-lighten-4";
  } else if (diary.diaryCategory === 2) {
    return "bg-amber-lighten-4";
  } else if (diary.diaryCategory === 3) {
    return "bg-purple-lighten-4";
  } else {
    return "bg-blue-lighten-4";
  }
};

//이미지 크기 변환
function updateImageWidthInHtml(htmlString) {
  console.log(htmlString);
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const images = doc.querySelectorAll("img");
  const lists = doc.querySelectorAll("li");

  images.forEach((img) => {
    img.style.width = "50%";
  });

  lists.forEach((li) => {
    li.style.margin = "1rem";
  });

  return doc.body.innerHTML;
}

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

const deleteDiaryReq = async () => {
  await deleteDiary(diaryNo);
  alert("삭제되었습니다.");
  showDeleteDialog.value = false;

  router.push({
    name: "tripDetail",
    params: { tripNo: tripNo },
  });
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cfedfe;

  padding: 0 2rem;
  min-height: 85vh;
}

.wrapper {
  width: 90%;
  background-color: white;
  padding: 0.5rem;
  margin-bottom: 5rem;
  border-radius: 12px;
  height: fit-content;
}

.v-row {
  height: fit-content;
}

.v-btn {
  margin-bottom: 1rem;
  font-size: 20px;
  font-weight: 700;
}

.button-row {
  width: 90%;
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

.content img {
  max-width: 100%;
  height: auto;
}
</style>
