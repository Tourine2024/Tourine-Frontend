import { localAxios } from "@/util/axios";

export const postNewDiary = async (diary) => {
  console.log(diary);
  try {
    const { data } = await localAxios.post(`/diaries`, diary);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

//다이어리 가져오기
export const getDiaryInfo = async (diaryNo) => {
  try {
    const { data } = await localAxios.get(`/diaries/${diaryNo}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const updateDiary = async (diary) => {
  console.log(diary);
  try {
    const { data } = await localAxios.put(`/diaries`, diary);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

//location no 얻어오기
