// axios 설정
// baseurl .env에 저장해두고 사용하기

import axios from "axios";

const { VITE_VUE_API_URL } = import.meta.env;

// local vue api axios instance
const localAxios = axios.create({
  baseURL: VITE_VUE_API_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": VITE_VUE_API_URL,
  },
});

export { localAxios };
