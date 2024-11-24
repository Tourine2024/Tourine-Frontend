import { localAxios } from "@/util/axios";

export const getTripDays = async (memberNo) => {
  try {
    const { data } = await localAxios.get(`/home/days?memberNo=${memberNo}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getTripCountries = async (memberNo) => {
  try {
    const { data } = await localAxios.get(
      `/home/countries?memberNo=${memberNo}`
    );
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getTripCounts = async (memberNo) => {
  try {
    const { data } = await localAxios.get(
      `/home/tripcounts?memberNo=${memberNo}`
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
