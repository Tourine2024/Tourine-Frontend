import { localAxios } from "@/util/axios";
import { uploadImage } from "@/api/image";

export const postNewStamp = async (imgUrl) => {
  const memberNo = localStorage.getItem("memberNo");

  try {
    // // 이미지 URL에서 Blob 데이터 가져오기
    // const response = await fetch(imgUrl);
    // const imageBlob = await response.blob();
    // const imageFile = new File([imageBlob], "filename.jpg", { type: imageBlob.type });

    // // Blob 데이터를 S3에 업로드하고 URL 받아오기
    // const s3ImgUrl = await uploadImage(imageFile);

    // S3 URL과 회원 번호를 서버에 전송
    const { data } = await localAxios.post(`/collection`, {
      collectionImgUrl: imgUrl,
      memberNo: memberNo,
    });
    return data;
  } catch (err) {
    console.error("스탬프 등록 실패:", err);
    return err;
  }
};

export const getStampCollection = async () => {
  const memberNo = localStorage.getItem("memberNo");

  try {
    const { data } = await localAxios.get(`/collection?memberNo=${memberNo}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error("스탬프 컬렉션 조회 실패:", err);
    return err;
  }
};
