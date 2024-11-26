<template>
  <div class="mypage">
    <div class="profile">
      <img
        class="profileBackground"
        src="@/assets/image/mypage/profileBackground.svg"
        alt="Profile Background"
      />
      <img
        class="profileImage"
        :src="member.memberProfilePicUrl || defaultProfile"
        alt="Profile Image"
      />
    </div>
    <div class="personalInfo">
      <div class="title">
        <h1>Personal Info</h1>
        <!-- <button @click="withdrawMember" class="withdraw">회원 탈퇴</button> -->
      </div>
      <v-row>
        <v-col cols="6" class="side">
          <div class="imageUpload" @click="showModal = true">
            <img
              :src="member.memberProfilePicUrl || defaultProfile"
              alt="Profile Image"
            />
          </div>
          <v-dialog v-model="showModal" max-width="600px">
            <v-card>
              <v-card-title>프로필 사진 선택</v-card-title>
              <v-card-text class="profileSelection">
                <img
                  v-for="(img, index) in profileImages"
                  :src="img"
                  :alt="`profile ${index + 1}`"
                  @click="selectProfile(img)"
                  :key="index"
                  class="selectableProfile"
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="showModal = false"
                  >닫기</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div class="inputGroup">
            <label for="joinDate">가입 날짜</label>
            <input
              readonly
              type="text"
              id="joinDate"
              v-model="member.memberJoinDatetime"
            />
          </div>
        </v-col>
        <v-col cols="6" class="side">
          <div class="inputGroup">
            <label for="id">아이디</label>
            <input type="text" id="id" v-model="member.memberId" disabled />
          </div>
          <div class="inputGroup">
            <label for="nickname">닉네임</label>
            <input type="text" id="nickname" v-model="member.memberNickname" />
          </div>
          <div class="inputGroup">
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="member.memberPw" />
          </div>
          <div class="inputGroup">
            <label for="email">이메일</label>
            <input type="email" id="email" v-model="member.memberEmail" />
          </div>
        </v-col>
      </v-row>
      <div class="actions">
        <v-btn color="primary" @click="updateProfile" style="font-size: 18px">수정하기</v-btn>
        <v-btn color="grey" @click="cancelUpdate" style="font-size: 18px">취소</v-btn>
        <v-btn @click="withdrawMember" color="red" style="font-size: 18px">회원 탈퇴</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getMemberInfo, updateMember, deleteMember } from "@/api/member.js";
import { dateFormatter } from "@/util/date/dateFormat.js";

const member = ref({
  memberProfilePicUrl: "",
  memberId: "",
  memberNickname: "",
  memberPw: "",
  memberEmail: "",
  memberJoinDatetime: "",
});
const showModal = ref(false);
const defaultProfile = "src/assets/image/profile/profile_1.svg";
const profileImages = ref(
  Array.from(
    { length: 20 },
    (v, i) => `src/assets/image/profile/profile_${i + 1}.svg`
  )
);

onMounted(async () => {
  try {
    const data = await getMemberInfo();
    member.value = {
      ...data,
      memberJoinDatetime: dateFormatter(new Date(data.memberJoinDatetime)),
    };
  } catch (error) {
    console.error("Failed to load member info:", error);
  }
});

const selectProfile = (image) => {
  member.value.memberProfilePicUrl = image;
  showModal.value = false;
};

const updateProfile = async () => {
  try {
    await updateMember(member.value);
  } catch (error) {
    console.error("Update failed:", error);
  }
};

const cancelUpdate = () => {
  getUserProfile(); // 사용자 프로필로 롤백
};

const withdrawMember = async () => {
  if (confirm("정말 탈퇴하시겠습니까?")) {
    await deleteMember();
    // 로그아웃 로직
  }
};

const getUserProfile = async () => {
  try {
    const data = await getMemberInfo();
    member.value = data;
  } catch (error) {
    console.error("Failed to load member info:", error);
  }
};
</script>

<style scoped>
/* 기존 스타일 */
.profileSelection {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(100px, auto);
  overflow-y: auto;
  max-height: 300px;
}
.selectableProfile {
  cursor: pointer;
  width: 100%;
  padding: 5px;
}

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
  position: relative;
  width: 80%;
  height: auto;
  display: block;
  margin: 0 auto;
  z-index: 10;
}

.profileImage {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 75%;
  z-index: 5;
}

.imageUpload {
  width: 80%;
  margin: 0 auto; /* 좌우 자동 마진을 주어 가운데 정렬 */
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex; /* Flexbox를 사용하여 내부 이미지를 중앙 정렬 */
  justify-content: center; /* 내부 이미지를 수평 중앙에 위치시킵니다 */
  cursor: pointer;
}

.joinDate {
  font-size: 16px;
}

.personalInfo {
  width: 90%;
  z-index: 15;
  background-color: white;
  border-radius: 12px;
  padding: 20px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -15%;
  margin-bottom: 5rem;
}

.title {
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.inputGroup {
  margin-bottom: 3rem;
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

.side {
  padding: 0 5rem;
}
</style>
