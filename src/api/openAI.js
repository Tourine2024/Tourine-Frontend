import { localAxios } from "@/util/axios";

export const summarizeTrip = async (tripNo) => {
  try {
    const { data } = await localAxios.get(`/summarize/${tripNo}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const drawPostCard = async (tripNo) => {
  try {
    const { data } = await localAxios.post(`/postcard/${tripNo}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
