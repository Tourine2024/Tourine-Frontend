<template>
  <div>
    <div ref="editor" />
  </div>
</template>

<script setup>
import { uploadImage } from "@/api/image"; // 서버로 이미지를 업로드하는 API
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { ref, onMounted, defineEmits, defineProps, computed } from "vue";

const props = defineProps({
  initialValue: String, // 초기 Markdown 데이터를 받는 Props
});

const updatedInitialValue = computed(() => {
  return props.initialValue;
});

const editor = ref();
const editorInstance = ref(null);

const emit = defineEmits(["updateContent"]);

const previewStyle = window.innerWidth > 1000 ? "vertical" : "tab";

onMounted(() => {
  editorInstance.value = new Editor({
    el: editor.value,
    height: "500px",
    placeholder: "여행 기록을 적어주세요!",
    initialEditType: "markdown",
    previewStyle: previewStyle,
    initialValue: updatedInitialValue.value || "",
    hideModeSwitch: true,
    linkAttributes: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
    toolbarItems: [["heading", "bold"], ["hr"], ["ul"], ["image", "link"]],
    hooks: {
      addImageBlobHook: async (blob, callback) => {
        // 이미지 크기 제한 확인
        if (blob.size > 100 * 1024) {
          // 100KB 제한
          alert("이미지의 크기는 100KB를 초과할 수 없습니다.");
          return false;
        }

        try {
          const imageUrl = await uploadImage(blob);

          // 서버에서 이미지 URL을 반환받았을 때
          if (imageUrl) {
            // alt 텍스트 설정 (필요에 따라 입력)
            const imageDescriptionInput = document.getElementById(
              "toastuiAltTextInput"
            );
            const altText = imageDescriptionInput
              ? imageDescriptionInput.value
              : "";

            // 에디터에 이미지 추가
            callback(imageUrl, altText);
          } else {
            // 업로드 실패 처리
            alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
          }
        } catch (error) {
          console.error("이미지 업로드 중 오류 발생:", error);
          alert("이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      },
    },
    events: {
      change: () => {
        emitEditorContent(); // 에디터 내용이 바뀔 때마다 emitEditorContent 호출
      },
    },
  });
});

console.log(props.initialValue); // Editor instance
props.initialValue = props.initialValue + " hi";

// Markdown to HTML 변환 함수
function convertMarkdownToHTML(markdown) {
  const editor = new Editor({
    el: document.createElement("div"), // 임시로 사용할 보이지 않는 엘리먼트를 생성
    initialEditType: "markdown",
    initialValue: markdown, // 변환할 Markdown 내용을 입력
  });

  return editor.getHTML(); // 변환된 HTML을 반환
}

// 에디터 내용을 부모 컴포넌트로 전달하는 함수 정의
const emitEditorContent = () => {
  if (editorInstance.value) {
    emit(
      "updateContent",
      convertMarkdownToHTML(editorInstance.value.getMarkdown())
    ); // HTML 내용을 부모로 emit
  }
};
</script>
