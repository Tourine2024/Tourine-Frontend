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

export const getLocationNo = async (lat, lng) => {
  try {
    const { data } = await localAxios.get(
      `/locations/latlng?lat=${lat}&lng=${lng}`
    );
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const insertLocationInfo = async (locationInfo) => {
  const lat = locationInfo.locationLatitude;
  const lng = locationInfo.locationLongitude;
  try {
    let locationNo = await getLocationNo(lat, lng);
    if (!locationNo) {
      const { data } = await localAxios.post(`/locations`, locationInfo);
      locationNo = await getLocationNo(lat, lng);
    }
    return locationNo;
  } catch (err) {
    console.error(err);
    return err;
  }
};
