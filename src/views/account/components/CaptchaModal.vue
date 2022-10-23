<template>
  <m-modal :visible.sync="visible" :showConfirmButton="false">
    <p class="title">请输入以下验证码数字</p>

    <div class="captcha-main">
      <img
        class="captcha"
        :src="captche"
        alt="点击重新获取"
        @click="getCaptcha()"
      />
    </div>

    <div class="code-input-main">
      <div
        class="code-input-main-item"
        v-for="(item, index) in codeList"
        :key="index"
      >
        {{ code[index] || "" }}
      </div>
      <input
        ref="codeInput"
        class="code-input"
        v-model.trim="code"
        :maxlength="codeLength"
        @input="inputChange"
        type="tel"
      />
    </div>
  </m-modal>
</template>

<script>
import { getCaptcha, createPhoneCode } from "@/api/common";

export default {
  name: "CaptchaModal",

  props: {
    codeLength: {
      type: Number,
      default: 4,
    },
    phone: {},
    type: {
      type: String,
      default: "register",
    },
  },

  data() {
    return {
      loading: false,
      captche: "",
      visible: false,
      codeList: [],
      code: "",
    };
  },

  mounted() {
    this.codeList = new Array(this.codeLength).fill("");
  },

  watch: {
    code() {
      if (this.code.length > this.codeLength) {
        this.code = this.code.substring(0, this.codeLength);
      }
    },
  },

  methods: {
    open() {
      this.visible = true;
      this.code = "";
      this.captche = "";
      this.loading = false;
      this.getCaptcha();

      this.$nextTick(() => {
        this.$refs.codeInput.focus();
      });
    },

    async getCaptcha() {
      if (this.loading) return;

      this.loading = true;
      const { code, data } = await getCaptcha();
      this.loading = false;

      if (code === 200) {
        this.captche = data;
      }
    },

    //
    async createPhoneCode() {
      let params = {
        phone: this.phone,
        code: this.code,
        type: this.type,
      };

      this.sendLoading = true;
      const { code, message } = await createPhoneCode(params);
      this.sendLoading = false;

      if (code === 200) {
        this.visible = false;
        this.$toast(message);
        this.$emit("on-success");
      } else if (code !== 450) {
        this.code = "";
        this.getCaptcha();
      }
    },

    inputChange() {
      if (this.code.length === this.codeLength) {
        this.createPhoneCode();
      }
    },

    handleClose() {},
  },
};
</script>

<style scoped lang="scss">
.title {
  line-height: 60px;
}
.captcha-main {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
}
.captcha-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  > input {
    width: 80px;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 3px;
    text-align: center;
    font-size: 36px;
  }
}

.code-input-main {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: relative;
  padding: 40px 0 0;
}

.code-input {
  height: 68px;
  width: 100%;
  position: absolute;
  border: none;
  outline: none;
  color: transparent;
  background-color: transparent;
  text-shadow: 0 0 0 transparent;
}

.code-input-main-item {
  width: 34px;
  height: 68px;
  line-height: 68px;
  margin: 0 5px;
  padding-bottom: 0;
  opacity: 0.8;
  border-bottom: solid #323232 1px;
  text-align: center;
  font-size: 36px;
  color: #323232;
}
</style>