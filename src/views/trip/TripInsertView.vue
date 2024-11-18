<template>
  <v-container class="pt-5">
    <!-- 상단 제목 -->
    <v-row justify="center" class="mb-4">
      <h1 class="text-center font-weight-bold">새 여행</h1>
    </v-row>

    <!-- 입력 폼 -->
    <v-sheet class="pa-5" color="white">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <!-- 이름 -->
          <v-col cols="12">
            <v-text-field v-model="formData.tripName" label="여행 이름" required outlined clearable :rules="[rules.required]" />
          </v-col>

          <!-- 요약 -->
          <v-col cols="12">
            <v-textarea v-model="formData.diaryContent" label="여행 요약" outlined auto-grow rows="5" placeholder="여행에 대한 간략한 설명을 적어주세요..." clearable />
          </v-col>

          <!-- 출발/도착 일자 -->
          <v-col cols="6">
            <h3>출발 일자</h3>
            <v-locale-provider locale="ko">
              <DatePicker show-adjacent-months v-model="formData.startDate" :rules="[rules.required]" @click="changeStartDate" outlined :hide-header="true" />
            </v-locale-provider>
          </v-col>
          <v-col cols="6">
            <h3>도착 일자</h3>
            <v-locale-provider locale="ko">
              <DatePicker show-adjacent-months v-model="formData.endDate" :rules="[rules.required]" @click="changeEndDate" outlined :hide-header="true" />
            </v-locale-provider>
          </v-col>
        </v-row>

        <!-- 저장 버튼 -->
        <v-row justify="center" class="mt-5">
          <v-btn color="primary" class="mx-2" @click="submitForm">저장</v-btn>
          <v-btn color="grey" class="mx-2" @click="clearForm">초기화</v-btn>
          <v-btn color="grey" class="mx-2" @click="$router.go(-1)">취소</v-btn>
        </v-row>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import DatePicker from "@/components/common/DatePicker.vue";

const valid = ref(false);

// 오늘 날짜 계산
const today = new Date();

const formData = reactive({
  tripName: "",
  startDate: today, // Date 객체로 설정
  endDate: today, // Date 객체로 설정
  diaryContent: "",
});

const rules = {
  required: (value) => !!value || "필수 입력 항목입니다.",
};

const changeStartDate = () => {
  if (formData.startDate > formData.endDate) {
    formData.endDate = formData.startDate;
  }
};

const changeEndDate = () => {
  if (formData.startDate > formData.endDate) {
    formData.startDate = formData.endDate;
  }
};

const submitForm = () => {
  alert("새 여행이 저장되었습니다!");
  console.log({
    tripName: formData.tripName,
    startDate: formData.startDate.toISOString().split("T")[0], // 저장 시 문자열로 변환
    endDate: formData.endDate.toISOString().split("T")[0], // 저장 시 문자열로 변환
    diaryContent: formData.diaryContent,
  });
};

const clearForm = () => {
  formData.tripName = "";
  formData.startDate = today;
  formData.endDate = today;
  formData.diaryContent = "";
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: bold;
}

.v-container {
  background-color: white;
}

.v-sheet {
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
