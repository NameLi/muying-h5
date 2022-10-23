<template>
  <div class="container">
    <header-bar title="相关视频" />

    <!-- skeleton -->
    <skeleton v-if="loading" />

    <!-- 影视信息 -->
    <movie-card :movie="movie" />

    <!-- 分类 -->
    <m-navbar-group
      line-color="#ffbe10"
      active-color="#ffbe10"
      active-name="trailer"
      @change="typeChange"
    >
      <m-navbar
        v-for="v in videos"
        :title="v.type"
        :name="v.type_en"
        :key="v.type_en"
      />
    </m-navbar-group>

    <!-- 详情 -->
    <div class="video-list">
      <video-item v-for="video in videoList" :key="video.id" :video="video" />
    </div>
  </div>
</template>

<script>
import { getMovieVideos } from "@/api/movie";

export default {
  name: "MovieVideos",

  props: ["id"],

  data() {
    return {
      loading: false,
      videos: [],
      movie: {},
      currentTypeEn: "trailer",
    };
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
    this.getMovieVideos();
  },

  methods: {
    typeChange(type) {
      this.currentTypeEn = type;
    },

    async getMovieVideos() {
      this.loading = true;
      let res = await getMovieVideos(this.id);
      this.loading = false;

      if (res.code === 200) {
        this.movie = res.data.movie;
        this.videos = res.data.videos;
      }
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .m-tabs__wrap {
  border-bottom: 1px solid #e5e5e5;
  .m-tabs__line {
    height: 8px !important;
  }
  .m-tabs__nav {
    display: block;
    .m-tab-item {
      display: inline-block;
      font-weight: bold;
      .m-tab-item__text {
        transition: all 0.2s;
      }
    }
  }
}
</style>