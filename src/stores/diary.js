import { computed, ref } from "vue";

import { dateFormatter } from "@/util/date/dateFormat";
import { defineStore } from "pinia";

export const useDiaryStore = defineStore("diary", () => {
  const tripDate = ref(dateFormatter(new Date()));

  const diary = ref({
    diaryNo: 0,
    diaryTitle: "",
    diaryDate: "",
    diaryTime: "",
    diaryContent: "",
    locationNo: 0,
    tripNo: 0,
  });

  const diaryContent = ref("");

  return { tripDate, diaryContent };
});
