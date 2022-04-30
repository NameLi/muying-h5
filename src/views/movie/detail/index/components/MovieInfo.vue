<template>
  <div class="movie-info-wrapper">
    <div class="movie-poster">
      <img class="poster" :src="poster" />
    </div>

    <div class="movie-info">
      <!-- 奖项 -->
      <div
        v-if="movie.awards_total_count"
        class="award-icon"
        @click="$router.push(`${movie.id}/awards`)"
      >
        <img class="honour-icon" src="~images/honour-cup.png" />
      </div>

      <h1 class="title" v-html="movie.title"></h1>

      <h3 class="subtitle" v-html="movie.title_original">
        {{ movie.title_original }}
      </h3>

      <div
        class="info-brief"
        :class="{ 'is-episode': isEpisode }"
        @click="$router.push(`/movies/${movie.id}/detail`)"
      >
        <div class="info-list genre">{{ movie.genres }}</div>
        <div class="info-list">
          <span>{{ movie.countries }}</span>
          <em v-if="movie.year">·</em>
          <span>{{ movie.year }}</span>
          <em v-if="movie.durations && !isEpisode">·</em>
          <span v-if="!isEpisode">{{ movie.durations }}</span>
        </div>
        <!-- 剧集 -->
        <div class="info-list" v-if="isEpisode">
          <span>共{{ movie.episode_count }}集</span><em>·</em
          ><span>每集{{ movie.durations }}分钟</span>
        </div>
      </div>

      <!-- 想看/评分 -->
      <template v-if="!loading">
        <div class="btn-group" v-if="!movie.is_rating">
          <div
            class="btn"
            :class="{ 'is-wish': movie.is_wish }"
            @click="userMovieWish()"
          >
            <i class="iconfont icon-love"></i>
            {{ movie.is_wish ? "已想看" : "想看" }}
          </div>

          <!-- 未上映的不可选看过 -->
          <div
            v-if="movie.release_status !== 1"
            class="btn"
            @click="$router.push(`/movies/${movie.id}/rating/create`)"
          >
            <i class="iconfont icon-star-fill"></i>
            看过
          </div>
        </div>

        <!-- 已评分 -->
        <div
          class="btn-group has-rating"
          v-else
          @click="$router.push(`/movies/${movie.id}/rating/create?type=edit`)"
        >
          <span>已看过</span>
          <m-rate
            v-model="movie.my_rating.rating"
            :step="2"
            :max="10"
            :size="24"
            allow-half
            readonly
          />
          <time>{{ movie.my_rating.created_date }}</time>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieInfo",
  props: {
    movie: {
      require: true,
      type: Object,
    },
    loading: {
      type: Boolean,
    },
  },

  computed: {
    isEpisode() {
      return this.movie.episode_count > 0;
    },
    poster() {
      return typeof this.movie.poster === "object"
        ? this.movie.poster.small
        : this.movie.poster;
    },
  },

  methods: {
    userMovieWish() {
      this.$emit("wish-change");
    },
  },
};
</script>

<style scoped lang="scss">
.movie-info-wrapper {
  display: flex;
  padding: 20px;
  overflow: hidden;
  .movie-poster {
    width: 192px;
    height: 268px;
    border-radius: 4px;
    overflow: hidden;
    background-color: rgba(#f5f5f5, 0.45);
    box-shadow: 5px 5px 10px rgba(#000, 0.25);
    .poster {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .movie-info {
    position: relative;
    margin-left: 25px;
    flex: 1;
    color: rgb(176, 179, 187);
    .award-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      position: absolute;
      right: -20px;
      top: 0;
      padding-right: 20px;
      width: 72px;
      height: 52px;
      border-radius: 50px 0 0 50px;
      background-color: rgba(#000000, 0.35);
      box-shadow: 0 4px 4px rgba(#000000, 0.15);
      &::after {
        content: "";
        z-index: -1;
        position: absolute;
        left: 2px;
        top: 2px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: rgba(#000000, 0.45);
      }
      img {
        width: 32px;
        height: 32px;
      }
    }
    .title {
      margin: 3px 0;
      line-height: 44px;
      font-size: 36px;
      color: #fff;
      font-weight: bold;
    }
    .subtitle {
      padding: 4px 0;
      line-height: 34px;
      font-size: 28px;
      color: #e3e3e3;
    }
    .info-brief {
      margin-top: 12px;
      min-height: 104px;
      line-height: 46px;
      color: #fff;
      &.is-episode {
        margin-top: 8px;
        line-height: 34px;
      }
      .info-list {
        font-size: 24px;
        > em {
          margin: 0 2px;
        }
      }
    }

    .btn-group {
      display: flex;
      margin-top: 12px;
      justify-content: space-between;
      &.has-rating {
        padding: 0 20px;
        height: 52px;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        color: #fff;
        .m-rate {
          flex: 1;
          margin-left: 20px;
        }
        time {
          float: right;
          color: #e5e5e5;
        }
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 226px;
        height: 52px;
        line-height: 52px;
        text-align: center;
        color: #fff;
        border-radius: 8px;
        background-color: rgba(#000, 0.25);
        .iconfont {
          font-size: 24px;
          margin-right: 8px;
        }
        &.is-wish {
          color: rgba(255, 255, 255, 0.35);
          background-color: rgba(105, 108, 123, 0.35);
        }
      }
    }
  }
}
</style>