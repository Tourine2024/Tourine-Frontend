<template>
  <div class="container pt-5">
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
            <v-text-field
              v-model="formData.tripName"
              label="여행 이름"
              required
              outlined
              clearable
              :rules="[rules.required]"
              style="font-size: 18px"
            />
          </v-col>

          <!-- 요약 -->
          <v-col cols="12">
            <v-textarea
              v-model="formData.tripSummary"
              label="여행 요약"
              outlined
              auto-grow
              rows="5"
              placeholder="여행에 대한 간략한 설명을 적어주세요..."
              clearable
              style="font-size: 18px"
            />
          </v-col>

          <v-col cols="12">
            <v-file-input
              v-model="thumbnailImage"
              label="대표 사진"
              accept="image/*"
              @change="onChangeImage"
              @click:clear="clearImage"
              outlined
              clearable
            />
            <template v-if="thumbnailImageUrl">
              <v-img :src="thumbnailImageUrl" height="250px" />
            </template>
          </v-col>

          <!-- 출발/도착 일자 -->
          <v-col cols="6">
            <h3>출발 일자</h3>
            <v-locale-provider locale="ko">
              <DatePicker
                v-model="formData.tripStartDate"
                :rules="[rules.required]"
                @click="changeTripStartDate"
                outlined
              />
            </v-locale-provider>
          </v-col>
          <v-col cols="6">
            <h3>도착 일자</h3>
            <v-locale-provider locale="ko">
              <DatePicker
                v-model="formData.tripEndDate"
                :rules="[rules.required]"
                @click="changeTripEndDate"
                outlined
              />
            </v-locale-provider>
          </v-col>
        </v-row>

        <!-- 저장 버튼 -->
        <v-row class="mb-5 mp-5" justify="center">
          <v-btn color="primary" class="mx-2" @click="submitForm" style="font-size: 18px">저장</v-btn>
          <v-btn color="grey" class="mx-2" @click="clearForm" style="font-size: 18px">초기화</v-btn>
          <v-btn color="grey" class="mx-2" @click="$router.go(-1)" style="font-size: 18px">취소</v-btn>
        </v-row>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import DatePicker from "@/components/common/DatePicker.vue";
import { dateFormatter } from "@/util/date/dateFormat";
import { uploadImage } from "@/api/image";
import { insertTripInfo } from "@/api/trip";

const router = useRouter();

const valid = ref(false);

// 오늘 날짜 계산
const today = new Date();

const memberNo = localStorage.getItem("memberNo");

const formData = reactive({
  tripName: "",
  tripSummary: null,
  tripThumbnailUrl: null, // 업로드된 이미지 파일 URL
  tripStartDate: today,
  tripEndDate: today,
  memberNo: memberNo, // 이후 로그인한 멤버 번호로 수정
});
const thumbnailImage = ref(null);
const thumbnailImageUrl = ref(null);

const rules = {
  required: (value) => !!value || "필수 입력 항목입니다.",
};

const createImage = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    thumbnailImageUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const onChangeImage = () => {
  console.log(thumbnailImage.value);
  if (thumbnailImage.value) createImage(thumbnailImage.value);
  else thumbnailImageUrl.value = null;
};

const clearImage = () => {
  thumbnailImage.value = null;
  thumbnailImageUrl.value = null;
};

const changeTripStartDate = () => {
  if (formData.tripStartDate > formData.tripEndDate) {
    formData.tripEndDate = formData.tripStartDate;
  }
};

const changeTripEndDate = () => {
  if (formData.tripStartDate > formData.tripEndDate) {
    formData.tripStartDate = formData.tripEndDate;
  }
};

async function submitForm() {
  try {
    if (thumbnailImage.value != null) {
      formData.tripThumbnailUrl = await uploadImage(thumbnailImage.value);
    }

    const payload = {
      ...formData,
      tripStartDate: dateFormatter(formData.tripStartDate),
      tripEndDate: dateFormatter(formData.tripEndDate),
    };

    insertTripInfo(payload);
    alert("저장되었습니다.");
    router.push({ name: `trips` });
  } catch (error) {
    console.error(error);
  }
}

const clearForm = () => {
  formData.tripName = "";
  formData.tripSummary = null;
  formData.tripThumbnailUrl = null;
  formData.tripStartDate = today;
  formData.tripEndDate = today;
  thumbnailImage.value = null;
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: bold;
}

.container {
  background-color: #cfedfe;
  height: 100%;
  padding-bottom: 110px;
}

.v-sheet {
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
