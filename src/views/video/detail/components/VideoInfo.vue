<template>
  <div class="video-info">
    <!-- 作者 -->
    <div class="author-wrapper">
      <div class="author">
        <img class="author-avatar" :src="author.avatar" />
        <div class="author-info">
          <span class="author-name">{{ author.username }}</span>
          <span class="author-video">上传视频 {{ author.video_count }} 个</span>
        </div>
      </div>
      <div class="report-btn" @click="showReportModal()">举报</div>
    </div>

    <div class="video-title">
      <h3>{{ video.title }}</h3>
      <div
        v-if="video.content"
        class="arrow-more"
        :class="{ 'is-show': isShowContent }"
        @click="isShowContent = !isShowContent"
      >
        <m-icon name="arrow-up" />
      </div>
    </div>

    <div class="info">
      <div class="created_at">发布于 {{ video.created_at }}</div>
      <div class="created_at">{{ video.play_count }} 次播放</div>
    </div>

    <m-collapse :visible="isShowContent" duraion="300">
      <div class="video-brief">{{ video.content }}</div>
    </m-collapse>

    <!-- 举报 -->
    <report ref="reportModal" />
  </div>
</template>

<script>
export default {
  name: "VideoInfo",
  props: {
    video: {
      type: Object,
    },
  },

  data() {
    return {
      isShowContent: false,
    };
  },

  computed: {
    author() {
      return this.video?.author;
    },
  },

  methods: {
    showReportModal() {
      this.$refs.reportModal.open(this.video.id, "videos");
    },
  },
};
</script>

<style scoped lang="scss">
.video-info {
  // padding: 20px 30px;
  .video-title {
    display: flex;
    align-items: center;
    padding: 20px 30px;
    line-height: 52px;
    letter-spacing: 2px;
    > h3 {
      flex: 1;
      font-size: 32px;
      font-weight: bold;
    }
    .arrow-more {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      transition: 0.2s;
      &.is-show {
        transform: rotate(180deg);
      }
      .m-icon {
        font-size: 28px !important;
        color: #999;
      }
    }
  }

  .info {
    padding: 0 30px;
    font-size: 24px;
    color: #999;
    display: flex;
    justify-content: space-between;
  }

  .video-brief {
    padding: 10px 30px;
    font-size: 24px;
    line-height: 36px;
    color: #999;
    text-align: justify;
  }
  .author-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px;
    height: 90px;
    font-size: 24px;
    color: #999;
    background-color: #f9f9f9;
    .author {
      display: flex;
      align-items: center;
      height: 60px;
      .author-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
      }
      .author-info {
        display: flex;
        flex-direction: column;
        margin-left: 18px;
        height: 60px;
        .author-name {
          color: #777;
          height: 32px;
          font-size: 28px;
          font-weight: 700;
        }
        .author-video {
          font-size: 20px;
          height: 28px;
          line-height: 36px;
        }
      }
    }
  }
}
</style>