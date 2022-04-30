<template>
  <div class="skeleton-wrapper" :class="{ 'is-half': isHalf }" :style="style">
    <div class="skeleton skeleton-animation">
      <div class="movie-info" v-if="!isHalf">
        <div class="poster">
          <div class="img"></div>
        </div>
        <div class="info">
          <h1 class="title"></h1>
          <h3 class="subtitle"></h3>
          <div class="info-brief">
            <div class="info-item"></div>
            <div class="info-item" style="width: 32%"></div>
          </div>

          <div class="btn-group">
            <div class="btn"></div>
            <div class="btn"></div>
          </div>
        </div>
      </div>

      <!-- 评分 -->
      <div class="rating-container"></div>

      <!-- 简介 -->
      <div class="sunmmary">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line" style="width: 32%"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieSkeleton",
  props: {
    isHalf: {
      type: Boolean,
    },
    offsetTop: {},
  },

  computed: {
    style() {
      return this.isHalf ? `top: ${this.offsetTop}px` : "";
    },
  },
};
</script>


<style scoped lang="scss">
.skeleton-wrapper {
  z-index: 6;
  position: fixed;
  left: 0;
  top: 100px;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 5);
  &.is-half {
    top: 412px;
  }
  .space {
    height: 268px;
  }
  .rating-container {
    margin: 20px 20px 10px;
    height: 200px;
    border-radius: 12px;
    background-color: #f5f5f5;
  }
  .sunmmary {
    margin: 30px 20px 0;
    .line {
      height: 32px;
      margin-top: 12px;
      border-radius: 4px;
      background-color: #f5f5f5;
    }
  }
}
.skeleton {
  top: 0;
}
.movie-info {
  display: flex;
  padding: 20px;
  .poster {
    width: 192px;
    height: 268px;
    border-radius: 8px;
    background-color: #f5f5f5;
  }
  .info {
    position: relative;
    margin-left: 25px;
    flex: 1;
    .title {
      margin-top: 10px;
      height: 42px;
      background-color: #f5f5f5;
    }
    .subtitle {
      margin-top: 12px;
      height: 36px;
      background-color: #f5f5f5;
    }
    .info-brief {
      .info-item {
        margin-top: 12px;
        height: 32px;
        background-color: #f5f5f5;
      }
    }

    .btn-group {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .btn {
        width: 226px;
        height: 60px;
        border-radius: 8px;
        background-color: #f5f5f5;
      }
    }
  }
}
</style>