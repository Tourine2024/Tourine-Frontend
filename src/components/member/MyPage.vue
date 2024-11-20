<template>
  <div class="mypage">
    <div class="profile">
      <img
        class="profileBackground"
        src="@/assets/image/mypage/profileBackground.svg"
        alt="Profile Background"
      />
      <img class="profileImage" src="@/assets/image/profile/profile_1.svg" alt="Profile Image" />
    </div>
    <div class="personalInfo">
      <div class="title">
        <h1>Personal Info</h1>
        <button class="withdraw">회원 탈퇴</button>
      </div>
      <v-row>
        <v-col cols="6">
          <img class="imageUpload" src="@/assets/image/profile/profile_1.svg" alt="Profile Image" />
          <div class="inputGroup">
            <label for="joinDate">가입 날짜</label>
            <input type="date" id="joinDate" v-model="user.joinDate" />
          </div>
        </v-col>
        <v-col cols="6">
          <div class="inputGroup">
            <label for="id">ID</label>
            <input type="text" id="id" v-model="user.id" disabled />
          </div>
          <div class="inputGroup">
            <label for="nickname">Nickname</label>
            <input type="text" id="nickname" v-model="user.nickname" />
          </div>
          <div class="inputGroup">
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="user.password" />
          </div>
          <div class="inputGroup">
            <label for="email">이메일</label>
            <input type="email" id="email" v-model="user.email" />
          </div>
        </v-col>
      </v-row>
      <div class="actions">
        <v-btn color="primary" @click="updateProfile">수정하기</v-btn>
        <v-btn color="grey" @click="cancelUpdate">취소</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const user = ref({
  id: "ssafy",
  nickname: "sseung",
  password: "",
  email: "ssafy@ssafy.com",
  joinDate: "2024-11-01",
});

const updateProfile = () => {
  // 프로필 수정 로직
};

const cancelUpdate = () => {
  // 취소 로직
};
</script>

<style>
.mypage {
  height: fit-content;
  min-height: 100vh;

  align-items: center;
  background-color: #cfedfe;

  display: flex;
  flex-direction: column;
}

.profile {
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 2rem;
}

.profileBackground {
  width: 90%;
  height: auto;
  display: block;
  margin: 0 auto;
  z-index: 5;
}

.profileImage {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 80%;
  z-index: 10;
}

.imageUpload {
  width: 80%;
  margin-bottom: 1.3rem;
}

.joinDate {
  font-size: 16px;
}

.personalInfo {
  width: fit-content;
  z-index: 15;
  background-color: white;
  border-radius: 12px;
  padding: 20px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -15vh;
  margin-bottom: 5rem;
}

.title {
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.withdraw {
  background-color: #979797;
  border-radius: 20px;
  width: 130px;
  height: 50px;
  font-size: 20px;
  color: white;
  font-weight: bold;
  margin-left: 300px;
}

.inputGroup {
  margin-bottom: 15px;
}

.inputGroup label {
  display: block;
  margin-bottom: 5px;
}

.inputGroup input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.actions .v-btn {
  margin: 0 10px;
}
</style>
