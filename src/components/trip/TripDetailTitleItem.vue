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
          <v-btn class="md-3 ml-4" rounded="xl" color="blue">수정하기</v-btn>
        </v-card>
      </v-col>
      <v-col class="text-xs-center" align="center">
        <v-img id="diary-image" :src="trip.tripThumbnailUrl" @error="substituteImage" class="md-2 rounded-circle" width="250px" height="250px" cover />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
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

const substituteImage = () => {
  const diaryImage = document.querySelector('#diary-image img');
  diaryImage.onerror = null;
  diaryImage.src = '../src/assets/image/noimage.jpg';
  diaryImage.style.display = "inline";
};
</script>

<style scoped></style>
