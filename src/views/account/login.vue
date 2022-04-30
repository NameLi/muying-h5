<template>
  <div class="login">
    <div class="back-icon">
      <m-icon name="cross" @click="$router.push('/')" />
    </div>

    <div class="app-welcome">
      <p>登录</p>
    </div>

    <!-- 表单 -->
    <div class="form">
      <div class="form-item">
        <input
          ref="account"
          type="tel"
          v-model.trim="form.account"
          @focus="isShow = false"
          @blur="isShow = true"
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
          v-model.trim="form.password"
          autocomplete="off"
          maxlength="12"
          placeholder="请输入密码"
          @focus="isShow = false"
          @blur="isShow = true"
        />
        <m-icon name="see-fill" size="36" @click="togglePassword()" />
      </div>

      <div class="submit">
        <m-button type="primary" :loading="loading" @click="doLogin()"
          >登 录</m-button
        >
      </div>
    </div>

    <div class="tool">
      <div class="register" @click="$router.replace('./register')">
        账号注册
      </div>
      <div class="forget" @click="$router.push('./forget')">找回密码</div>
    </div>

    <div class="login-info" v-show="isShow">
      Copyright © 2017-2022 ixook.com 版权所有<br />
      <a href="https://beian.miit.gov.cn">苏ICP备14015141号</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      form: {
        account: "",
        password: "",
      },
      isShowPassword: false,
      isShow: true,
    };
  },

  computed: {
    isShowClear() {
      return this.form.account;
    },
  },

  created() {
    document.title = "登录";
  },

  mounted() {
    const account = sessionStorage.getItem("account");
    if (account) {
      this.form.account = account;
    }
  },

  methods: {
    // 清空账号
    clearAccount() {
      this.form.account = "";
      this.$refs.account.focus();
    },

    // 切换是否显示密码
    togglePassword() {
      this.isShowPassword = !this.isShowPassword;
    },

    // 登录
    async doLogin() {
      if (this.form.account === "") {
        this.$toast("请输入手机号");
        return;
      }

      if (this.form.password === "") {
        this.$toast("请输入密码");
        return;
      }

      this.loading = true;
      try {
        const loginRes = await this.$store.dispatch("user/login", this.form);

        if (loginRes.code !== 200) {
          this.loading = false;
          this.$toast(loginRes.message);
          return;
        }

        const userRes = await this.$store.dispatch("user/getInfo");
        this.loading = false;

        // 登录成功
        if (userRes.code === 200) {
          this.$toast("登录成功");
          sessionStorage.setItem("account", this.form.account);
          this.$router.replace(this.$route.query.redirect || "/home");
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
