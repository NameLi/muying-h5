<template>
  <div class="video-item" @click="pathToVideo()">
    <div class="video-content">
      <img class="video-poster" v-lazy="video.poster" />
      <div class="video-is--play" v-if="isPlaying">
        <span>播放中</span>
      </div>
      <div class="video-duration">{{ video.duration | timeFormat }}</div>
    </div>
    <div class="video-info">
      <h6 class="video-title">{{ video.title }}</h6>
      <!-- <div class="video-author"></div> -->
      <div class="video-tool">
        <div class="video-tool-item">
          {{ video.like_count }}赞 · {{ video.play_count }}播放
        </div>
        <div class="video-tool-item">{{ video.created_at | dateBefore }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoItem",

  props: {
    video: {
      type: Object,
    },
  },

  computed: {
    isPlaying() {
      return this.$parent.video?.id === this.video.id;
    },
  },

  methods: {
    pathToVideo() {
      if (this.isPlaying) return;

      // 播放页面只调整本页面
      if (this.$route.name === "Video") {
        this.$router.replace(`/videos/${this.video.id}`);
      } else {
        this.$router.push(`/videos/${this.video.id}`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.video-item {
  display: flex;
  padding: 30px;
  border-bottom: 1px solid #f5f5f5;
  background-color: #fff;
  .video-content {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    .video-poster {
      width: 236px;
      height: 132px;
      object-fit: cover;
      background-color: #f7f7f7;
    }
    .video-is--play {
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      line-height: 132px;
      text-align: center;
      color: #fff;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.45);
    }
    .video-duration {
      z-index: 2;
      position: absolute;
      right: 6px;
      bottom: 6px;
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      text-align: center;
      color: #f5f5f5;
      font-size: 20px;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.15);
    }
  }
  .video-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    .video-title {
      height: 46px;
      line-height: 46px;
      font-size: 28px;
      font-weight: bold;
    }
    .video-tool {
      display: flex;
      justify-content: space-between;
      font-size: 24px;
      color: #999;
    }
  }
}
</style>