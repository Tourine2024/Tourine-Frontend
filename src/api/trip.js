import { localAxios } from "@/util/axios";

//여행 전체 목록
export const getTripLists = async (pageNO) => {
  try {
    const { data } = await localAxios.get(`/trips?pageNo=${pageNO}`);
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

//여행일기 전체 목록
export const getDiaryLists = async (tripNo) => {
  try {
    const { data } = await localAxios.get(`/trips/${tripNo}/diaries`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

//여행지 위치 조회
export const getAttractLocation = async (locationNo) => {
  try {
    const { data } = await localAxios.get(`/locations/${locationNo}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
