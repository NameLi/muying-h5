<template>
  <div class="login">
    <div class="back-icon">
      <m-icon name="cross" @click="$router.back()" />
    </div>

    <div class="app-welcome">
      <p>注册</p>
    </div>

    <!-- 表单 -->
    <div class="form">
      <div class="form-item">
        <input
          ref="account"
          type="tel"
          v-model.trim="form.account"
          autocomplete="off"
          maxlength="11"
          placeholder="请输入手机号"
        />
        <m-icon
          name="cross"
          size="28"
          v-if="isShowClear"
          @click="clearAccount"
        />
      </div>

      <div class="form-item" :class="{ 'is-show': isShowPassword }">
        <input
          :type="isShowPassword ? 'text' : 'password'"
          ref="password"
          v-model.trim="form.password"
          maxlength="16"
          autocomplete="off"
          placeholder="请设置初始密码（6-12位）"
        />
        <m-icon name="see-fill" size="36" @click="togglePassword()" />
      </div>

      <div class="form-item code">
        <input
          ref="code"
          type="text"
          v-model.trim="form.code"
          maxlength="4"
          autocomplete="off"
          placeholder="请输入验证码"
        />

        <div class="send-code" v-if="!sendWaiting" @click="getVerifyCode()">
          获取验证码
        </div>
        <div class="send-code" v-else>{{ codeText }}</div>
      </div>

      <div class="submit">
        <m-button type="primary" :loading="loading" @click="register()"
          >注 册</m-button
        >
      </div>
    </div>

    <!-- 图片验证码 -->
    <captcha-modal
      :phone="form.account"
      @on-success="captchaSuccessHandle"
      ref="showCaptchaModal"
    />

    <div class="tool">
      <div class="register" @click="$router.replace('./login')">账号登录</div>
      <div class="forget" @click="$router.push('./forget')">找回密码</div>
    </div>

    <div class="login-info">
      Copyright © 2017-2022 ixook.com 版权所有<br />
      <a href="https://beian.miit.gov.cn">苏ICP备14015141号</a>
    </div>
  </div>
</template>

<script>
import CaptchaModal from "./components/CaptchaModal.vue";

export default {
  name: "Login",

  components: {
    CaptchaModal,
  },

  data() {
    return {
      loading: false,
      form: {
        account: "",
        password: "",
        code: "",
      },
      isShowPassword: false,
      second: 120, // 倒计时
      clock: null, // 倒计时定时器
      codeText: "获取验证码", // 倒计时文字
      sendWaiting: false, // 定时器状态
    };
  },

  computed: {
    isShowClear() {
      return this.form.account;
    },
  },

  created() {
    document.title = "账号注册";
  },

  mounted() {
    this.$refs.account.focus();

    let second = localStorage.getItem("second");
    if (!isNaN(second) && second > 0) {
      this.second = Number(second);
      this.captchaSuccessHandle();
    }
  },

  methods: {
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

    // 清空账号
    clearAccount(e) {
      this.form.account = "";
      this.$refs.account.focus();
    },

    // 切换是否显示密码
    togglePassword() {
      this.isShowPassword = !this.isShowPassword;
    },

    // 发送验证码
    getVerifyCode() {
      if (this.sendWaiting) return;

      // 校验账号
      if (this.accountValidate()) {
        this.$refs.showCaptchaModal.open();
      }
    },

    // 验证码成功
    captchaSuccessHandle() {
      this.sendWaiting = true;
      this.clock = setInterval(this.doLoop, 1000);

      this.$refs.code.focus();
    },

    // 校验账号
    accountValidate() {
      if (this.form.account === "") {
        this.$toast("请输入手机号");
        this.$refs.account.focus();
        return;
      }

      if (!/^1[3456789]\d{9}$/.test(this.form.account)) {
        this.$toast("手机号码格式不正确");
        this.$refs.account.focus();
        return false;
      }

      return true;
    },

    // 校验密码
    passwordValidate() {
      if (this.form.password === "") {
        this.$toast("请输入密码");
        return false;
      }

      if (this.form.password.length < 6 || this.form.password.length > 16) {
        this.$toast("密码长度为6-16位之间");
        return false;
      }

      const reg = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,16}/;

      if (!reg.test(this.form.password)) {
        this.$toast("密码只能包含数字、字母和特定字符");
        return false;
      }

      return true;
    },

    // 注册
    async register() {
      // 校验手机号
      let accountReg = this.accountValidate();
      if (!accountReg) return;

      // 校验密码格式
      let passwordReg = this.passwordValidate();
      if (!passwordReg) return;

      // 校验验证码
      if (this.form.code === "") {
        this.$toast("请输入验证码");
        return false;
      }

      if (this.form.code.length !== 4) {
        this.$toast("验证码为4位数字");
        return false;
      }

      // 登录
      this.loading = true;
      try {
        const registerRes = await this.$store.dispatch("user/register", this.form);

        if (registerRes.code !== 200) {
          this.loading = false;
          return;
        }

        const userRes = await this.$store.dispatch("user/getInfo");
        this.loading = false;

        // 登录成功
        if (userRes.code === 200) {
          this.$toast("注册成功");
          this.$router.replace("/home");
        }
      } catch (e) {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  position: relative;
  min-height: 100vh;
  .back-icon {
    padding-left: 26px;
    height: 92px;
    line-height: 92px;
    .m-icon {
      color: $color-theme;
    }
  }

  .app-welcome {
    margin-top: 80px;
    padding: 0 80px;
    font-size: 48px;
    font-weight: bold;
  }

  // 表单
  .form {
    padding: 60px 80px 0;
    .form-item {
      position: relative;
      height: 120px;
      &.is-show {
        .m-icon {
          color: $color-theme;
        }
      }
      .send-code {
        position: absolute;
        right: 0;
        bottom: 24px;
        color: $color-theme;
      }
      input {
        position: relative;
        margin-top: 40px;
        height: 80px;
        line-height: 80px;
        font-size: 32px;
        border: none;
        border-bottom: 1px solid #eee; /* no */
        width: 100%;
        transition: border-color 0.2s;
        background-color: #fff;
        &::-webkit-input-placeholder {
          color: rgb(201, 201, 201);
        }
        &:-webkit-autofill,
        &[type="text"]:focus,
        &[type="password"]:focus {
          -webkit-box-shadow: 0 0 0 1000px white inset;
        }
        &:focus {
          border-color: $color-theme;
        }
      }
      .m-icon {
        position: absolute;
        right: 0;
        bottom: 22px;
        color: #ccc;
      }
    }
    .forget {
      padding-top: 20px;
      height: 60px;
      text-align: right;
      color: #999;
    }
    .submit {
      padding-top: 60px;
    }
  }
  .tool {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    padding: 0 80px;
    font-size: 24px;
  }
  .login-info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 30px;
    line-height: 36px;
    color: #aaa;
    font-size: 24px;
    text-align: center;
    a {
      color: #aaa;
    }
  }
}
</style>
