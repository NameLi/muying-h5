<template>
  <div class="menu-list">
    <div class="menu-item" @click="pathTo('actors')">
      <div class="menu-count">{{ count.actor_count }}</div>
      <div class="menu-name">关注影人</div>
    </div>
    <div class="menu-item" @click="pathTo(`roles`)">
      <div class="menu-count">{{ count.role_count }}</div>
      <div class="menu-name">关注角色</div>
    </div>
    <div class="menu-item" @click="pathTo(`reviews`)">
      <div class="menu-count">{{ count.review_count }}</div>
      <div class="menu-name">收藏影评</div>
    </div>
    <div class="menu-item" @click="pathTo(`videos`)">
      <div class="menu-count">{{ count.video_count }}</div>
      <div class="menu-name">收藏视频</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MineMenu",
  props: {
    count: {
      type: Object,
      required: true,
    },
    isLogin: {
      type: Boolean,
    },
  },
  methods: {
    pathTo(type) {
      if (this.isLogin) {
        this.$router.push(`/profile/${type}`);
      } else {
        this.$router.push(`/login`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.menu-list {
  z-index: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px;
  margin-top: -80px;
  height: 160px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 6px 6px #eee;
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    .menu-count {
      height: 64px;
      line-height: 64px;
      text-align: center;
      color: $color-theme;
      font-size: 40px;
    }
    .menu-name {
      margin-top: 16px;
      font-size: 24px;
      font-weight: bold;
      color: #666;
    }
  }
}
</style>