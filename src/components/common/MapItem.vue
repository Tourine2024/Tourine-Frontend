<template>
  <div>
    <GoogleMap
      :api-key="GOOGLE_MAPS_API_KEY"
      :map-id="GOOGLE_MAPS_MAP_ID"
      style="width: 100%; height: 550px"
      :center="mapCenter"
      :zoom="zoom"
      ref="mapRef"
      class="px-4 py-5"
    >
      <AdvancedMarker
        v-for="(marker, key) in markers"
        :key="key"
        :options="{ position: marker }"
      />
      <template v-if="path">
        <Polyline :options="path" />
      </template>
    </GoogleMap>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { GoogleMap, AdvancedMarker, Polyline } from "vue3-google-map";

const props = defineProps({
  center: {
    type: Object,
    required: true,
  },
  markers: {
    type: Array,
    required: true,
  },
  zoom: {
    type: Number,
    default: 15,
  },
  path: {
    type: Object,
    default: null,
  },
});

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

const mapRef = ref(null);
const mapCenter = ref(props.center);
const bounds = ref(null);

function updateCenterAndBounds() {
  if (props.markers && props.markers.length > 0) {
    bounds.value = new google.maps.LatLngBounds();
    for (const marker of props.markers) {
      bounds.value.extend(marker);
    }
    mapCenter.value = bounds.value.getCenter();
    if (mapRef.value) {
      mapRef.value.map.fitBounds(bounds.value);
      const mapZoom = mapRef.value.map.getZoom();
      mapRef.value.map.setZoom(Math.min(mapZoom, 15));
    }
  }
}

// Watch for changes in props.markers
watch(
  () => props.markers,
  (newMarkers) => {
    if (newMarkers && newMarkers.length > 0) {
      updateCenterAndBounds();
    }
  },
  { immediate: true } // Run immediately if props.markers is already populated
);
</script>

<style scoped></style>
