<template>
  <div class="container">
    <header-scroll-bar
      :title="award.title"
      :subtitle="award.original_title"
      :poster="award.poster"
      :end-top="140"
    />

    <!-- 奖项信息 -->
    <award-info :award="award" />

    <!-- 奖项 届 -->
    <div class="award-session-list">
      <div class="session-title">历届列表</div>
      <div
        class="session-item"
        v-for="n in award.session"
        :key="n"
        @click="pathToSession(award.session - n + 1)"
      >
        第{{ award.session - n + 1 }}届
      </div>
    </div>

    <transition name="slide-left">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { getAward } from "@/api/award";
import AwardInfo from "./components/AwardInfo";

export default {
  components: { AwardInfo },
  name: "AwardDetail",

  props: ["name"],

  data() {
    return {
      loading: false,
      award: {},
    };
  },
  mounted() {
    this.getAward();
  },

  methods: {
    async getAward() {
      this.loading = true;
      const { code, data } = await getAward(this.name);
      this.loading = false;

      if (code === 200) {
        this.award = data;
      }
    },

    pathToSession(session) {
      this.$router.push(`/awards/${this.award.name}/${session}`);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  .award-session-list {
    padding: 30px;
    font-size: 0;
    .session-title {
      height: 60px;
      height: 60px;
      font-size: 28px;
    }
    .session-item {
      display: inline-block;
      width: 25%;
      height: 60px;
      line-height: 60px;
      font-size: 28px;
      text-align: center;
      color: #777;
    }
  }
}
</style>