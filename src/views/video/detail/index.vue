<template>
  <div class="container">
    <!-- 加载 -->
    <skeleton v-if="loading" />

    <!-- 返回 -->
    <div class="go-back" @click="$router.back()">
      <m-icon name="arrow-left" size="32" />
    </div>

    <!-- 视频播放器 -->
    <m-video :video="video" ref="video" />

    <!-- 视频信息 -->
    <video-info :video="video" />

    <!-- 所属影视 -->
    <div class="video-card">
      <movie-card :movie="video.movie" />
    </div>

    <!-- 视频纵向 -->
    <div class="video-list-wrapper">
      <div class="menu-list">
        <div
          class="menu-item"
          :class="{ 'is-active': v.type_en === currentTypeEn }"
          v-for="v in videos"
          :key="v.type_en"
          @click="typeChange(v.type_en)"
        >
          {{ v.type }} {{ v.count }}
        </div>
      </div>

      <div class="video-list" v-if="videoList.length">
        <video-item v-for="video in videoList" :key="video.id" :video="video" />
      </div>

      <no-data v-else content="暂无视频" />
    </div>

    <!-- tabbar -->
    <tool-bar type="videos" :data="video" />

    <transition name="layer">
      <router-view :video="video" />
    </transition>
  </div>
</template>

<script>
import MVideo from "./components/MVideo";
import VideoInfo from "./components/VideoInfo";
import Skeleton from "./components/Skeleton";
import { getVideo } from "@/api/video";
import { getMovieVideos } from "@/api/movie";

export default {
  name: "VideoDetail",

  components: {
    MVideo,
    VideoInfo,
    Skeleton,
  },

  props: ["id"],

  data() {
    return {
      loading: false,
      movieLoading: false,
      video: {
        movie: {},
        author: {},
        comment_count: 0,
      },
      videos: [],
      currentTypeEn: "trailer",
    };
  },

  watch: {
    id(val) {
      val && this.getVideo();
    },
  },

  computed: {
    videoList() {
      let currentType = this.videos.find(
        (v) => v.type_en === this.currentTypeEn
      );

      if (currentType) {
        return currentType["children"];
      } else {
        return [];
      }
    },
  },

  mounted() {
    this.getVideo();
    this.getMovieVideos();
  },

  methods: {
    // 视频详情
    async getVideo() {
      this.loading = true;
      const { code, data } = await getVideo(this.id);
      this.loading = false;

      if (code === 200) {
        this.video = data;

        this.$nextTick(() => {
          this.$refs.video.play();
        });
      }
    },

    // 关联视频
    async getMovieVideos() {
      this.movieLoading = true;
      const { code, data } = await getMovieVideos(1197950);
      this.movieLoading = false;

      if (code === 200) {
        this.movie = data.movie;
        this.videos = data.videos;
      }
    },

    typeChange(type) {
      this.currentTypeEn = type;
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  .go-back {
    z-index: 999;
    position: fixed;
    left: 20px;
    top: 30px;
    color: #fff;
  }
  .video-card {
    margin: 20px 30px;
  }
  .video-list-wrapper {
    .menu-list {
      z-index: 3;
      position: sticky;
      top: calc(100vw * 0.56);
      padding: 15px 30px 10px;
      height: 68px;
      box-sizing: content-box;
      display: flex;
      align-items: center;
      background-color: #fff;
      white-space: nowrap;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      .menu-item {
        flex-shrink: 0;
        margin-right: 20px;
        padding: 0 20px;
        height: 48px;
        line-height: 46px;
        border-radius: 100px;
        font-size: 24px;
        border: 1px solid rgba(#aaa, 0.35);
        white-space: nowrap;
        &.is-active {
          color: $color-theme;
          border: 1px solid rgba($color-theme, 0.35);
          background-color: rgba($color-theme, 0.15);
        }
      }
    }
  }
}
</style>