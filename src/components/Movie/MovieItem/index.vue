<template>
  <div class="movie-item border_bottom" @click="pathTo()">
    <div class="poster-wrapper">
      <img v-lazy="movie.poster" class="img-cover" />
      <div class="sort" v-if="index">
        <span class="sort-bg"></span>
        <span class="sort-value">{{ index }}</span>
      </div>
    </div>

    <div class="movie-info">
      <div class="title">
        <div class="name ellipsis" v-html="title"></div>

        <div
          class="rating"
          :class="{ 'is-third': movie.is_thrid_rating }"
          v-if="!isComing && movie.rating"
        >
          <span class="value">{{ movie.rating }}</span>
          <span>分</span>
        </div>
      </div>

      <div v-if="isComing" class="info-item wish-count">
        <span>{{ movie.wish_count }}</span
        >人想看
      </div>
      <div v-else class="info-item ellipsis">
        <span v-if="isShowCategory" class="category-tag border">{{
          movie.category
        }}</span>
        {{ movie.year }}
      </div>
      <div class="info-item ellipsis">{{ movie.genres }}</div>
      <div class="info-item ellipsis">{{ movie.countries }}</div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieItem",

  props: {
    movie: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
    },
    isComing: {
      type: Boolean,
      default: false,
    },
    keyword: {},
  },

  computed: {
    title() {
      return this.movie.title.replace(
        this.keyword,
        `<span>${this.keyword}</span>`
      );
    },
    isShowCategory() {
      return this.movie.category && this.movie.category !== "电影";
    },
  },

  methods: {
    pathTo() {
      this.$emit("on-checked", this.movie);

      this.$store.commit("SET_MOVIE", this.movie);
      this.$router.push(`/movies/${this.movie.id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.movie-item {
  position: relative;
  display: flex;
  margin: 0 30px;
  padding: 16px 0;
  .poster-wrapper {
    position: relative;
    width: 164px;
    height: 220px;
    overflow: hidden;
    border-radius: 6px;
    .img-cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: rgba(#f5f5f5, 0.45);
    }
  }
  .movie-info {
    flex: 1;
    margin-left: 24px;
    width: 0;
    .title {
      display: flex;
      height: 44px;
      line-height: 44px;
      .name {
        font-size: 32px;
        color: #333;
        flex: 1;
        width: 0;
        ::v-deep span {
          color: red;
        }
      }
      .rating {
        width: 120px;
        text-align: right;
        font-size: 28px;
        color: #feb300;
        text-align: right;
        &.is-third {
          color: #f16c00;
        }
        .value {
          font-size: 28px;
          font-weight: bold;
        }
        span {
          font-size: 20px;
          padding: 0 4px;
        }
      }
    }
    .info-item {
      padding-top: 12px;
      height: 46px;
      font-size: 24px;
      color: #999;
      &.wish-count {
        > span {
          color: $color-theme;
          font-size: 28px;
        }
      }
      .category-tag {
        display: inline-block;
        margin-right: 8px;
        padding: 0 6px;
        height: 28px;
        line-height: 28px;
        border-radius: 4px;
        font-size: 12PX;
        color: #feb300;
        background-color: rgba(#feb300, 0.15);
        &::before {
          border-color: #feb300;
        }
      }
    }
  }

  .sort {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    line-height: 40px;
    width: 30px;
    text-align: center;
    .sort-bg {
      position: absolute;
      left: -50px;
      top: 0;
      width: 120px;
      height: 40px;
      transform: rotate(-45deg);
      background: #adadad;
      text-align: center;
      z-index: -1;
    }
    .sort-value {
      color: #fff;
      font-size: 22px;
    }
  }

  &:nth-child(1) .sort-bg {
    background: #ff0000;
  }
  &:nth-child(2) .sort-bg {
    background: #ff4500;
  }
  &:nth-child(3) .sort-bg {
    background: #f4a460;
  }
}
</style>
