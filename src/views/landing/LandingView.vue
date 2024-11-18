<template>
  <v-app class="full-page-app">
    <div class="hero-carousel-container">
      <v-carousel cycle hide-delimiters height="100vh" interval="5000" class="carousel-fullscreen">
        <v-carousel-item v-for="(item, i) in items" :key="i">
          <img :src="item.src" class="carousel-image" alt="carousel image" />
        </v-carousel-item>
      </v-carousel>
      <div
        class="text-center d-flex flex-column align-center justify-center text-white hero-content"
      >
        <h1 class="display-2 font-weight-bold">일상에서 벗어나는 힐링 여행 서비스 <br />TOURINE</h1>
        <v-btn color="primary" @click="showRegister = true">Join</v-btn>
      </div>
    </div>

    <!-- Register Modal -->
    <Register v-model="showRegister" />
  </v-app>
</template>

<script>
import Register from "@/components/member/Register.vue";

export default {
  components: {
    Register,
  },
  data() {
    return {
      showRegister: false, // Register 모달 상태
      items: [
        { src: "src/assets/image/landing/seoul.jpg" },
        { src: "src/assets/image/landing/europe.jpg" },
        { src: "src/assets/image/landing/newyork.jpg" },
        { src: "src/assets/image/landing/swiss.jpg" },
      ],
    };
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

.carousel-fullscreen {
  height: 100vh; /* Make carousel take full height */
}

.carousel-image {
  width: 100%; /* Make the image width fit the container */
  height: 100%; /* Make the image height fit the container */
  object-fit: cover; /* Scale the image to cover the container */
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
  z-index: 30; /* Ensure content is above the overlay */
  pointer-events: none; /* Disable pointer events for the container */
}

.hero-content > * {
  pointer-events: all; /* Enable pointer events for children */
  position: relative;
  z-index: 40; /* Ensure text and button appear above the overlay */
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
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
  z-index: 15; /* Keep overlay below the content */
}

.carousel-fullscreen {
  z-index: 10;
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
