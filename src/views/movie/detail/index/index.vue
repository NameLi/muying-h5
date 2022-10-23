<template>
  <div class="container">
    <skeleton v-if="loading" :is-half="isHalf" :offset-top="infoHeight" />

    <!-- 吸顶头部 -->
    <header-scroll-bar
      ref="headerScrollBar"
      :poster="poster"
      :title="movie.title"
      :placeholder="movie.category"
      :bgcolor="movie.bgcolor"
    >
      <template v-slot:subtitle>
        <div class="is-coming" v-if="movie.release_status === 1">
          <span class="wish-count">{{ movie.wish_count }}</span>
          <span class="wish-label">人想看</span>
        </div>

        <div v-else-if="movie.rating">
          <m-rate
            v-model="movie.rating"
            :size="24"
            :step="2"
            :max="10"
            allow-half
            readonly
          />
          <span>{{ movie.rating }}</span>
        </div>
        <div class="movie-subtitle" v-else v-html="movie.title_original"></div>
      </template>

      <!-- 想看/评分 -->
      <div class="btn-group" v-if="!movie.is_rating">
        <div
          class="btn"
          :class="{ 'is-wish': movie.is_wish }"
          @click="wishChange()"
        >
          {{ movie.is_wish ? "已想看" : "想看" }}
        </div>
        <div
          v-if="movie.release_status !== 1"
          class="btn"
          @click="$router.push(`/movies/${movie.id}/rating/create`)"
        >
          看过
        </div>
      </div>

      <!-- 已评分 -->
      <div class="btn-group has-rating" v-else>
        <span>我评</span>
        <label>{{ movie.my_rating.rating }}分</label>
      </div>
    </header-scroll-bar>

    <!-- 基本信息 -->
    <div class="info-wrapper" :style="bgStyle">
      <!-- 基本信息 -->
      <movie-info
        :movie="movie"
        :loading="loading"
        ref="movieInfoRef"
        @wish-change="wishChange"
      />

      <!-- 评分 -->
      <movie-rating :movie="movie" />

      <!-- 标签 -->
      <div class="tag-list">
        <div class="tag" v-for="(tag, index) in movie.tags" :key="index">
          {{ tag }}
        </div>
      </div>

      <!-- 彩蛋 -->
      <div class="egg" v-if="movie.egg_hunt">
        <i class="iconfont icon-egg"></i>有{{
          movie.egg_hunt
        }}个彩蛋，不要错过哦~
      </div>

      <!-- 剧情 -->
      <m-panel title="剧情" :to="`/movies/${id}/detail`" v-if="movie.summary">
        <div class="summary" @click="$router.push(`/movies/${id}/detail`)">
          <div v-html="movie.summary"></div>
        </div>
      </m-panel>

      <!-- 演员 -->
      <m-panel
        v-if="movie.cast_count > 0"
        title="演员"
        :subtitle="`全部${movie.cast_count}`"
        :to="`/movies/${movie.id}/cast`"
      >
        <ul class="_common_section actor-list list-content">
          <actor-row
            v-for="actor in movie.cast"
            :key="actor.union_id"
            :actor="actor"
          />
        </ul>
      </m-panel>

      <!-- 角色 -->
      <m-panel
        v-if="movie.role_count > 0"
        title="角色"
        :subtitle="`全部${movie.role_count}`"
        :to="`/movies/${movie.id}/roles`"
      >
        <ul class="_common_section role-list list-content">
          <role-row v-for="role in movie.roles" :key="role.id" :role="role" />
        </ul>
      </m-panel>
    </div>

    <!-- 视频 -->
    <m-panel
      v-if="movie.video_count > 0"
      title="视频"
      :subtitle="`全部${movie.video_count}`"
      :to="`/movies/${movie.id}/videos`"
    >
      <div class="video-list">
        <video-row
          v-for="video in movie.videos"
          :key="video.id"
          :video="video"
        />
      </div>
    </m-panel>

    <!-- 相册 -->
    <m-panel
      v-if="movie.photo_count > 0"
      title="相册"
      :subtitle="`全部${movie.photo_count}`"
      :to="`/movies/${movie.id}/photos`"
    >
      <photo-wall :photos="movie.photos" />
    </m-panel>

    <!-- 奖项 -->
    <m-panel
      v-if="movie.awards_total_count > 0"
      title="奖项"
      :to="`/movies/${movie.id}/awards`"
    >
      <movie-award :movie="movie" />
    </m-panel>

    <!-- 资料 -->
    <m-panel title="资料" v-if="hasExtra">
      <movie-extra :movie="movie" />
    </m-panel>

    <!-- 系列 -->
    <m-panel
      v-if="movie.serial_count > 0"
      title="同一系列"
      :subtitle="`全部${movie.serial_count}`"
      :to="`/movies/${movie.id}/serials`"
    >
      <div>
        <serial-row
          v-for="serial in movie.serials"
          :key="serial.id"
          :serial="serial"
        />
      </div>
    </m-panel>

    <!-- 文章资讯 -->
    <m-panel
      v-if="movie.article_count > 0"
      title="文章资讯"
      :subtitle="`全部${movie.article_count}`"
      :to="`/movies/${movie.id}/articles`"
    >
      <div class="article-list">
        <article-item
          v-for="article in movie.articles"
          :key="article.id"
          :article="article"
        />
      </div>
    </m-panel>

    <!-- 相似 -->
    <m-panel title="相似影视" v-if="movie.like_movies.length > 0">
      <div>
        <movie-row
          v-for="movie in movie.like_movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </m-panel>

    <!-- 操作栏 -->
    <movie-bar :movie="movie" />

    <!-- 详情/收藏等 -->
    <transition :name="transition">
      <router-view
        :movie="movie"
        :loading="loading"
        @ratingChange="ratingChange"
        @favorite-update="favoriteUpdate"
      />
    </transition>
  </div>
</template>

<script>
import { getMovie } from "@/api/movie";
import { userMovieWish } from "@/api/user";

import MovieInfo from "./components/MovieInfo";
import MovieRating from "./components/MovieRating";
import PhotoWall from "./components/PhotoWall";
import SerialRow from "./components/SerialRow";
import MovieAward from "./components/MovieAward";
import MovieExtra from "./components/MovieExtra";
import MovieBar from "./components/MovieBar";
import Skeleton from "./components/Skeleton";

export default {
  name: "MovieDetail",
  components: {
    MovieInfo,
    MovieRating,
    PhotoWall,
    MovieAward,
    MovieExtra,
    MovieBar,
    SerialRow,
    Skeleton,
  },

  props: ["id"],

  data() {
    return {
      loading: false,
      detail: false,
      movie: {
        cast_count: 0,
        cast: [],
        review_count: 0,
        reviews: [],
        serial_count: 0,
        serials: [],
        like_movies: [],
        role_count: 0,
        roles: [],
        collection_count: 0,
        comment_count: 0,
        comments: [],
        video_count: 0,
        videos: [],
        photo_count: 0,
        photos: [],
        article_count: 0,
        articles: [],
        is_wish: false, // 是否想看
        is_collection: false,
      },
      infoHeight: 0,
      isShowSaveModal: true,
      check: false,
      wishLoading: false,

      transition: "slide-left", // 从下往上抽屉式 layer ，页面滑动slide-left
    };
  },

  computed: {
    isHalf() {
      const movie = this.$store.getters.getMovie;
      return movie && parseInt(this.id) === parseInt(movie.id);
    },
    poster() {
      return typeof this.movie.poster === "object"
        ? this.movie.poster.small
        : this.movie.poster;
    },
    bgStyle() {
      return `background: linear-gradient(35deg, ${this.movie.bgcolor}, ${this.movie.bgcolor}e0);`;
    },
    hasExtra() {
      return (
        this.movie.level_count ||
        this.movie.dialogue_count ||
        this.movie.knowledge_count ||
        this.movie.company_count
      );
    },
  },

  watch: {
    id: {
      handler() {
        const movie = this.$store.getters.getMovie;

        if (movie && parseInt(this.id) === movie.id) {
          this.movie = { ...this.$options.data().movie, ...movie };
          document.title = movie.title;
        } else {
          this.movie.category = "加载中...";
        }

        this.getMovie();

        this.$nextTick(() => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.$refs.headerScrollBar.getScrollTop();

          const headerH =
            this.$refs.headerScrollBar.$el.querySelector(
              ".header"
            ).offsetHeight;
          const InfoH = this.$refs.movieInfoRef.$el.offsetHeight;

          this.infoHeight = headerH + InfoH;
        });
      },
      immediate: true,
    },
  },

  beforeRouteUpdate(to, from, next) {
    const layerRouters = [
      "MovieFavorite",
      "MovieDetail",
      "MovieRating",
      "MovieRatingCreate",
      "MovieComment",
    ];

    if (layerRouters.includes(to.name)) {
      this.transition = "layer";
    } else {
      this.transition = "slide-left";
    }

    next();
  },

  activated() {
    const movie = this.$store.getters.getMovie;

    if (parseInt(this.id) === movie.id) {
      this.movie = { ...this.movie, ...movie };
      document.title = movie.title;
    }
  },

  methods: {
    ratingChange() {
      this.getMovie();
    },

    favoriteUpdate(data) {
      this.movie.collection_count = data.collection_count;
      this.movie.is_collection = data.is_collection;
    },

    // 获取影视信息
    async getMovie() {
      this.loading = true;
      const { code, data } = await getMovie(this.id);

      if (code === 200) {
        let movie = data;
        movie.akas = movie.akas.join(" / ");
        movie.countries = movie.countries.join(" / ");
        movie.genres = movie.genres.join(" / ");
        movie.durations = movie.durations.join(" / ");
        movie.languages = movie.languages.join(" / ");
        movie.pubdates = movie.pubdates.join(" / ");

        this.movie = Object.assign(this.$options.data().movie, movie);
        this.$store.commit("SET_MOVIE", this.movie);
        document.title = movie.title;
      }

      this.$nextTick(() => {
        this.loading = false;
      });
    },

    async wishChange() {
      if (this.wishLoading) return;

      this.wishLoading = true;
      const { code, data, message } = await userMovieWish(this.id);
      this.wishLoading = false;

      if (code === 200) {
        this.movie.is_wish = data.is_wish;
        this.movie.wish_count = data.wish_count;

        this.$message.success(message);
      }
    },
  },
};
</script>


<style scoped lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  .btn-group {
    display: flex;
    align-items: center;
    height: 100px;
    .btn {
      margin-left: 20px;
      padding: 0 10px;
      border-radius: 6px;
      height: 48px;
      line-height: 48px;
      background-color: rgba(#fff, 0.25);
      &.is-wish {
        color: rgba(#fff, 0.35);
        background-color: rgba(#fff, 0.1);
      }
    }
    &.has-rating {
      font-size: 24px;
      label {
        margin-left: 8px;
        color: #f7ba2a;
        font-weight: bold;
      }
    }
  }
  .is-coming {
    height: 40px;
    .wish-count {
      color: #f7ba2a;
      font-size: 28px;
      margin-right: 4px;
    }
    .wish-label {
      font-style: 20px;
    }
  }
  .article-list {
    .article-item {
      padding: 20px 0;
    }
  }
  .movie-subtitle {
    font-size: 24px;
    max-width: 360px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.info-wrapper {
  padding-top: 100px;
  padding-bottom: 10px;
  background-color: #232020;
  ::v-deep .panel {
    margin: 0;
    background-color: transparent;
    .panel-title span {
      color: #fff;
      &::before {
        display: none;
      }
    }
    .panel-more {
      color: #fff;
    }
  }
  .egg {
    margin: 30px 20px 0;
    color: #b0b3bb;
    font-size: 28px;
    .icon-egg {
      padding-right: 10px;
      font-size: 32px;
    }
  }
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    margin: 30px 20px 0;
    color: #f5f5f5;
    .tag {
      font-size: 24px;
      line-height: 56px;
      height: 56px;
      padding: 0 24px;
      margin: 0 16px 16px 0;
      border-radius: 28px;
      background: rgba(#fff, 0.1);
    }
  }
  .summary {
    white-space: normal;
    color: #f5f5f5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-align: justify;
    white-space: pre-wrap;
  }
  .actor-list {
    ::v-deep .actor-row {
      .actor-name {
        color: #fff;
      }
      .actor-label {
        color: rgba(#f5f5f5, 0.75);
      }
    }
  }
  .role-list {
    ::v-deep .role-row {
      .role-name {
        color: #fff;
      }
    }
  }
}
</style>
