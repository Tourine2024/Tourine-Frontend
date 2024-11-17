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
            <v-textarea v-model="formData.diaryContent" label="요약 (선택 사항)" outlined auto-grow rows="5" clearable />
          </v-col>

          <!-- 출발/도착 일자 -->
          <v-col cols="6">
            <v-text-field v-model="formData.tripStartDate" label="출발 일자 (YYYY.MM.DD)" outlined clearable :rules="[rules.dateFormat]" placeholder="예: 2024.12.01" />
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="formData.tripEndDate" label="도착 일자 (YYYY.MM.DD)" outlined clearable :rules="[rules.dateFormat]" placeholder="예: 2024.12.06" />
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

const form = ref(null);
const valid = ref(false);

const formData = reactive({
  diaryTitle: "",
  diaryDate: "",
  diaryTime: "",
  diaryContent: "",
  location: "",
});

const rules = {
  required: (value) => !!value || "필수 입력 항목입니다.",
  dateFormat: (value) => !value || /^\d{4}\.\d{2}\.\d{2}$/.test(value) || "날짜 형식이 올바르지 않습니다.",
};

const submitForm = () => {
  if (form.value.validate()) {
    alert("새 여행이 저장되었습니다!");
    console.log(formData);
    clearForm();
  }
};

const clearForm = () => {
  Object.keys(formData).forEach((key) => {
    formData[key] = "";
  });
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
