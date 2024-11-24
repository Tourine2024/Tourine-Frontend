<template>
  <div class="pt-5">
    <span class="d-flex align-items-center">
      <h2>{{ dayCnt }}일차 - {{ tripDate }}</h2>
      <v-btn
        class="align-self-center mx-3 mt-1"
        icon="mdi-plus"
        density="compact"
        @click="setDiaryData"
      >
      </v-btn>
    </span>
    <div v-if="diaries.length > 0" class="mx-auto" width="1000px">
      <v-slide-group show-arrows>
        <template v-slot:prev>
          <v-btn icon="mdi-chevron-left" color="blue"> </v-btn>
        </template>
        <template v-slot:next>
          <v-btn icon="mdi-chevron-right" color="blue"> </v-btn>
        </template>
        <v-slide-group-item v-for="(diary, key) in diaries" :key="key">
          <div
            class="flip-card"
            @mouseenter="setHoverState(key, true)"
            @mouseleave="setHoverState(key, false)"
          >
            <div class="flip-card-inner" :class="{ flipped: hoverStates[key] }">
              <!-- 카드 앞면 -->
              <v-card
                class="ma-4 flip-card-front d-flex flex-column align-center justify-center"
              >
                <v-card-title class="font-weight-black text-truncate">
                  {{ diary.diaryTitle }}
                </v-card-title>
              </v-card>
              <!-- 카드 뒷면 -->
              <v-card
                :to="{
                  name: 'diaryDetail',
                  params: { tripNo: diary.tripNo, diaryNo: diary.diaryNo },
                }"
                class="ma-4 flip-card-back d-flex flex-column align-center justify-center"
                style="padding: 16px"
              >
                <v-card-text
                  v-html="convertMarkdownToHTML(diary.diaryContent)"
                  class="limited-text mb-auto"
                ></v-card-text>
              </v-card>
            </div>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </div>
    <div v-else>여행 기록이 없습니다.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDiaryStore } from "@/stores/diary";
import Editor from "@toast-ui/editor";

const router = useRouter();
const diaryStore = useDiaryStore();

const props = defineProps({
  dayCnt: Number,
  tripNo: Number,
  tripDate: String,
  diaries: Array,
});

const hoverStates = ref([]); // 각 다이어리 항목의 호버 상태를 관리하는 배열

// 초기 설정: 각 diary 항목에 대해 hover 상태를 false로 초기화
onMounted(() => {
  hoverStates.value = new Array(props.diaries.length).fill(false);
});

function convertMarkdownToHTML(markdown) {
  const editor = new Editor({
    el: document.createElement("div"), // 임시로 사용할 보이지 않는 엘리먼트를 생성
    initialEditType: "markdown",
    initialValue: markdown, // 변환할 Markdown 내용을 입력
  });

  return editor.getHTML(); // 변환된 HTML을 반환
}

const setHoverState = (index, state) => {
  hoverStates.value[index] = state;
};

const setDiaryData = () => {
  diaryStore.tripDate = props.tripDate;
  router.push({
    name: "diaryNew",
    params: { tripNo: props.tripNo },
  });
};
</script>

<style scoped>
h2 {
  font-weight: bolder;
  display: inline;
}

.v-slide-group__prev,
.v-slide-group__next {
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

/* 카드 뒤집기 관련 스타일 */
.flip-card {
  perspective: 1000px; /* 3D 효과를 위한 원근감 설정 */
  width: 300px;
  height: 200px;
  margin: 10px; /* 카드 간격 설정 */
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg); /* 호버 시 Y축으로 180도 회전 */
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 250px;
  height: 150px;
  backface-visibility: hidden; /* 카드의 뒷면을 숨기기 위한 설정 */
  border-radius: 12px;
}

.flip-card-front {
  background-color: #fff;
  z-index: 2;
}

.flip-card-back {
  background-color: #f5f5f5;
  transform: rotateY(180deg); /* 뒤집힌 상태에서 뒷면 보이기 */
}

/* 카드 내 아이템 중앙 정렬 */
.v-card {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}

/* 카드 뒷면에서 HTML 내용 오버플로우 처리 및 줄임말 적용 */
.limited-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
