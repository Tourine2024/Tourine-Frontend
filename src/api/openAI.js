import { localAxios } from "@/util/axios";

export const summarizeTrip = async (tripNo) => {
  try {
    const { data } = await localAxios.get(`/summarize/${tripNo}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    alert("여행 요약하기를 실패했습니다. 다시 시도해주세요.");
    return "fail";
  }
};

export const drawPostCard = async (tripNo) => {
  try {
    const { data } = await localAxios.post(`/postcard/${tripNo}`);
    console.log(data);
    return data;
  } catch (err) {
    alert("우표 이미지를 생성하는 데 실패했습니다. 다시 시도해주세요.");
    console.error(err);
    return err;
  }
};
