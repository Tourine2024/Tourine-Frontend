<script setup>
import Profile from "@/components/home/Profile.vue";
import RecentTrip from "@/components/home/RecentTrip.vue";
import TripCountries from "@/components/home/TripCountries.vue";
import TripDays from "@/components/home/TripDays.vue";
import TripCount from "@/components/home/TripCount.vue";
import DiaryList from "@/components/home/DiaryList.vue";
import CalenderList from "@/components/home/CalenderList.vue";
</script>

<template>
  <div class="home">
    <div class="wrapper">
      <v-row>
        <v-col cols="4">
          <Profile />
        </v-col>

        <v-col cols="8">
          <RecentTrip />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-row>
            <v-col cols="4"> <TripDays /> </v-col>
            <v-col cols="4"> <TripCountries /> </v-col>
            <v-col cols="4"> <TripCount /> </v-col>
          </v-row>
          <v-row>
            <DiaryList />
          </v-row>
        </v-col>
        <v-col cols="4">
          <CalenderList />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style>
.home {
  padding: 0 2rem;
  min-height: 100vh;

  align-items: center;
  background-color: #cfedfe;

  padding-bottom: 5rem;
}

.wrapper {
  width: 90%;
  margin: 0 auto;
}

.home > .v-sheet {
  border-radius: 12px;
}
</style>
