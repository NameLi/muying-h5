<template>
  <div class="skeleton">
    <div class="title"></div>
    <div class="author">
      <div class="avatar"></div>
      <div class="username"></div>
    </div>
    <div class="content">
      <div class="line" v-for="n in 6" :key="n"></div>
      <div class="line" style="width: 40%"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Skeleton",
};
</script>

<style scoped lang="scss">
.skeleton {
  top: 100px;
  padding: 30px;
  .title {
    height: 48px;
    background-color: #f5f5f5;
  }
  .author {
    display: flex;
    align-items: center;
    margin: 40px 0;
    height: 80px;
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #f5f5f5;
    }
    .username {
      margin-left: 26px;
      height: 36px;
      width: 300px;
      background-color: #f5f5f5;
    }
  }
  .content {
    margin-top: 20px;
    .line {
			margin-top: 20px;
      height: 36px;
      background-color: #f5f5f5;
    }
  }
}
</style>