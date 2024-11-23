//사용자와 관련된 api 요청

import { localAxios } from "@/util/axios";

export const loginMember = async (id, password) => {
  try {
    const { data } = await localAxios.post(`/members/login`, {
      memberId: id,
      memberPw: password,
    });

    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getMemberInfo = async () => {
  const memberNo = localStorage.getItem("memberNo");

  try {
    const { data } = await localAxios.get(`/members/${memberNo}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const registerMember = async (member) => {
  try {
    const { data } = await localAxios.post(`/members`, member);
    alert("회원가입 성공!");
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const updateMember = async (member) => {
  try {
    const { data } = await localAxios.put(`/members`, member);
    alert("정보수정 성공!");
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const deleteMember = async () => {
  const memberNo = localStorage.getItem("memberNo");
  try {
    const { data } = await localAxios.delete(`/members/${memberNo}`);
    alert("탈퇴되었습니다.");
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
