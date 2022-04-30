<template>
  <div class="video-item">
    <!-- <div class="video-header">
      <div class="video-type">{{ video.type }}</div>
    </div> -->
    <img class="video-poster" v-lazy="video.poster">
    <div class="video-footer">{{ video.title }}</div>
  </div>
</template>

<script>
export default {
  name: "VideoRow",
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.video-item {
  display: inline-block;
  position: relative;
  margin-right: 16px;
  width: 310px;
  height: 180px;
  border-radius: 4px;
  overflow: hidden;
  .video-header {
    position: absolute;
    left: 0;
    top: 0;
    .video-type {
      height: 30px;
      line-height: 30px;
      padding: 0 12px;
      font-size: 20px;
      color: #fff;
      border-radius: 0 0 4px 0;
      background-color: rgba(255, 180, 0, 0.85);
    }
  }
  .video-poster {
    width: 310px;
    height: 180px;
    object-fit: cover;
    background-color: #f7f7f7;
  }
  .video-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 0 16px;
    height: 52px;
    line-height: 52px;
    color: #fff;
    font-size: 24px;
    background-image: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.3) 100%);
  }
}
</style>