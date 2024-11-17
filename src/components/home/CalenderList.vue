<script setup>
import DatePicker from "../common/DatePicker.vue";
</script>

<template>
  <div class="date">
    <DatePicker class="datePicker" />
    <v-card id="bus" class="card mx-auto" height="96px" link
      ><img src="@/assets/icon/bus.svg" />
      <p>오늘은 챌린지를 찍었다.</p></v-card
    >
    <v-card id="hotel" class="card mx-auto" height="96px" link
      ><img src="@/assets/icon/hotel.svg" />
      <p>박원우가 해변에서 춤췄다. ㅋㅋㅋ</p></v-card
    >
    <v-card id="flight" class="card mx-auto" height="96px" link
      ><img src="@/assets/icon/flight.svg" />
      <p>비행기를 탈 수 있을까?</p></v-card
    >
  </div>
</template>
<style scoped>
.date {
  position: relative;
  /* width: 339px; */
  width: 100%;
  height: 755px;
  border-radius: 12px;
  background-color: white;

  margin-right: 2rem;

  padding: 1rem;
}

.datePicker {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

img {
  margin-right: 1rem;
}

.card {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  border-radius: 24px;
}
#bus {
  background-color: rgba(0, 133, 86, 0.1);
}

#hotel {
  background-color: rgba(255, 116, 44, 0.1);
}

#flight {
  background-color: rgba(52, 106, 255, 0.1);
}

p {
  font-size: 16px;
  font-weight: bold;
}
</style>
