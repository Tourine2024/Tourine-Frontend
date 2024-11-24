<template></template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { kakaoLogin } from "@/api/kakao";

const route = useRoute();
const router = useRouter();
const code = ref("");

onMounted(async () => {
  code.value = route.query.code;

  const memberNo = await kakaoLogin(code.value);

  localStorage.setItem("memberNo", memberNo);
  router.push({ name: "home" });
});
</script>

<style scoped></style>
