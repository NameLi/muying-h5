<template>
  <div class="skeleton-container">
    <div class="skeleton">
      <div class="search"></div>

      <div class="swiper"></div>

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
  name: "HomeSkeleton",
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
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
}
.skeleton {
  z-index: 99;
  top: 0;
  .search {
    margin: 20px 20px;
    height: 60px;
    border-radius: 50px;
    background-color: #f5f5f5;
  }
  .swiper {
    margin: 20px;
    height: 380px;
    border-radius: 6px;
    background-color: #f5f5f5;
  }
  .menu {
    display: flex;
    justify-content: space-around;
    margin: 40px 20px 30px;
    padding: 20px;
    height: 160px;
    .menu-item {
      width: 80px;
      .menu-icon {
        width: 80px;
        height: 80px;
        border-radius: 6px;
        background-color: #f5f5f5;
      }
      .menu-name {
        margin-top: 20px;
        width: 80px;
        height: 20px;
        background-color: #f5f5f5;
      }
    }
  }
  .panel {
    margin: 55px 20px 30px;
    background-color: #fff;
    .panel-title {
      margin: 25px 20px 25px;
      height: 32px;
      background-color: #f5f5f5;
      width: 26%;
    }
    .panel-content {
      white-space: nowrap;
      margin-left: 20px;
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