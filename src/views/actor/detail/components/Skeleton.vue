<template>
  <div class="skeleton-wrapper" :class="{ 'is-half': isHalf }">
    <div class="skeleton">
      <div class="poster" v-if="!isHalf">
        <div class="title"></div>
      </div>

      <div class="info"></div>
      <div class="panel">
        <div class="panel-title"></div>
        <div class="panel-content">
          <div class="summary-item"></div>
          <div class="summary-item"></div>
          <div class="summary-item"></div>
          <div class="summary-item" style="width: 32%"></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title"></div>
        <div class="panel-content">
          <div class="panel-item" v-for="n in 6" :key="n"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Skeleton",
  props: {
    isHalf: {
      type: Boolean,
    },
  },
};
</script>

<style scoped lang="scss">
.skeleton-wrapper {
  z-index: 9;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 1);
  &.is-half {
    top: 460px;
  }
  .skeleton {
    top: 0;
    .poster {
      position: relative;
      height: 460px;
      background-color: #f5f5f5;
      .title {
        position: absolute;
        left: 20px;
        bottom: 26px;
        width: 42%;
        height: 32px;
        background-color: #fff;
      }
    }
    .info {
      margin: 20px;
      height: 150px;
      border-radius: 12px;
      background-color: #f5f5f5;
    }
    .panel {
      margin: 20px;
      padding: 25px 0;
      .panel-title {
        width: 24%;
        height: 32px;
        background-color: #f5f5f5;
      }
      .panel-content {
        margin-top: 20px;
        white-space: nowrap;
        overflow: hidden;
        .summary-item {
          margin-top: 12px;
          height: 32px;
          background-color: #f5f5f5;
        }
        .panel-item {
          display: inline-block;
          margin-right: 16px;
          width: 160px;
          height: 232px;
          border-radius: 12px;
          background-color: #f5f5f5;
        }
      }
    }
  }
}
</style>