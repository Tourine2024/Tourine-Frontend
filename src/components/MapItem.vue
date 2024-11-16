<template>
  <div>
    <GoogleMap :api-key="GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="15" class="px-4 py-5" />
    <Marker :options="{ position: center }" />
  </div>
</template>

<script setup>
import { GoogleMap, Marker } from "vue3-google-map";

const center = { lat: 15.882632, lng: 108.325234 };
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
</script>

<style scoped></style>
