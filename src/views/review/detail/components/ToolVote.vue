<template>
  <div class="tool-vote">
    <!-- 赞成 -->
    <div
      v-if="review.vote_type !== -1"
      class="vote-item"
      :class="{ 'is-active': review.vote_type === 1 }"
      @click="voteClick('up')"
    >
      <i class="review-icon iconfont icon-up"></i>
      <span class="review-count"
        >{{ review.vote_type === 1 ? "已赞同 " : "赞同 "
        }}{{ review.vote_up_count }}</span
      >
    </div>
    <!-- 反对 -->
    <div
      v-if="review.vote_type !== 1"
      class="vote-item"
      :class="{ 'is-active': review.vote_type === -1 }"
      @click="voteClick('down')"
    >
      <i class="review-icon iconfont icon-down"></i>
      <span class="review-count"
        >{{ review.vote_type === 1 ? "已反对 " : "反对 "
        }}{{ review.vote_down_count }}</span
      >
    </div>
  </div>
</template>


<script>
import { createReviewVote } from "@/api/user";

export default {
  name: "ToolVote",

  props: {
    review: {
      type: Object,
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    // 投票
    async voteClick(type) {
      if (this.loading) return;

      let params = {
        type: this.review.vote_type === 0 ? type : "cancel",
      };

      this.loading = true;
      const { code, data, message } = await createReviewVote(
        this.review.id,
        params
      );
      this.loading = false;

      if (code === 200) {
        Object.assign(this.review, data);

        this.$toast(message);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.tool-vote {
  display: flex;
  height: 60px;
  color: $color-theme;
  .vote-item {
    display: flex;
    align-items: center;
    margin-right: 10px;
    padding: 0 16px;
    border-radius: 6px;
    background-color: rgba($color-theme, 0.08);
    &.is-active {
      color: #fff;
      background-color: $color-theme;
    }
    .review-icon {
      font-size: 32px;
    }
    .review-count {
      padding: 0 12px;
      font-size: 24px;
    }
  }
}
</style>