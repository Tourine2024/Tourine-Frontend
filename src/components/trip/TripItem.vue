<template>
  <div class="card md-5 px-5">
    <v-card class="px-5 py-5">
      <v-row align="start">
        <v-col cols="3">
          <template v-if="trip.tripThumbnailUrl">
            <v-img :src="trip.tripThumbnailUrl" class="md-2" height="150px" cover>
              <template v-slot:error>
                <v-img :src="DEFAULT_IMAGE_PATH" class="md-2" height="150px" cover></v-img>
              </template>
            </v-img>
          </template>
          <template v-else>
            <v-img :src="DEFAULT_IMAGE_PATH" class="md-2" height="150px" cover></v-img>
          </template>
        </v-col>
        <v-col>
          <v-card-title>{{ trip.tripName }}</v-card-title>
          <v-card-subtitle>{{ trip.tripStartDate }} - {{ trip.tripEndDate }}</v-card-subtitle>
          <v-card-text>{{ trip.tripSummary }}</v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { DEFAULT_IMAGE_PATH } from "@/api/image";

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
</script>

<style scoped></style>
