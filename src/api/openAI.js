import { localAxios } from "@/util/axios";

export const summarizeTrip = async () => {
  const city = "seoul";
  const day = "3";
  try {
    const { data } = await localAxios.get(`/plans?city=${city}/${day}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
