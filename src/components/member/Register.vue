<template>
  <v-dialog v-model="localShowDialog" max-width="400" persistent>
    <v-card>
      <v-card-title>
        User Registration
        <v-btn icon @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-text-field
            v-model="first"
            color="primary"
            label="이름"
            variant="underlined"
            :rules="[required]"
          ></v-text-field>

          <v-text-field
            v-model="email"
            color="primary"
            label="이메일"
            variant="underlined"
            :rules="[required]"
          ></v-text-field>

          <v-text-field
            v-model="password"
            color="primary"
            label="비밀번호"
            placeholder="비밀번호를 입력하세요."
            variant="underlined"
            :rules="[required]"
          ></v-text-field>

          <v-text-field
            v-model="passwordCheck"
            color="primary"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 한번 입력하세요."
            variant="underlined"
            :rules="[required]"
          ></v-text-field>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success">
          회원가입
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      first: null,
      email: null,
      password: null,
      passwordCheck: null,
    };
  },
  computed: {
    localShowDialog: {
      get() {
        return this.modelValue; // 부모에서 전달받은 값
      },
      set(value) {
        this.$emit("update:modelValue", value); // 부모에게 업데이트 이벤트 전달
      },
    },
  },
  methods: {
    required(v) {
      return !!v || "Field is required";
    },
    closeModal() {
      this.localShowDialog = false; // 모달 닫기
    },
  },
};
</script>
