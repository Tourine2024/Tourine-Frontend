import { localAxios } from "@/util/axios";

export const postNewStamp = async (imgUrl) => {
  const memberNo = localStorage.getItem("memberNo");

  try {
    const { data } = await localAxios.post(`/collection`, {
      stampImg: imgUrl,
      memberNo: memberNo,
    });
    return data;
  } catch (err) {
    console.error("스탬프 등록 실패:", err);
    return err;
  }
};

export const getStampCollection = async () => {
  const memberNo = localStorage.getItem("memberNo");

  try {
    const { data } = await localAxios.get(`/collection?memberNo=${memberNo}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error("스탬프 컬렉션 조회 실패:", err);
    return err;
  }
};
