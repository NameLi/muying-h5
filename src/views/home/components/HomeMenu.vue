<template>
  <div class="nav-wrapper">
    <ul class="nav-list">
      <li class="nav-item" @click="$router.push('/theater')">
        <i class="iconfont icon-video"></i>
        <label>热映中</label>
      </li>
      <li class="nav-item" @click="$router.push('/top')">
        <i class="iconfont icon-level"></i>
        <label>高分榜</label>
      </li>
      <li class="nav-item" @click="$router.push('/awards')">
        <i class="iconfont icon-trophy"></i>
        <label>奖项</label>
      </li>
      <li class="nav-item" @click="$router.push('/today')">
        <i class="iconfont icon-date"></i>
        <label>那年今日</label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HomeMenu",
};
</script>

<style scoped lang="scss">
.nav-wrapper {
  position: relative;
  margin: 20px;
  padding: 40px 0 20px;
  background-color: #fff;
  border-radius: 12px;
  .nav-list {
    display: flex;
    .nav-item {
      flex: 1;
      text-align: center;
      i {
        display: inline-block;
        width: 80px;
        height: 80px;
        line-height: 80px;
        font-size: 44px;
        border-radius: 12px;
      }
      label {
        display: block;
        margin-top: 12px;
        font-size: 24px;
        height: 40px;
        line-height: 40px;
      }
      &:nth-child(1) > i {
        color: #f8a52d;
        background: rgba(#f8a52d, 0.15);
      }
      &:nth-child(2) > i {
        color: #ff4f4d;
        background: rgba(#ff4f4d, 0.15);
      }
      &:nth-child(3) > i {
        color: #41acff;
        background: rgba(#41acff, 0.15);
      }
      &:nth-child(4) > i {
        color: #916dff;
        background: rgba(#916dff, 0.15);
      }
    }
  }
}
</style>