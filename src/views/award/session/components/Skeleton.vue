<template>
  <div class="skeleton-container">
    <div class="skeleton">
      <div class="award-header">
        <div class="award-logo"></div>
        <div class="award-info">
          <h5 class="award-title"></h5>
          <div class="award-brief"></div>
          <div class="award-brief" style="width: 30%"></div>
        </div>
      </div>

      <div class="menu">
        <div class="menu-item" v-for="n in 4" :key="n">
          <div class="menu-icon"></div>
          <div class="menu-name"></div>
        </div>
      </div>

      <div class="panel" v-for="k in 3" :key="k">
        <div class="panel-title"></div>
        <div class="panel-content">
          <div class="row-item" v-for="n in 5" :key="n">
            <div class="row-poster"></div>
            <div class="row-name"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SessionSkeleton",
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.skeleton-container {
  z-index: 9;
  position: fixed;
  left: 0;
  top: 100px;
  right: 0;
  bottom: 0;
  background-color: #fff;
}
.skeleton {
  z-index: 99;
  top: 0;
  .award-header {
    display: flex;
    margin: 20px;
    padding: 20px;
    height: 160px;
    .award-logo {
      width: 100px;
      height: 100px;
      border-radius: 6px;
      background-color: #f5f5f5;
    }
    .award-info {
      margin-left: 20px;
      flex: 1;
      .award-title {
        height: 28px;
        background-color: #f5f5f5;
      }
      .award-brief {
        margin-top: 10px;
        height: 24px;
        background-color: #f5f5f5;
      }
    }
  }

  .panel {
    margin: 20px 40px;
    background-color: #fff;
    .panel-title {
      margin: 25px 0 25px;
      height: 32px;
      background-color: #f5f5f5;
      width: 26%;
    }
    .panel-content {
      white-space: nowrap;
      .row-item {
        display: inline-block;
        margin-right: 16px;
        width: 188px;
        .row-poster {
          width: 100%;
          height: 268px;
          border-radius: 6px;
          background-color: #f5f5f5;
        }
        .row-name {
          margin: 16px 0;
          height: 24px;
          background-color: #f5f5f5;
        }
      }
    }
  }
}
</style>