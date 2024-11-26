// 메뉴 상태 관리

import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    memberProfile: {
      memberProfilePicUrl: "",
      memberNickname: "",
    },
  }),
  actions: {
    updateMemberInfo(newInfo) {
      this.memberProfile = { ...newInfo };
    },
  },
});
