import { localAxios } from "@/util/axios";

export const getLocationInfo = async (locationNo) => {
  try {
    const { data } = await localAxios.get(`/locations/${locationNo}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};