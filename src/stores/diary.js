import { computed, ref } from "vue";

import { dateFormatter } from "@/util/date/dateFormat";
import { defineStore } from "pinia";

export const useDiaryStore = defineStore("diary", () => {
  const tripDate = ref(dateFormatter(new Date()));

  return { tripDate };
});
