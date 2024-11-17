<script>
export default {
  data: () => ({
    headers: [
      { title: "#", align: "start", sortable: false, key: "id" },
      { title: "제목", align: "center", key: "title" },
      { title: "여행", align: "center", key: "trip" },
      { title: "여행 날짜", align: "center", key: "date" },
    ],
    diarys: [
      {
        id: 1,
        title: "강원도 여행",
        trip: "산책과 휴식",
        date: "2022-06-01",
      },
      {
        id: 2,
        title: "제주도 바다 구경",
        trip: "바다와 함께하는 휴가",
        date: "2022-07-15",
      },
      {
        id: 3,
        title: "서울 역사 투어",
        trip: "도시 속 역사 여행",
        date: "2022-08-23",
      },
      {
        id: 4,
        title: "부산 맛집 탐방",
        trip: "음식과 문화",
        date: "2022-09-10",
      },
      {
        id: 5,
        title: "경주 역사 여행",
        trip: "신라의 향기",
        date: "2022-10-05",
      },
      {
        id: 6,
        title: "남해 금산 여행",
        trip: "힐링과 낭만",
        date: "2022-11-11",
      },
      {
        id: 7,
        title: "대구 도심 탐험",
        trip: "도심 속 숨은 보석",
        date: "2022-12-21",
      },
      {
        id: 8,
        title: "전주 한옥 마을",
        trip: "전통과 현대의 조화",
        date: "2023-01-18",
      },
      {
        id: 9,
        title: "울산 대곡박물관",
        trip: "문화 유산 탐방",
        date: "2023-02-22",
      },
      {
        id: 10,
        title: "속초 바다 여행",
        trip: "바다에서의 하루",
        date: "2023-03-15",
      },
    ],
  }),
};
</script>

<template>
  <div class="list">
    <h3>나의 여행 기록</h3>
    <v-data-table
      :headers="headers"
      :items="diarys"
      density="comfortable"
      item-key="name"
      height="400px"
      hide-default-footer
    ></v-data-table>
    <v-btn append-icon="mdi-account-circle" prepend-icon="mdi-check-circle">
      ADD NEW DIARY
    </v-btn>
  </div>
</template>

<style scoped>
.list {
  position: relative;
  /* width: 339px; */
  width: 100%;
  height: 560px;
  border-radius: 12px;
  background-color: white;

  margin: 0.8rem;

  padding: 1.5rem;
}

h3 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 1rem;
}
.v-btn {
  width: 100%;
  margin-top: 1rem;
}
</style>
