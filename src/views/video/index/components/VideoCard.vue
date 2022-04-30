<template>
  <div class="video-item">
    <!-- 视频信息 -->
    <div
      :id="'player_' + video.id"
      class="video-content"
      :class="{ 'is-play': video.isPlaying }"
      @click="doPlay($event)"
    >
      <div class="video-title">{{ video.title }}</div>

      <img class="video-poster" v-lazy="video.poster" />

      <div class="video-play">
        <i class="iconfont icon-play"></i>
      </div>

      <div class="video-info">
        <div class="video-plays">{{ video.play_count }} 次播放</div>
        <div class="video-duration">{{ video.duration | timeFormat }}</div>
      </div>
    </div>

    <!-- 作者与评论 -->
    <div class="video-bottom" @click="$router.push(`/videos/${video.id}`)">
      <div class="video-author" v-if="author">
        <img class="author-avatar" v-lazy="author.avatar" />
        <div class="author-name">{{ author.username }}</div>
      </div>

      <div class="video-tool">
        <div class="tool-item">
          <i class="iconfont icon-like"></i>
          <span>{{ video.like_count }}</span>
        </div>
        <div class="tool-item">
          <i class="iconfont icon-comment"></i>
          <span>{{ video.comment_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoCard",

  props: {
    video: {
      type: Object,
    },
  },

  computed: {
    author() {
      return this.video?.author;
    },
  },

  methods: {
    doPlay($event) {
      this.$emit("on-play", {
        video: this.video,
        event: $event,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.video-item {
  .video-content {
    position: relative;
    margin: 0 20px;
    height: calc(56.25vw - 20px);
    color: #fff;
    border-radius: 6px;
    overflow: hidden;
    .video-title {
      z-index: 1;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      padding: 20px;
      font-size: 32px;
      line-height: 1.6;
      background-image: linear-gradient(
        rgba(0, 0, 0, 0.45),
        rgba(255, 255, 255, 0)
      );
    }
    .video-poster {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .video-play {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.35);
      transform: translate(-50%, -50%);
      .m-icon {
        font-size: 48px;
      }
    }
    .video-info {
      z-index: 1;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      background-image: linear-gradient(
        rgba(255, 255, 255, 0),
        rgba(0, 0, 0, 0.45)
      );
    }
  }

  //
  .video-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 88px;
    // 作者
    .video-author {
      display: flex;
      align-items: center;
      .author-avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #f5f5f5;
      }
      .author-name {
        margin-left: 12px;
        font-weight: bold;
      }
    }

    // 视频数据
    .video-tool {
      display: flex;
      align-items: center;
      .tool-item {
        display: flex;
        align-items: center;
        margin-left: 20px;
        height: 56px;
        .m-icon {
          font-size: 28px;
        }
        > span {
          margin: 0 8px;
          font-size: 24px;
        }
      }
    }
  }
}
</style>