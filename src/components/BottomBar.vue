<template>
  <div class="tabbar-wrapper">
    <ul class="tabbar">
      <router-link custom to="/home" v-slot="{ isActive, navigate }">
        <li
          class="tab-item"
          :class="{ 'is-active': isActive }"
          @click="navigate"
        >
          <i class="tab-icon iconfont icon-home"></i>
          <div class="tab-label">首页</div>
        </li>
      </router-link>

      <router-link custom to="/movies" v-slot="{ isActive, navigate }">
        <li
          class="tab-item"
          :class="{ 'is-active': isActive }"
          @click="navigate"
        >
          <i class="tab-icon iconfont icon-movie-fill"></i>
          <div class="tab-label">分类</div>
        </li>
      </router-link>

      <router-link custom to="/videos" v-slot="{ isActive, navigate }">
        <li
          class="tab-item"
          :class="{ 'is-active': isActive }"
          @click="navigate"
        >
          <i class="tab-icon iconfont icon-video-fill"></i>
          <div class="tab-label">短片</div>
        </li>
      </router-link>

      <router-link custom to="/profile" v-slot="{ isActive, navigate }">
        <li
          class="tab-item"
          :class="{ 'is-active': isActive }"
          @click="navigate"
        >
          <i class="tab-icon iconfont icon-user"></i>
          <div class="tab-label">我的</div>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BottomBar",
};
</script>

<style scoped lang="scss">
.tabbar-wrapper {
  height: 100px;
  .tabbar {
    display: flex;
    z-index: 91;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    border-top: 1px solid #eee;
    background-color: #fff;
    .tab-item {
      flex: 1;
      text-align: center;
      color: #b7bac3;
      transition: all 0.2s;
      .tab-icon {
        display: block;
        width: 100%;
        height: 60px;
        line-height: 70px;
        font-size: 48px;
      }
      .tab-label {
        height: 36px;
        line-height: 32px;
        font-size: 24px;
      }
      &.is-active {
        color: $color-theme;
      }
    }
  }
}
</style>