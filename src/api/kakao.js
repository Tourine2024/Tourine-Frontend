import { localAxios } from "@/util/axios";

export const kakaoLogin = async (code) => {
  try {
    const { data } = await localAxios.post(`/kakao/auth`, code);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
