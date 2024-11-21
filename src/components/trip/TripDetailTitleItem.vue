<template>
  <div>
    <v-row align="start">
      <v-col cols="6">
        <v-card variant="text">
          <v-card-subtitle>{{ trip.tripStartDate }} - {{ trip.tripEndDate }}</v-card-subtitle>
          <h1 class="font-weight-black ml-4">{{ trip.tripName }}</h1>
          <v-card-text>
            {{ trip.tripSummary }}
          </v-card-text>
          <v-btn class="md-3 ml-4" rounded="xl" color="blue">AI 요약하기+</v-btn>
          <v-btn class="md-3 ml-4" rounded="xl" color="blue" :to="{ name: 'tripModify', params: { tripNo: trip.tripNo } }">수정</v-btn>
          <v-btn class="md-3 ml-4" rounded="xl" color="red" @click="showDeleteDialog = true">삭제</v-btn>
        </v-card>
      </v-col>
      <v-col class="text-xs-center" align="center">
        <v-img :src="trip.tripThumbnailUrl" class="md-2 rounded-circle" width="250px" height="250px" cover>
          <template v-slot:error>
            <v-img :src="DEFAULT_IMAGE_PATH" class="md-2 rounded-circle" width="250px" height="250px" cover></v-img>
          </template>
        </v-img>
      </v-col>
    </v-row>

    <!-- 삭제 모달 -->
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">삭제 확인</v-card-title>
        <v-card-text>정말로 삭제하시겠습니까?</v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="deleteTrip($route.params.tripNo)">삭제</v-btn>
          <v-btn color="grey" text @click="showDeleteDialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { DEFAULT_IMAGE_PATH } from "@/api/image";
import { deleteTripInfo } from "@/api/trip";
import { summarizeTrip } from "@/api/openAI.js";

defineProps({
  trip: {
    tripNo: Number,
    tripName: String,
    tripSummary: String,
    tripThumbnailUrl: String,
    tripStartDate: String,
    tripEndDate: String,
    memberNo: Number,
  },
});

const router = useRouter();

// 삭제 모달 제어
const showDeleteDialog = ref(false);

const deleteTrip = (tripNo) => {
  deleteTripInfo(tripNo);
  alert(`삭제되었습니다.`);
  router.push({ name: "trips" });
};
</script>

<style scoped></style>
