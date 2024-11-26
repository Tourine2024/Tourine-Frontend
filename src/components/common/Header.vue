<template>
  <div class="header">
    <div class="wrapper">
      <HomeLogo />
      <nav>
        <RouterLink :to="{ name: 'trips' }">
          <img src="@/assets/icon/menu_travel.svg" />나의 여행
        </RouterLink>
        <RouterLink :to="{ name: 'collection' }">
          <img src="@/assets/icon/menu_travel.svg" />컬렉션
        </RouterLink>
        <div
          @mouseover="showOverlay($event)"
          @mouseleave="hideOverlay($event)"
          class="profile-menu"
        >
          <img :src="userStore.memberProfile.memberProfilePicUrl" />
          <span>{{ userStore.memberProfile.memberNickname }} 님</span>
          <div v-if="showMenu" class="overlay">
            <RouterLink :to="{ name: 'mypage' }">마이 페이지</RouterLink>
            <RouterLink :to="{ name: 'landing' }" @click="logoutProcess">로그아웃</RouterLink>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import HomeLogo from "@/components/common/HomeLogo.vue";
import { useRouter } from "vue-router";
import { getMemberInfo } from "@/api/member";
import { useUserStore } from "@/stores/menu";

const userStore = useUserStore();
const router = useRouter();
const showMenu = ref(false);

const memberProfile = ref({
  memberProfilePicUrl: "",
  memberId: "",
  memberNickname: "",
});

onMounted(async () => {
  try {
    const data = await getMemberInfo();
    userStore.updateMemberInfo(data);
    // memberProfile.value = {
    //   ...data,
    // };
  } catch (error) {
    console.error("Failed to load member info:", error);
  }
});

// memberProfile의 memberNickname과 memberProfilePicUrl을 감시
watch(
  () => [memberProfile.value.memberNickname, memberProfile.value.memberProfilePicUrl],
  (newValues, oldValues) => {
    console.log("Nickname or Profile Picture changed from", oldValues, "to", newValues);
    // 필요한 경우 여기에 추가 로직을 구현할 수 있습니다.
  },
  {
    deep: true, // 객체 내부의 변화까지 감지하도록 설정
  }
);

const showOverlay = (event) => {
  event.stopPropagation();
  showMenu.value = true;
};

const hideOverlay = (event) => {
  event.stopPropagation();
  showMenu.value = false;
};

const logoutProcess = () => {
  localStorage.removeItem("memberNo");
  router.push({ name: "landing" });
};
</script>

<style scoped>
.header {
  background-color: #cfedfe;
  display: flex;
  justify-content: center;
  height: fit-content;
}

.wrapper {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  width: 90%;
  height: 65px;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: end;
  background-color: white;
  border-radius: 12px;
  font-size: 24px;
  font-weight: bold;
  margin-right: 1.5rem;
}

nav a {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
  min-width: fit-content;
}

nav a img {
  margin-right: 1rem;
}

nav a:hover {
  color: #00507a;
  font-weight: bolder;
  cursor: pointer;
}

nav a.router-link-exact-active {
  color: #27292c;
  font-weight: bolder;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

.profile-menu {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
}

.profile-menu img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover; /* 이미지 채우기 */
  object-position: center; /* 중앙 정렬 */
  margin-right: 10px;
  background-color: #e6e8ec;
}

.profile-menu .overlay {
  display: none;
  position: absolute;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  right: 0;
  top: 100%;
  padding: 5px;
  width: auto;
  border-radius: 8px;
}

.profile-menu:hover .overlay {
  display: flex;
  flex-direction: column;
}

.overlay a {
  font-size: 20px;
  padding: 8px 0 8px 8px;
  text-align: center;
  justify-content: center;
  white-space: nowrap;
  font-weight: normal; /* 기본 상태에서는 일반 폰트 무게로 설정 */
  color: #27292c; /* 기본 색상 설정 */
}

.overlay a:hover {
  color: #00507a; /* 호버 시 색상 변경 */
  font-weight: bolder; /* 호버 시 볼드 효과 */
  cursor: pointer; /* 마우스 커서를 포인터로 설정 */
}

.profile-menu:hover span {
  font-weight: bold; /* 볼드 효과 추가 */
  color: #00507a;
}
</style>
