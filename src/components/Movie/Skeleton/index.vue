<template>
  <div class="skeleton-wrapper" :style="{ top: top }">
    <div class="skeleton">
      <div class="skeleton-item" v-for="n in total" :key="n">
        <div class="skeleton-poster"></div>
        <div class="skeleton-info">
          <div class="title"></div>
          <div class="info-item"></div>
          <div class="info-item"></div>
          <div class="info-item" style="width: 40%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieSkeleton",
  props: {
    total: {
      type: Number,
      default: 8,
    },
    top: {
      type: String,
      default: "70px",
    },
  },
};
</script>

<style scoped lang="scss">
.skeleton-wrapper {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  right: 0;
  overflow: hidden;
  background-color: #fff;
}
.skeleton {
  animation: skeleton 1.3s ease-in-out infinite alternate;
}
@keyframes skeleton {
  from {
    opacity: 0.25;
  }
  to {
    opacity: 0.96;
  }
}
.skeleton-item {
  display: flex;
  padding: 16px 0;
  margin: 0 30px;
  height: 252px;
  .skeleton-poster {
    width: 164px;
    height: 220px;
    border-radius: 6px;
    background-color: #f5f5f5;
  }
  .skeleton-info {
    flex: 1;
    margin-left: 24px;
    .title {
      margin-bottom: 30px;
      height: 44px;
      background-color: #f5f5f5;
    }
    .info-item {
      margin-top: 16px;
      height: 28px;
      background-color: #f5f5f5;
    }
  }
}
</style>
