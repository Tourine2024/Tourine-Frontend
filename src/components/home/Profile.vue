<template>
  <div class="profile">
    <img :src="memberInfo.memberProfilePicUrl || defaultProfilePic" />
    <p>{{ memberInfo.memberNickname }} 님, 어서오세요!</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getMemberInfo } from "@/api/member";
import defaultProfilePic from "@/assets/image/profile/profile_1.svg";

// const memberNo = 1; // 이후 세션에서 가져올 것
const memberNo = localStorage.getItem("memberNo");
const memberInfo = ref({
  memberNickname: "",
  memberProfilePicUrl: "",
});

onMounted(async () => {
  memberInfo.value = await getMemberInfo(memberNo);
});
</script>

<style scoped>
.profile {
  position: relative;
  width: 100%;
  height: 302px;
  border-radius: 12px;
  background-color: #fffdee;
  margin-right: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

img {
  height: 100%;
  object-fit: cover;
}

p {
  position: absolute;
  bottom: 0; /* 하단에 맞추기 위해 수정 */
  left: 50%; /* 중앙 정렬 */
  transform: translateX(-50%); /* X축 기준 중앙 정렬의 보정 */
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.9);
  height: 40px;
  border-radius: 12rem;
}
</style>
