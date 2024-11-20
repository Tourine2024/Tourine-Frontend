//사용자와 관련된 api 요청

import { localAxios } from "@/util/axios";

export const loginMember = async (id, password) => {
  try {
    const { data } = await localAxios.post(`/members/login`, {
      memberId: id,
      memberPw: password,
    });
    localStorage.setItem("memberNo", data.memberNo);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getMemberInfo = async () => {
  const memberNo = localStorage.getItem("memberNo");
  console.log(memberNo);

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
  console.log(member);
  try {
    const { data } = await localAxios.post(`/members`, {
      member,
    });
    alert("회원가입 성공!");
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
