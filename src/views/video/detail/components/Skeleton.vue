<template>
  <div class="skeleton-wrap">
    <div class="skeleton skeleton-animation">
      <div class="skeleton-title"></div>

      <div class="skeleton-content"></div>
      <div class="skeleton-content" style="width: 24%"></div>

      <div class="video-item" v-for="n in 6" :key="n">
        <div class="video-content"></div>
        <div class="video-info">
          <div class="skeleton-content"></div>
          <div class="skeleton-content" style="width: 34%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Skeleton",
};
</script>

<style scoped lang="scss">
.skeleton-wrap {
  z-index: 99;
  position: fixed;
  left: 0;
  top: 56.25vw;
  right: 0;
  bottom: 0;
  padding-top: 25px;
  background-color: #fff;
  .skeleton {
    margin: 0 30px;
    top: 30px;
  }
  .skeleton-title {
    height: 34px;
    background-color: #f5f5f5;
    margin-bottom: 40px;
  }
  .skeleton-content {
    margin-bottom: 20px;
    height: 22px;
    background-color: #f5f5f5;
  }

  .video-item {
    display: flex;
    padding: 30px 0;
    border-bottom: 1px solid #f5f5f5;
    .video-content {
      border-radius: 4px;
      overflow: hidden;
      width: 236px;
      height: 132px;
      background-color: #f5f5f5;
    }
    .video-info {
      flex: 1;
      margin-left: 20px;
    }
  }
}
</style>