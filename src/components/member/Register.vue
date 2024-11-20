<template>
  <div class="wrapper">
    <div class="carousel-image-container">
      <CarouselImage />
    </div>
    <v-card class="register">
      <v-card-title class="card-title">
        <img src="@/assets/icon/tourine_logo.svg" height="50px" />
        <span class="mx-3">TOURINE 회원가입</span>
      </v-card-title>

      <v-card-text>
        <v-container class="container">
          <button @click="kakaoLogin" class="kakao">
            <img src="@/assets/icon/button/kakao_login.png" />
          </button>

          <span>or</span>

          <v-text-field
            v-model="member.memberId"
            color="primary"
            label="아이디"
            variant="underlined"
            :rules="[required]"
          ></v-text-field>

          <v-text-field
            v-model="member.memberNickname"
            color="primary"
            label="이름"
            variant="underlined"
            :rules="[required]"
          ></v-text-field>

          <v-text-field
            v-model="member.memberEmail"
            color="primary"
            label="이메일"
            variant="underlined"
            :rules="[required]"
          ></v-text-field>

          <v-text-field
            v-model="member.memberPw"
            color="primary"
            label="비밀번호"
            placeholder="비밀번호를 입력하세요."
            variant="underlined"
            :rules="[required]"
          ></v-text-field>

          <v-text-field
            v-model="member.passwordCheck"
            color="primary"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 한번 입력하세요."
            variant="underlined"
            :rules="[required]"
          ></v-text-field>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn @click="registerProcess" class="registerBtn">회원가입</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { registerMember } from "@/api/member";
import CarouselImage from "@/components/common/CarouselImage.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const member = ref({
  memberId: "",
  memberNickname: "",
  memberPw: "",
  memberEmail: "",
  passwordCheck: "",
});

const postMember = ref({
  memberId: "",
  memberNickname: "",
  memberPw: "",
  memberEmail: "",
});

function required(v) {
  return !!v || "필수 입력사항 입니다!";
}
async function registerProcess() {
  postMember.value = {
    memberId: member.value.memberId,
    memberNickname: member.value.memberNickname,
    memberPw: member.value.memberPw,
    memberEmail: member.value.memberEmail,
  };

  await registerMember(postMember.value);
  router.push({ name: "login" });
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  flex-direction: row;
}

.carousel-image-container {
  flex: 7;
}

.register {
  min-width: 400px; /*화면 최소 크기 유지*/
  flex: 3;
  justify-self: center;
  box-shadow: none;
}

.container {
  text-align: center;
}

.card-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.card-title > span {
  font-size: 30px;
  font-weight: bold;
}

.registerBtn {
  background-color: #4169e1;
  width: 100%;
  height: 50px;
  border-radius: 15px;
  text-align: center;

  font-size: 20px;
  color: white;
}

.kakao {
  margin-bottom: 1rem;
  border-radius: 15px;
  width: 100%;
}
</style>
