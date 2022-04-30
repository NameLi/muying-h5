<template>
  <div class="wrapper">
    <header-bar title="找回密码" />

    <!-- 步骤1 手机号校验 -->
    <div class="step step_1" v-if="step === 1">
      <div class="field-item">
        <span>手机号码</span>
        <input
          v-model.trim="account"
          type="tel"
          ref="account"
          autocomplete="off"
          placeholder="请输入注册手机号"
        />

        <div v-if="account" class="clear-icon" @click="clearAccount()">
          <m-icon name="cross" color="#fff" size="24" />
        </div>
      </div>

      <div class="btn-container">
        <m-button type="primary" :loading="loading" @click="checkAccount()"
          >下一步</m-button
        >
      </div>
    </div>

    <!-- 步骤2 手机验证码 -->
    <div class="step step_2" v-if="step === 2">
      <div class="field-item">
        <input
          v-model.trim="code"
          type="tel"
          autocomplete="off"
          placeholder="请输入验证码"
        />
        <m-button
          style="width: 106px"
          size="small"
          type="primary"
          :disabled="sendWaiting"
          @click="showCaptchaModal()"
          >{{ codeText }}</m-button
        >
      </div>
      <div class="tip">验证码会发送至您注册的手机号</div>

      <div class="btn-container">
        <m-button type="primary" :loading="loading" @click="checkCode()"
          >下一步</m-button
        >
      </div>
    </div>

    <!-- 步骤3 新密码 -->
    <div class="step step_3" v-if="step === 3">
      <div class="field-item" :class="{ 'is-show': isShowPassword }">
        <span>新密码</span>
        <input
          v-model.trim="password"
          :type="isShowPassword ? 'text' : 'password'"
          ref="password"
          autocomplete="off"
          placeholder="请输入新密码"
        />

        <!-- 密码显示与隐藏 -->
        <div v-if="password" class="password-icon" @click="togglePassword()">
          <m-icon v-if="isShowPassword" name="see-fill" size="40" />
          <m-icon v-else name="see-fill" color="#999" size="40" />
        </div>
      </div>

      <div class="btn-container">
        <m-button
          type="primary"
          :loading="loading"
          @click="updateUserPassword()"
          >提 交</m-button
        >
      </div>
    </div>

    <!-- 图片验证码 -->
    <captcha-modal
      type="forget"
      :phone="account"
      @on-success="captchaSuccessHandle"
      ref="showCaptchaModal"
    />
  </div>
</template>

<script>
import CaptchaModal from "./components/CaptchaModal.vue";
import { checkAccount } from "@/api/user";
import { checkPhoneCode } from "@/api/common";
import axios from "axios";

export default {
  name: "Forget",

  components: {
    CaptchaModal,
  },

  data() {
    return {
      loading: false,
      step: 1,
      account: "",
      password: "",
      code: "",
      token: "",

      isShowPassword: false,
      second: 120, // 倒计时
      clock: null, // 倒计时定时器
      codeText: "获取验证码", // 倒计时文字
      sendWaiting: false, // 定时器状态
    };
  },

  mounted() {
    let second = localStorage.getItem("second");
    if (!isNaN(second) && second > 0) {
      this.second = Number(second);
      this.clock && clearInterval(this.clock);
      this.captchaSuccessHandle();
    }

    this.$nextTick(() => {
      this.$refs.account.focus();
    });

    const account = sessionStorage.getItem("account");
    if (account) {
      this.account = account;
    }
  },

  methods: {
    /**
     * @desc 第一步，校验手机号是否存在
     */

    // 清空账号
    clearAccount() {
      this.account = "";
      this.$refs.account.focus();
    },

    accountValidate() {
      if (this.account === "") {
        this.$toast("请输入手机号");
        this.$refs.account.focus();
        return;
      }

      if (!/^1[3456789]\d{9}$/.test(this.account)) {
        this.$toast("手机号码格式不正确");
        this.$refs.account.focus();
        return false;
      }

      return true;
    },

    // 校验账号
    async checkAccount() {
      if (!this.accountValidate()) {
        return;
      }

      let params = {
        account: this.account,
      };

      this.loading = true;
      const { code } = await checkAccount(params);
      this.loading = false;

      if (code === 200) {
        this.step = 2;
      }
    },

    /**
     * @desc 第二步，手机验证码
     */

    // 显示图片验证码
    showCaptchaModal() {
      if (this.sendWaiting) return;

      // 校验账号
      this.$refs.showCaptchaModal.open();
    },

    // 图片验证码成功
    captchaSuccessHandle() {
      this.sendWaiting = true;
      this.clock = setInterval(this.doLoop, 1000);
    },

    // 倒计时
    doLoop() {
      this.second--;

      localStorage.setItem("second", this.second);

      if (this.second > 0) {
        this.codeText = this.second + " s";
      } else {
        clearInterval(this.clock); //清除js定时器
        this.sendWaiting = false;
        this.codeText = "获取验证码";
        this.second = 120; //重置时间
      }
    },

    // 校验验证码是否正确
    async checkCode() {
      if (this.code === "") {
        this.$toast("请填写手机验证码");
        return;
      }

      let params = {
        phone: this.account,
        code: this.code,
      };

      this.loading = true;
      const { code, data } = await checkPhoneCode(params);
      this.loading = false;

      if (code === 200) {
        this.token = data.token;

        this.step = 3;

        this.$nextTick(() => {
          this.$refs.password.focus();
        });
      }
    },

    // 密码
    togglePassword() {
      this.isShowPassword = !this.isShowPassword;

      const password = this.password;
      this.password = "";
      this.$nextTick(() => {
        this.$refs.password.focus();
        this.password = password;
      });
    },

    // 更新密码
    async updateUserPassword() {
      if (this.password === "") {
        this.$toast("请输入密码");
        return false;
      }

      if (this.password.length < 6 || this.password.length > 16) {
        this.$toast("密码长度为6-16位之间");
        return false;
      }

      const reg = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,16}/;

      if (!reg.test(this.password)) {
        this.$toast("密码只能包含数字、字母和特定字符");
        return false;
      }

      let params = {
        password: this.password,
      };

      this.loading = true;
      const { code, message } = await axios.request({
        method: "put",
        url: "/user/password",
        data: params,
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });
      this.loading = false;

      if (code === 200) {
        this.$toast(message);

        sessionStorage.setItem("account", this.account);

        setTimeout(() => {
          this.$router.replace("/login");
        }, 1000);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  background-color: #f5f5f5;
  min-height: 100vh;
  overflow: hidden;
  .step {
    .field-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 30px;
      padding: 0 30px;
      height: 100px;
      background-color: #fff;
      font-size: 32px;
      input {
        flex: 1;
        height: 80px;
        border: 0;
        text-align: right;
        letter-spacing: 4px;
      }
      .clear-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 30px;
        height: 36px;
        width: 36px;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    &.step_2 {
      .field-item {
        input {
          text-align: left;
        }
      }
      .tip {
        margin: 10px 30px;
        font-size: 24px;
        color: #777;
      }
    }
    &.step_3 {
      .field-item {
        .password-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          width: 80px;
          height: 80%;
          color: $color-theme;
        }
      }
    }
  }
  .btn-container {
    margin: 50px 30px 0;
  }
}
</style>