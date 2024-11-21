import { localAxios } from "@/util/axios";

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

export const getDiaryInfo = async (diaryNo) => {
  try {
    const { data } = await localAxios.get(`/diaries/${diaryNo}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};