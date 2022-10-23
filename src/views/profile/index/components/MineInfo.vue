<template>
  <div class="user-info-wrapper">
    <div class="user-info" v-if="user">
      <div class="user-avatar">
        <img :src="user.avatar" />

        <div
          v-if="user.gender === '男'"
          class="user-sex iconfont icon-boy"
        ></div>
        <div
          v-else-if="user.gender === '女'"
          class="user-sex iconfont icon-girl"
        ></div>
      </div>

      <div class="user-intro">
        <div class="user-name">{{ user.username }}</div>
        <div class="user-signature" v-if="user.signature">
          {{ user.signature }}
        </div>
      </div>
    </div>

    <div class="user-info" v-else>
      <div class="user-avatar">
        <img src="~images/logo.png" />
      </div>
      <div class="login-btn" @click="$router.push(`/login`)">立即登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MineInfo",
  props: {
    user: {
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.user-info-wrapper {
  position: relative;
  .icon-tool {
    position: absolute;
    right: 30px;
    top: 30px;
    width: 60px;
    text-align: center;
    color: #fff;
    font-size: 40px;
  }
  .icon-news {
    right: 100px;
  }
}
.user-info {
  padding: 0 30px;
  height: 370px;
  position: relative;
  background-color: $color-theme;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  .user-avatar {
    position: relative;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    box-shadow: 0 0 0 3px #fff;
    background-color: #fff;
    > img {
      width: 110px;
      height: 110px;
      object-fit: cover;
      border-radius: 50%;
    }
    .user-sex {
      position: absolute;
      right: 0px;
      bottom: 0px;
      font-size: 24px;
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 50%;
      background-color: #fff;
      &.icon-boy {
        color: #409eff;
      }
      &.icon-girl {
        color: #f56c6c;
      }
    }
  }
  .user-intro {
    flex: 1;
    margin-left: 26px;
    color: #fff;
    .user-name {
      font-size: 36px;
      font-weight: 600;
    }
    .user-signature {
      margin-top: 5px;
      color: #eee;
    }
  }
  .login-btn {
    margin-left: 20px;
    color: #fff;
    font-size: 32px;
    padding: 20px;
  }
}
</style>