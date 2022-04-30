<template>
  <div class="container">
    <!-- 加载动画 -->
    <video-list-skeleton v-if="loading" />

    <!-- 播放器 -->
    <player ref="player" :show-player="showPlayer" />

    <!-- 视列表 -->
    <div id="videoWrapper" v-infinite-scroll="loadMore">
      <video-card
        v-for="video in list"
        :video="video"
        :key="video.id"
        @on-play="playVideo"
      />

      <m-loadmore :loading="loading" />
    </div>
  </div>
</template>


<script>
import { getVideos } from "@/api/video";
import { getInfiniteData } from "@/mixins/getInfiniteData";
import player from "@/components/Player/index";
import VideoCard from "./components/VideoCard";
import VideoListSkeleton from "./components/VideoListSkeleton";

export default {
  name: "Videos",

  mixins: [getInfiniteData],

  components: {
    player,
    VideoCard,
    VideoListSkeleton,
  },

  data() {
    return {
      currentVideoId: null, // 当前播放视频ID
      showPlayer: false,
      video: {},
      isLock: false,
      per_page: 10,
      playEl: null,
    };
  },

  activated() {
    this.isLock = false;

    this.playEl = this.$refs.player.$el;

    window.addEventListener("scroll", this.scrollHandle);
  },

  deactivated() {
    this.isLock = true;
    window.removeEventListener("scroll", this.scrollHandle);
  },

  methods: {
    // 监听滚动
    scrollHandle() {
      const playElRect = this.playEl.getBoundingClientRect();

      const top = playElRect.top;
      const height = playElRect.height;

      if (top < -height) {
        if (this.$refs.player.paused) return;
        this.$refs.player.handelPaused();
      }
    },

    loadMore() {
      if (this.isLock) return;

      this.getData(getVideos);
    },

    // 播放视频
    playVideo({ video }) {
      if (video.id == this.currentVideoId) return;

      this.currentVideoId = video.id;

      this.showPlayer = false;

      let playerEl = document.querySelector("#player_" + video.id);
      playerEl.appendChild(this.$refs.player.$el);

      setTimeout(() => {
        this.showPlayer = true;
        this.$refs.player.play(video);
      }, 350);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  margin: 30px 0;
}
</style>