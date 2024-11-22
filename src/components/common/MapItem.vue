<template>
  <div>
    <GoogleMap :api-key="GOOGLE_MAPS_API_KEY" :map-id="GOOGLE_MAPS_MAP_ID" style="width: 100%; height: 500px" :center="center" :zoom="15" class="px-4 py-5">
      <AdvancedMarker v-for="(marker, key) in markers" :key="key" :options="{ position: marker }" />
    </GoogleMap>
  </div>
</template>

<script setup>
import { GoogleMap, AdvancedMarker } from "vue3-google-map";

defineProps({
  center: {
    type: Object,
    required: true,
  },
  markers: {
    type: Array,
    required: true,
  }
});

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
</script>

<style scoped></style>
