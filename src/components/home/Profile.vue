<script setup></script>

<template>
  <div class="profile">
    <img src="@/assets/image/user_profile.svg" />
    <p>김싸피 님, 어서오세요!</p>
  </div>
</template>
<style scoped>
.profile {
  position: relative;
  /* width: 339px; */
  width: 100%;
  height: 302px;
  border-radius: 12px;
  background-color: #fffdee;

  margin-right: 2rem;

  padding: 1rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

p {
  position: absolute;
  bottom: 12px;
  left: 20px;
  width: 100%;

  font-size: 20px;
  font-weight: bold;
}
</style>
