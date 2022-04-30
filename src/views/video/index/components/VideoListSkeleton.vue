<template>
  <div class="video-list-skeleton">
    <div class="skeleton-animation">
      <div class="video-skeleton-item" v-for="n in 3" :key="n">
        <div class="video-skeleton-cover"></div>
        <div class="video-skeleton-author"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoListSkeleton",
};
</script>

<style scoped lang="scss">
.video-list-skeleton {
  padding-top: 30px;
  z-index: 3;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  .video-skeleton-item {
    position: relative;
    margin: 0 20px;
    height: calc(56.25vw + 88px);
    .video-skeleton-cover {
      height: calc(56.25vw - 20px);
      border-radius: 6px;
      background-color: #f5f5f5;
    }
    .video-skeleton-author {
      margin-top: 20px;
      height: 48px;
      width: 36%;
      background-color: #f5f5f5;
    }
  }
}
</style>