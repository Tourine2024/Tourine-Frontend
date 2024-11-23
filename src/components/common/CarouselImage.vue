<script>
export default {
  data() {
    return {
      items: [
        { src: "src/assets/image/landing/swiss.jpg" },
        { src: "src/assets/image/landing/seoul.jpg" },
        { src: "src/assets/image/landing/newyork.jpg" },
        { src: "src/assets/image/landing/europe.jpg" },
      ],
    };
  },
};
</script>

<template>
  <v-carousel
    cycle
    hide-delimiters
    show-arrows="hover"
    height="100vh"
    interval="5000"
    class="carousel-fullscreen"
  >
    <v-carousel-item v-for="(item, i) in items" :key="i">
      <img :src="item.src" class="carousel-image" alt="carousel image" />
    </v-carousel-item>
  </v-carousel>
</template>

<style scoped>
.carousel-fullscreen {
  overflow: hidden;
  height: 100vh;
  z-index: 10;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
