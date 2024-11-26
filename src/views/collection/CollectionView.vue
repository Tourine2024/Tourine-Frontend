<template>
  <div class="collection">
    <div class="stamps">
      <img
        v-for="stamp in stamps"
        :src="stamp.stampImg"
        :alt="`Stamp ${stamp.stampId}`"
        class="postStamp"
        :key="stamp.stampId"
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
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  background-color: #cfedfe;
}

.stamps {
  background-image: url("@/assets/image/stamp/stamp_board.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 90%;
  width: 90%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
}

.postStamp {
  width: 70%;
  height: auto;
  object-fit: contain;
  display: block;
  margin: auto;
}
</style>
