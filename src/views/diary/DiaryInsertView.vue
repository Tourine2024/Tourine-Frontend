<template>
  <div class="container pt-5">
    <div class="wrapper">
      <!-- 상단 제목 -->
      <v-row justify="center" class="mb-4">
        <h1 class="text-center font-weight-bold">새 여행 기록</h1>
      </v-row>

      <!-- 입력 폼 -->
      <v-sheet class="pa-5" color="white">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <!-- 제목 -->
            <v-col cols="12">
              <v-text-field
                v-model="formData.diaryTitle"
                label="제목"
                required
                outlined
                clearable
                :rules="[rules.required]"
              />
            </v-col>

            <!-- 날짜와 시간 -->
            <v-col cols="6">
              <h3>여행 날짜</h3>
              <v-text-field class="text-grey" v-model="formData.diaryDate" outlined readonly />
            </v-col>
            <v-col cols="6">
              <h3>시간 선택</h3>
              <v-text-field v-model="formData.diaryTime" type="time" outlined />
            </v-col>

            <!-- 지도 (위치 정보 입력) -->
            <v-col cols="6">
              <v-text-field
                class="pt-5"
                v-model="formData.location"
                label="장소 검색"
                outlined
                clearable
              />
            </v-col>
            <v-col cols="6" class="mt-0">
              <MapItem :center="center"></MapItem>
            </v-col>

            <!-- 내용 -->
            <v-col cols="12">
              <ToastUIEditor
                ref="editorRef"
                v-model="formData.diaryContent"
                @updateContent="(content) => (formData.diaryContent = content)"
                label="내용"
                outlined
                auto-grow
                rows="5"
                clearable
              />
            </v-col>
          </v-row>

          <!-- 저장 버튼 -->
          <v-row justify="center" class="mt-5 mb-0">
            <v-btn color="primary" class="mx-2" @click="submitForm">기록하기</v-btn>
            <v-btn color="grey" class="mx-2" @click="clearForm">초기화</v-btn>
            <v-btn color="grey" class="mx-2" @click="$router.go(-1)">취소</v-btn>
          </v-row>
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import MapItem from "@/components/common/MapItem.vue";
import ToastUIEditor from "@/components/common/ToastUIEditor.vue";
import { useDiaryStore } from "@/stores/diary";
import { postNewDiary } from "@/api/diary";
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const diaryStore = useDiaryStore();
const router = useRouter();

const props = defineProps({
  tripNo: Number,
});

const form = ref(null);
const valid = ref(false);

const today = new Date();

const formData = reactive({
  diaryTitle: "",
  diaryDate: diaryStore.tripDate,
  diaryTime: today.getHours() + ":" + today.getMinutes(),
  diaryContent: "",
  locationNo: "1",
  tripNo: props.tripNo,
});

const rules = {
  required: (value) => !!value || "필수 입력 항목입니다.",
  dateFormat: (value) =>
    !value || /^\d{4}\.\d{2}\.\d{2}$/.test(value) || "날짜 형식이 올바르지 않습니다.",
  timeFormat: (value) => !value || /^\d{2}:\d{2}$/.test(value) || "시간 형식이 올바르지 않습니다.",
};

const submitForm = async () => {
  if (form.value.validate()) {
    // if (editorInstance.value) {
    //   formData.diaryContent = editorInstance.value.getHTML(); // 에디터의 HTML 내용을 가져옴
    // } else {
    //   console.error("ToastUIEditor 인스턴스를 가져오지 못했습니다.");
    //   return;
    // }

    try {
      console.log(formData);
      await postNewDiary(formData);
      alert("새 여행 기록이 저장되었습니다!");
      clearForm();
      router.push({ name: "tripDetail" });
    } catch (error) {
      console.error("여행 기록 저장 중 오류 발생:", error);
    }
  }
};

const clearForm = () => {
  Object.keys(formData).forEach((key) => {
    formData[key] = "";
  });
};

const center = { lat: 37.5665, lng: 126.978 };
</script>

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: bold;
}

.container {
  background-color: #cfedfe;
  height: 100%;
}

.wrapper {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 5rem;
}

.v-sheet {
  border-radius: 10px;
  width: 85%;
  margin: 0 auto;
}
</style>
