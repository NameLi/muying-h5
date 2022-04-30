<template>
  <div class="video-row">
    <div class="video-content">
      <img class="video-poster" v-lazy="video.poster" />
      <!-- <div class="s_shadow">
      <span>播放中</span>
    </div> -->
      <div class="video-duration">{{ video.duration | timeFormat }}</div>
    </div>

    <h6 class="video-title">{{ video.title }}</h6>
  </div>
</template>

<script>
export default {
  name: "VideoRow",

  props: {
    video: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
.video-row {
  display: inline-block;
  vertical-align: top;
  position: relative;
  margin: 0 8px;
  width: 270px;
  .video-content {
    position: relative;
    border-radius: 4px;
		overflow: hidden;
    .video-poster {
      width: 270px;
      height: 150px;
      background-color: #f7f7f7;
    }
    .video-duration {
      z-index: 2;
      position: absolute;
      right: 2px;
      bottom: 2px;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      text-align: center;
      color: #fff;
      font-size: 24px;
    }
  }
	.video-title {
		height: 46px;
		line-height: 46px;
    font-size: 28px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

.s_shadow {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  z-index: 1;
  background: rgba(0, 0, 0, 0.75);
  text-align: center;
  line-height: 150px;
}
.s_shadow span {
  font-size: 24px;
  color: #fff;
}
</style>