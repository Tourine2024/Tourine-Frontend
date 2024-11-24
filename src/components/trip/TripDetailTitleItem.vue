<template>
  <div>
    <v-row align="start">
      <v-col cols="6">
        <v-card variant="text">
          <v-card-subtitle
            >{{ trip.tripStartDate }} - {{ trip.tripEndDate }}</v-card-subtitle
          >
          <h1 class="font-weight-black ml-4">{{ trip.tripName }}</h1>
          <v-card-text>{{ trip.tripSummary }}</v-card-text>
          <template v-if="showButtons">
            <v-btn
              @click="summarize(trip.tripNo)"
              class="md-3 ml-4"
              rounded="xl"
              color="blue"
            >
              AI 요약하기+
            </v-btn>
            <v-btn
              @click="createStamp(trip.tripNo)"
              class="md-3 ml-4"
              rounded="xl"
              color="green"
            >
              우표 만들기 📮
            </v-btn>
          </template>
          <v-btn
            class="md-3 ml-4"
            rounded="xl"
            color="blue"
            :to="{ name: 'tripModify', params: { tripNo: trip.tripNo } }"
          >
            수정
          </v-btn>
          <v-btn
            class="md-3 ml-4"
            rounded="xl"
            color="red"
            @click="showDeleteDialog = true"
          >
            삭제
          </v-btn>
        </v-card>
      </v-col>
      <v-col class="text-xs-center" align="center">
        <v-img
          :src="trip.tripThumbnailUrl"
          class="md-2 rounded-circle"
          width="250px"
          height="250px"
          cover
        >
          <template v-slot:error>
            <v-img
              :src="DEFAULT_IMAGE_PATH"
              class="md-2 rounded-circle"
              width="250px"
              height="250px"
              cover
            ></v-img>
          </template>
        </v-img>
      </v-col>
    </v-row>

    <!-- 이미지 보기 모달 -->
    <v-dialog v-model="showImageDialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-h5">우표 이미지</v-card-title>
        <v-card-text>
          <v-container>
            <v-row justify="center">
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
              ></v-progress-circular>
              <v-img
                v-if="!loading"
                :src="stampImageUrl"
                aspect-ratio="1"
                contain
              ></v-img>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="closeImageDialog"
            >닫기</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 삭제 모달 -->
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">삭제 확인</v-card-title>
        <v-card-text>정말로 삭제하시겠습니까?</v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="deleteTrip($route.params.tripNo)"
            >삭제</v-btn
          >
          <v-btn color="grey" text @click="showDeleteDialog = false"
            >취소</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { deleteTripInfo, updateTripInfo } from "@/api/trip";
import { drawPostCard, summarizeTrip } from "@/api/openAI.js";
import { DEFAULT_IMAGE_PATH } from "@/api/image";

const props = defineProps({
  trip: Object,
});

const router = useRouter();
const showDeleteDialog = ref(false);
const showImageDialog = ref(false);
const stampImageUrl = ref("");
const loading = ref(false);

const showButtons = computed(() => props.trip.tripDiaryCount >= 3);

const summarize = async (tripNo) => {
  const summary = await summarizeTrip(tripNo);
  if (summary !== "fail") {
    props.trip.tripSummary = summary;
    await updateTripInfo(props.trip);
  }
};

const createStamp = async (tripNo) => {
  loading.value = true;
  showImageDialog.value = true;
  try {
    stampImageUrl.value = await drawPostCard(tripNo);
  } catch (error) {
    console.error("Error generating stamp:", error);
    alert("우표 이미지를 생성하는 데 실패했습니다. 다시 시도해주세요.");
  } finally {
    loading.value = false;
    showImageDialog.value = false; // 모달 창 닫기
  }
};

const closeImageDialog = () => {
  showImageDialog.value = false;
  loading.value = false;
  stampImageUrl.value = ""; // 이미지 URL 초기화
};

const deleteTrip = async (tripNo) => {
  await deleteTripInfo(tripNo);
  alert("삭제되었습니다.");
  router.push({ name: "trips" });
};
</script>

<style scoped></style>
