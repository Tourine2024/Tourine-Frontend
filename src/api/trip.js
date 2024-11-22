import { localAxios } from "@/util/axios";

//여행 전체 목록
export const getTripLists = async (pageNo) => {
  try {
    const { data } = await localAxios.get(`/trips?pageNo=${pageNo}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

//개별 여행 정보 조회
export const getTripInfo = async (tripNo) => {
  try {
    const { data } = await localAxios.get(`/trips/${tripNo}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const insertTripInfo = async (trip) => {
  try {
    await localAxios.post(`/trips`, trip);
  } catch (err) {
    console.error(err);
  }
}

export const updateTripInfo = async (trip) => {
  try {
    await localAxios.put(`/trips`, trip);
  } catch (err) {
    console.error(err);
  }
}

export const deleteTripInfo = async (tripNo) => {
  try {
    await localAxios.delete(`/trips/${tripNo}`);
  } catch (err) {
    console.error(err);
  }
}
