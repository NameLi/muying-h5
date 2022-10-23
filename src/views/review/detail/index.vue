<template>
  <div class="container">
    <header-bar title="影评" />

    <!-- 加载骨架屏 -->
    <skeleton v-if="loading" />

    <!-- 内容 -->
    <div class="main" v-else>
      <h2 class="review-title">{{ review.title }}</h2>

      <!-- 作者信息 -->
      <div class="author" v-if="author">
        <img class="author-avatar" :src="author.avatar" alt="" />
        <div class="author-info">
          <div class="author-name">{{ author.username }}</div>
          <div class="review-info">{{ review.created_at }}</div>
        </div>
      </div>

      <!-- 原创 / 剧透 -->
      <div
        class="extra-info"
        v-if="review.is_original || review.is_spoiler === 1"
      >
        <span v-if="review.is_original === 1">原创</span>
        <span v-if="review.is_spoiler === 1">该影评可能存在剧透</span>
      </div>

      <!-- 来源 -->
      <div class="from" v-if="review.from !== 'muying'">
        <span>该影评来自：</span>
        <a :href="review.from_link" target="_blank">{{ review.from_zh }}</a>
      </div>

      <!-- 内容 -->
      <div
        class="review-content"
        style="font-size: 16px"
        v-html="review.content"
      ></div>

      <!-- 影评版权信息 -->
      <div class="copyright">{{ review.copyright_zh }}</div>

      <!-- 所属影视 -->
      <div style="height: 20px"></div>
      <movie-card v-if="review.movie" :movie="review.movie" />
    </div>

    <!-- 影评操作 -->
    <tool-bar
      type="reviews"
      :data="review"
      v-if="!loading && (!review.from || review.from === 'muying')"
    >
      <template v-slot:left>
        <tool-vote :review="review" />
      </template>
    </tool-bar>

    <!-- 详情 -->
    <transition name="layer">
      <router-view :comment_count="review.comment_count" />
    </transition>
  </div>
</template>

<script>
import { getReview } from "@/api/review";

import ToolVote from "./components/ToolVote";
import Skeleton from "./components/Skeleton";

export default {
  name: "Review",

  components: {
    ToolVote,
    Skeleton,
  },

  props: ["id"],

  data() {
    return {
      loading: false,
      review: {},
      comments: [],
    };
  },

  computed: {
    author() {
      return this.review?.author;
    },
  },

  mounted() {
    this.$preventScroll(false);
    this.getReview();
  },

  beforeDestroy() {
    this.$preventScroll(true);
  },

  methods: {
    async getReview() {
      this.loading = true;
      const { code, data } = await getReview(this.id);
      this.loading = false;

      if (code === 200) {
        this.review = data;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  overflow: hidden;
  .main {
    padding: 0 30px 20px;
    .review-title {
      padding: 30px 0;
      font-size: 44px;
      line-height: 60px;
      font-weight: bold;
      text-align: justify;
    }
    .author {
      display: flex;
      padding: 10px 0;
      .author-avatar {
        height: 70px;
        width: 70px;
        border-radius: 50%;
      }
      .author-info {
        margin-left: 20px;
        line-height: 34px;
        .author-name {
          font-weight: bold;
          font-size: 28px;
        }
        .review-info {
          font-size: 28px;
          color: #999;
        }
      }
    }
    .extra-info {
      margin-top: 20px;
      color: #aaa;
      font-size: 28px;
      line-height: 40px;
      text-align: right;
      > span {
        margin-left: 16px;
      }
    }
    .from {
      font-size: 28px;
      text-align: right;
      span {
        color: #999;
      }
      a {
        color: $color-theme;
      }
    }

    .review-content {
      margin-top: 30px;
      line-height: 1.8;
      color: #57534f;
      text-align: justify;
      word-break: break-all;
      ::v-deep img {
        display: block;
        margin: 20px auto;
      }
      ::v-deep p {
        margin: 20px 0;
      }
    }
    .copyright {
      line-height: 70px;
      font-size: 24px;
      color: #999;
    }
  }
}
</style>