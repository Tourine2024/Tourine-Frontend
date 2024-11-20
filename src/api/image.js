import { localAxios } from "@/util/axios";

async function uploadImage(image) {
  const maxSize = 50 * 1024 * 1024;
  if (image.size > maxSize) {
    alert("이미지의 크기는 50MB를 초과할 수 없습니다.");
    return null;
  }

	const formDataPayload = new FormData();
	formDataPayload.append("image", image); // 'image'는 백엔드에서 받을 키 이름
  
	try {
	  const response = await localAxios().post("/images/upload", formDataPayload, {
		headers: {
		  "Content-Type": "multipart/form-data",
		},
    });
    
	  console.log("이미지 URL:", response.data);
		return response.data; // 성공 시 URL 반환
	} catch (error) {
	  alert("이미지 업로드에 실패했습니다.");
    console.error("이미지 업로드 실패:", error);
    return null;
	}
}
  
export { uploadImage };