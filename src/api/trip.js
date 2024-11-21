import { localAxios } from "@/util/axios";

export const getTripLists = async (cnt) => {
  try {
    const { data } = await localAxios.get(`/trips?pageNo=${cnt}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
