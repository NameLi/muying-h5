<template>
  <page>
    <header-bar title="设置" />

    <m-cell-group>
      <m-cell title="应用名称" :value="APP_NAME" />
      <m-cell title="开发者" :value="DEVELOPER" />
      <m-cell title="版本" :value="VERSION" />
    </m-cell-group>

    <div class="logout" v-if="isLogin">
      <m-button type="danger" @click="logout()">退出登录</m-button>
    </div>
  </page>
</template>

<script>
import { APP_NAME, DEVELOPER, VERSION } from "@/config";
import { mapGetters } from "vuex";

export default {
  name: "Setting",
  data() {
    return {
      APP_NAME,
      DEVELOPER,
      VERSION,
    };
  },

  computed: {
    ...mapGetters({
      user: "user/getUser",
    }),
    isLogin() {
      return !!this.user;
    },
  },

  methods: {
    logout() {
      this.$store.commit("user/SET_USER", null);
      this.$store.commit("user/SET_TOKEN", "");
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      this.$router.back();
    },
  },
};
</script>

<style scoped lang="scss">
.logout {
  position: fixed;
  bottom: 20px;
  left: 15px;
  right: 15px;
}
</style>