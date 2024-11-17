<template>
  <div>
    <GoogleMap :api-key="GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="15" class="px-4 py-5" />
    <Marker :options="{ position: center }" />
  </div>
</template>

<script setup>
import { GoogleMap, Marker } from "vue3-google-map";

defineProps({
  center: {
    type: Object,
    required: true,
  },
});

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
</script>

<style scoped></style>
