<template>
  <div class="movie-bar-wrapper">
    <div class="movie-bar">
      <!-- 影评 -->
      <div class="review" @click="$router.push(`/movies/${movie.id}/reviews`)">
        <i class="review-icon iconfont icon-article-fill"></i>
        <span class="review-count" v-if="movie.review_count">共有{{ movie.review_count }}条影评</span>
        <span class="review-count" v-else>还没有人发布过影评</span>
      </div>

      <div class="bar-tool">
        <!-- 收藏 -->
        <div class="tool-item" @click="showSaveModal()">
          <div
            class="tool-item-icon"
            :class="{ 'is-checked': movie.is_collection }"
          >
            <i class="iconfont icon-star-fill"></i>
          </div>
          <div class="tool-item-count">
            {{ movie.collection_count || "收藏" }}
          </div>
        </div>

        <!-- 评论 -->
        <div
          class="tool-item"
          @click="$router.push(`/movies/${movie.id}/comments`)"
        >
          <div class="tool-item-icon">
            <i class="iconfont icon-comment-fill"></i>
          </div>
          <div class="tool-item-count">{{ movie.comment_count || "评论" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieBar",
  props: {
    movie: {
      type: Object,
    },
  },

  methods: {
    showSaveModal() {
      this.$router.push(`/movies/${this.movie.id}/favorite`);
    },
  },
};
</script>

<style scoped lang="scss">
.movie-bar-wrapper {
  height: 100px;
  .movie-bar {
    z-index: 9;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 90px;
    border-top: 1px solid #eee;
    box-shadow: 0 0 4px #f5f5f5;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    color: rgb(127, 136, 155);
    .review {
      margin-left: 10px;
      padding: 0 28px;
      height: 60px;
      line-height: 60px;
      border-radius: 100px;
      .review-icon {
        font-size: 32px;
      }
      .review-count {
        padding: 0 12px;
        font-size: 28px;
      }
    }
    .bar-tool {
      text-align: center;
      .tool-item {
        vertical-align: top;
        display: inline-block;
        width: 80px;
        margin: 0 2px;
        &-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          .iconfont {
            font-size: 40px;
          }
          &.is-checked {
            color: $color-theme;
          }
        }
        &-count {
          height: 32px;
          line-height: 28px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>