<template>
  <div class="container pt-5">
    <div class="wrapper">
      <!-- 상단 제목 -->
      <v-row justify="center" class="mb-4">
        <h1 class="text-center font-weight-bold">여행 기록 편집</h1>
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
              <h3>여행 일자</h3>
              <v-text-field
                class="text-grey"
                v-model="formData.diaryDate"
                outlined
                readonly
              />
            </v-col>
            <v-col cols="6">
              <h3>시간 선택</h3>
              <v-text-field v-model="formData.diaryTime" type="time" outlined />
            </v-col>

            <!-- 지도 (위치 정보 입력) -->
            <v-col cols="6">
              <v-combobox
                class="pt-5"
                label="장소 검색"
                v-model="locationQuery"
                :items="mapSearchResults"
                item-title="displayName"
                :menu-props="{ closeOnBack: false }"
                :menu.sync="menuOpen"
                @update:menu="menuOpen = true"
                @blur="menuOpen = false"
              >
                <template v-slot:item="{ item }">
                  <v-list-item
                    @mouseover="updateMapCenter(item.raw.latLng)"
                    @click="selectLocation(item.raw)"
                  >
                    <v-list-item-title>{{
                      item.raw.displayName
                    }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.raw.formattedAddress
                    }}</v-list-item-subtitle>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="6" class="mt-0">
              <MapItem :center="mapCenter" :markers="markerPosition"></MapItem>
            </v-col>

            <!-- 내용 -->
            <v-col cols="12">
              <ToastUIEditor
                ref="editorRef"
                v-model="formData.diaryContent"
                :content="formData.diaryContent"
                @updateContent="
                  (mdContent) => {
                    formData.diaryContent = mdContent;
                  }
                "
                label="diaryContent"
                outlined
                auto-grow
                rows="5"
                clearable
              />
            </v-col>
          </v-row>

          <!-- 수정 버튼 -->
          <v-row justify="center" class="mt-5 mb-0">
            <v-btn color="primary" class="mx-2" @click="submitForm"
              >수정하기</v-btn
            >
            <v-btn color="grey" class="mx-2" @click="clearForm">초기화</v-btn>
            <v-btn color="grey" class="mx-2" @click="$router.go(-1)"
              >취소</v-btn
            >
          </v-row>
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, toRaw, watch } from "vue";
import MapItem from "@/components/common/MapItem.vue";
import ToastUIEditor from "@/components/common/ToastUIEditor.vue";
import { useDiaryStore } from "@/stores/diary";
import { postNewDiary, updateDiary, getDiaryInfo } from "@/api/diary";
import { useRouter, useRoute } from "vue-router";
import { searchLocations } from "@/api/google";
import { getLocationInfo, insertLocationInfo } from "@/api/location";

const diaryStore = useDiaryStore();
const router = useRouter();
const route = useRoute();

const tripNo = route.params.tripNo;
const diaryNo = route.params.diaryNo;

const mapCenter = ref({ lat: 37.501465, lng: 127.039549 }); // 멀티캠퍼스
const locationQuery = ref("");
const mapSearchResults = ref([]);
const markerPosition = ref([]);
const selectedLocation = ref(null);

const form = ref(null);
const valid = ref(false);

const formData = ref({
  diaryNo: diaryNo,
  diaryTitle: "",
  diaryDate: "",
  diaryTime: "",
  diaryContent: diaryStore.diaryContent,
  locationNo: "1",
  tripNo: tripNo,
});

const menuOpen = ref(true);
watch(locationQuery, async () => {
  const tmpResults = [];
  if (locationQuery.value) {
    const locationList = await searchLocations(locationQuery.value);

    const _ = await locationList.forEach((location) => {
      tmpResults.push({
        id: location.Eg.id,
        displayName: location.Eg.displayName,
        formattedAddress: location.Eg.formattedAddress,
        addressComponents: location.Eg.addressComponents,
        latLng: location.Eg.location,
      });
    });
  }
  mapSearchResults.value = tmpResults;
});

const updateMapCenter = (latLng) => {
  mapCenter.value = { lat: latLng.lat, lng: latLng.lng };
  markerPosition.value = [latLng];
};

const selectLocation = (location) => {
  const countryComp = location.addressComponents.find((comp) =>
    comp.types.includes("country")
  );
  const country = countryComp ? countryComp.shortText : null;

  selectedLocation.value = {
    locationName: location.displayName,
    locationCountry: country,
    locationLatitude: location.latLng.lat.toFixed(6),
    locationLongitude: location.latLng.lng.toFixed(6),
    locationGoogleUrl: location.id,
  };
  locationQuery.value = location.displayName;
  document.activeElement.blur();
};

const rules = {
  required: (value) => !!value || "필수 입력 항목입니다.",
};

const getDiary = async () => {
  try {
    const data = await getDiaryInfo(diaryNo);

    // 개별 필드를 수동으로 업데이트
    formData.value.diaryTitle = data.diaryTitle;
    formData.value.diaryDate = data.diaryDate;
    formData.value.diaryTime = data.diaryTime;

    formData.value.diaryContent = data.diaryContent;
    diaryStore.diaryContent = data.diaryContent;

    formData.value.locationNo = data.locationNo;
    const locationInfo = await getLocationInfo(data.locationNo);
    locationQuery.value = locationInfo.locationName;
    menuOpen.value = false;
    mapCenter.value = {
      lat: locationInfo.locationLatitude,
      lng: locationInfo.locationLongitude,
    };

    formData.value.tripNo = data.tripNo;

    console.log(diaryStore.diaryContent);
    console.log(formData.value.diaryContent);
    // diaryStore.diaryContent = data.diaryContent;
  } catch (error) {
    console.error("일기 데이터를 가져오는 중 오류 발생:", error);
  }
};

const submitForm = async () => {
  if (form.value.validate()) {
    try {
      console.log(formData.value.diaryContent);
      const locationNo = await insertLocationInfo(selectedLocation.value);
      formData.value.locationNo = locationNo;
      const rawFormData = toRaw(formData.value);
      console.log(rawFormData);
      await updateDiary(rawFormData);
      alert("여행 기록이 수정되었습니다!");
      router.push({
        name: "diaryDetail",
        params: { tripNo: tripNo, diaryNo: diaryNo },
      });
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

onMounted(() => {
  getDiary();
});
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
