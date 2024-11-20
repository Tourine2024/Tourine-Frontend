<template>
  <v-app class="full-page-app">
    <div class="hero-carousel-container">
      <CarouselImage />
      <div
        class="text-center d-flex flex-column align-center justify-center text-white hero-content"
      >
        <h1 class="display-2 font-weight-bold">일상에서 벗어나는 힐링 여행 서비스 <br />TOURINE</h1>
        <v-btn color="primary" :to="{ name: 'login' }">Join</v-btn>
      </div>
    </div>
  </v-app>
</template>

<script>
import CarouselImage from "@/components/common/CarouselImage.vue";

export default {
  components: {
    CarouselImage,
  },
};
</script>

<style scoped>
.full-page-app {
  overflow: hidden;
}

.hero-carousel-container {
  position: relative;
  height: 100vh;
  width: 100%;
}

.hero-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
  pointer-events: none;
}

.hero-content > * {
  pointer-events: all;
  position: relative;
  z-index: 40;
  padding: 2rem;
  border-radius: 8px;
}

.hero-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 15;
}

.v-btn {
  display: flex;
  font-size: 1.25rem;
  padding: 0.75rem 1.5rem;
  color: white;
  text-transform: uppercase;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.v-btn:hover {
  background-color: #e64a19;
}
</style>
