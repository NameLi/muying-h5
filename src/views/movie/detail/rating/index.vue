<template>
  <page round half title="评分分布（示例）">
    <div class="loading" v-if="loading">
      <m-spinner type="triple" color="#f60, #7fd901, #36a2e0" />
    </div>

    <div class="tip">评分分布功能因样本原因还在开发中，以下仅为示例数据</div>

    <!-- 详情 -->
    <rate-detail
      :rating="rating"
      :vote-count="voteCount"
      :ratios="ratios"
      :better-than="betterThan"
    />

    <!-- 趋势 -->
    <rate-trend :months="months" />
  </page>
</template>

<script>
import RateDetail from "./components/RateDetail.vue";
import RateTrend from "./components/RateTrend.vue";

import { getMovieRatings } from "@/api/movie";

export default {
  name: "MovieRating",

  components: {
    RateTrend,
    RateDetail,
  },

  props: ["id"],

  data() {
    return {
      loading: false,
      rating: "",
      voteCount: "",
      ratios: [],
      betterThan: [],
      months: [],
    };
  },

  mounted() {
    this.getMovieRatings();
  },

  methods: {
    async getMovieRatings() {
      this.loading = true;
      const { code, data } = await getMovieRatings(this.id);

      if (code === 200) {
        this.rating = data.rating;
        this.voteCount = data.vote_count;
        this.ratios = data.ratios;
        this.betterThan = data.better_than;
        this.months = data.months;
      }

      this.$nextTick(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.loading {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tip {
  margin: 20px;
  font-size: 24px;
  color: $color-theme;
}
</style>