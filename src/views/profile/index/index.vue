<template>
  <div class="container">
    <user-info :user="user" />
    <user-menu :count="count" :is-login="isLogin" />
    <user-cell :user="user" />

    <transition name="slide-left">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserCollectionCount } from "@/api/user";

import UserInfo from "./components/MineInfo";
import UserMenu from "./components/MineMenu";
import UserCell from "./components/MineCell";

export default {
  name: "Profile",

  components: {
    UserInfo,
    UserMenu,
    UserCell,
  },

  data() {
    return {
      count: {
        actor_count: "-",
        role_count: "-",
        review_count: "-",
        video_count: "-",
      },
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

  watch: {
    isLogin(val) {
      if (!val) {
        this.count = this.$options.data().count;
      }
    },
  },

  created() {
    document.title = "我的";
  },

  activated() {
    document.title = "我的";

    if (this.isLogin) {
      this.getUserCollectionCount();
    }
  },

  mounted() {
    if (this.isLogin) {
      this.getUserCollectionCount();
    }
  },

  methods: {
    async getUserCollectionCount() {
      this.countLoading = true;
      const res = await getUserCollectionCount();
      this.countLoading = false;

      if (res.code === 200) {
        this.count = res.data;
      }
    },
  },
};
</script>
