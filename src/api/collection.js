import { localAxios } from "@/util/axios";

export const postNewStamp = async (imgUrl) => {
  const memberNo = localStorage.getItem("memberNo");
  console.log(imgUrl);

  try {
    const { data } = await localAxios.post(`/collection`, {
      collectionImgUrl: imgUrl,
      memberNo: memberNo,
    });
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getStampCollection = async () => {
  const memberNo = localStorage.getItem("memberNo");

  try {
    const { data } = await localAxios.get(`/collection?memberNo=${memberNo}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
