<template>
  <div class="collection">
    <div class="stamps">
      <img
        v-for="stamp in stamps"
        :src="stamp.collectionImgUrl"
        :alt="`Stamp ${stamp.collectionId}`"
        class="profileBackground"
        :key="stamp.collectionId"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getStampCollection } from "@/api/collection";

const stamps = ref([]);

onMounted(async () => {
  try {
    const data = await getStampCollection();
    stamps.value = data;
  } catch (error) {
    console.error("Failed to load member info:", error);
  }
});
</script>

<style>
.collection {
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #cfedfe;
}

.stamps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 10px;
  width: 90%;
  margin: 1rem auto;
}

.profileBackground {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
