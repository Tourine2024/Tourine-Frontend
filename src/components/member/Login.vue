<template>
  <div class="wrapper">
    <div class="carousel-image-container">
      <CarouselImage />
    </div>
    <v-card class="register">
      <v-card-title class="card-title">
        <img src="@/assets/icon/tourine_logo.svg" height="50px" />
        <span class="mx-3">TOURINE 로그인</span>
      </v-card-title>

      <v-card-text>
        <v-container class="container">
          <button @click="kakaoLogin" class="kakao">
            <img src="@/assets/icon/button/kakao_login.png" />
          </button>

          <span style="font-size: 18px">or</span>

          <v-text-field
            v-model="id"
            color="primary"
            label="아이디"
            variant="underlined"
            :rules="[required]"
          ></v-text-field>

          <v-text-field
            v-model="password"
            color="primary"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요."
            variant="underlined"
            :rules="[required]"
          ></v-text-field>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn class="loginBtn" @click="loginProcess">로그인</v-btn>
      </v-card-actions>
      <v-card-actions class="registerInform"
        ><span class="inform">가입된 계정이 없으신가요?</span>
        <v-btn :to="{ name: 'register' }" class="registerBtn">회원가입</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { loginMember } from "@/api/member";
import CarouselImage from "@/components/common/CarouselImage.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { VITE_KAKAO_API_KEY } = import.meta.env;

const router = useRouter();

const id = ref("");
const password = ref("");

function required(v) {
  return !!v || "필수 입력사항 입니다!";
}
async function loginProcess() {
  if (id.value === "" || password.value === "") {
    alert("아이디와 비밀번호를 모두 입력하세요.");
    return;
  }

  const data = await loginMember(id.value, password.value);
  if (data) {
    localStorage.setItem("memberNo", data.memberNo);
    router.push({ name: "home" });
  } else {
    alert("로그인 아이디나 비밀번호를 다시 확인하세요.");
  }
}

function kakaoLogin() {
  const redirect_uri = "http://localhost:5173/login/kakao";
  const clientId = VITE_KAKAO_API_KEY;
  const Auth_url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirect_uri}`;
  window.location.href = Auth_url;
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
  min-width: 400px;
  /*화면 최소 크기 유지*/
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

.card-title>span {
  font-size: 30px;
  font-weight: bold;
}

.loginBtn {
  background-color: #4169e1;
  width: 100%;
  height: 50px;
  border-radius: 15px;
  text-align: center;

  font-size: 20px;
  color: white;
}

.inform {
  width: fit-content;
  font-size: 20px;
}

.registerBtn {
  color: green;
  height: 50px;
  border-radius: 15px;
  text-align: center;

  font-size: 20px;
}

.registerInform {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.kakao {
  margin-bottom: 1rem;
  border-radius: 15px;
  width: 100%;
}

.v-text-field:deep(input) {
  font-size: 18px;
}
</style>
