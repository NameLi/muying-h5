<template>
  <div class="menu-list">
    <div class="menu-item" @click="$router.push('/movies')">
      <div class="menu-icon iconfont icon-movie-fill"></div>
      <div class="menu-name">影视</div>
    </div>
    <div class="menu-item">
      <div class="menu-icon iconfont icon-user"></div>
      <div class="menu-name">影人</div>
    </div>
    <div class="menu-item">
      <div class="menu-icon iconfont icon-user"></div>
      <div class="menu-name">角色</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchMenu",
};
</script>

<style scoped lang="scss">
.menu-list {
  display: flex;
  justify-content: space-around;
  padding: 30px 30px;
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 10px;
    flex: 1;
    height: 150px;
    .menu-icon {
      width: 80px;
      height: 80px;
      line-height: 80px;
      border-radius: 50%;
      text-align: center;
      font-size: 44px;
      color: #fff;
      background-color: #dedede;
      box-shadow: 0 0 4px #aaa;
    }
    .menu-name {
      text-align: center;
      height: 60px;
      line-height: 60px;
      font-size: 24px;
    }
  }
}
</style>