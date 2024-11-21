<template>
  <div>
    <div ref="editor" />
  </div>
</template>

<script setup lang="ts">
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { ref, onMounted } from "vue";

const editor = ref();

const previewStyle = window.innerWidth > 1000 ? "vertical" : "tab";

onMounted(() => {
  const editorInstance = new Editor({
    el: editor.value,
    height: "500px",
    placeholder: "여행 기록을 적어주세요!",
    initialEditType: "markdown",
    previewStyle: previewStyle,
    hideModeSwitch: true,
    linkAttributes: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
    toolbarItems: [["heading", "bold"], ["hr"], ["ul"], ["image", "link"]],
    hooks: {
      addImageBlobHook: (
        blob: Blob,
        callback: (arg0: string, arg1: string) => void
      ) => {
        if (blob.size > 100 * 1024) {
          // 100KB
          alert("The image must be under 100KB.");
          return false;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event?.target?.result;
          if (typeof dataUrl === "string") {
            const imageDescriptionInput = document.getElementById(
              "toastuiAltTextInput"
            ) as HTMLInputElement;
            const altText = imageDescriptionInput.value;
            callback(dataUrl, altText);
          } else {
            console.error("The loaded data is not of string type:", dataUrl);
          }
        };
        reader.readAsDataURL(blob);
      },
    },
    events: {
      change: function () {
        const initialContent = editorInstance.getHTML();
        const parser = new DOMParser();
        const doc = parser.parseFromString(initialContent, "text/html");
        const imgTags = doc.querySelectorAll("img");
        imgTags.forEach((img) => {
          const src = img.getAttribute("src");
          if (src && src.startsWith("data:")) {
            const base64String = src.split(",")[1];
            const byteLength = atob(base64String).length;
            if (byteLength > 100 * 1024) {
              // 100KB
              alert("The image must be under 100KB.");
              img.remove();
            }
          }
        });
        const finalContent = doc.body.innerHTML;
        if (initialContent !== finalContent) {
          editorInstance.setHTML(finalContent);
        }
      },
    },
  });
  editor.value.addEventListener("click", (event: MouseEvent) => {
    let target = event.target as Node | null;
    while (target && target.nodeName !== "A") {
      target = target.parentNode;
    }
    if (target instanceof HTMLElement && target.nodeName === "A") {
      event.preventDefault();
      const href = target.getAttribute("href");
      if (href) {
        window.open(href);
      }
    }
  });
});
</script>
