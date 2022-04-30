<template>
  <div class="movie-row" @click="pathTo()">
    <div class="poster-wrapper">
      <img v-lazy="movie.poster" class="img-cover" />

      <!-- category -->
      <div class="category-tag" v-if="isShowCategory">{{ movie.category }}</div>

      <div class="info" v-if="!isComing">
        <span v-if="movie.episode_count">全{{ movie.episode_count }}集</span>
        <label v-if="movie.rating">{{ movie.rating }}分</label>
        <label v-else>暂无评分</label>
      </div>
      <div class="info white" v-else>
        <div class="wish-count" v-if="movie.wish_count">
          {{ movie.wish_count }} 想看
        </div>
      </div>
    </div>
    <h6 class="title">{{ movie.title }}</h6>
    <slot />
  </div>
</template>

<script>
export default {
  name: "MovieRow",
  props: {
    movie: {
      type: Object,
      required: true,
    },
    isComing: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isShowCategory() {
      return this.movie.category && this.movie.category === "电影"
        ? null
        : this.movie.category;
    },
  },

  methods: {
    pathTo() {
      this.$store.commit("SET_MOVIE", this.movie);
      this.$router.push(`/movies/${this.movie.id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.movie-row {
  position: relative;
  vertical-align: top;
  display: inline-block;
  margin-right: 16px;
  padding-bottom: 15px;
  width: 188px;
  .poster-wrapper {
    position: relative;
    width: 100%;
    height: 268px;
    overflow: hidden;
    border-radius: 6px;
    .img-cover {
      width: 188px;
      height: 268px;
      object-fit: cover;
      background-color: rgba(#f5f5f5, 0.45);
    }
    .category-tag {
      z-index: 3;
      position: absolute;
      right: 10px;
      top: 10px;
      padding: 2px 8px;
      font-size: 10px;
      color: #fff;
      border-radius: 6px;
      background-color: rgba(orange, .7);
    }
    .info {
      position: absolute;
      padding: 0 10px;
      left: 0;
      bottom: 0;
      height: 60px;
      width: 100%;
      font-size: 24px;
      line-height: 72px;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.45));
      &.white {
        color: #fff;
      }
      span {
        float: left;
        color: #ccc;
      }
      label {
        float: right;
        color: orange;
      }
    }
  }
  .title {
    padding-top: 12px;
    line-height: 36px;
    font-size: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
