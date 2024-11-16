<template>
  <div class="pt-5">
    <span class="d-flex align-items-center">
      <h2>{{ dayCnt }}일차 - {{ tripDate }}</h2>
      <v-btn class="align-self-center mx-3 mt-1" icon="mdi-plus" density="compact"> </v-btn>
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
          <v-card class="ma-2 d-flex flex-column" width="300px">
            <v-card-title class="font-weight-black text-truncate">{{ diary.diaryTitle }}</v-card-title>
            <v-card-text class="text-truncate">{{ diary.diaryContent }}</v-card-text>
            <v-btn class="bg-black rounded-0">더 보기</v-btn>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </div>
    <div v-else>여행 기록이 없습니다.</div>
  </div>
</template>

<script setup>
defineProps({
  dayCnt: Number,
  tripDate: String,
  diaries: Array,
});
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
</style>
