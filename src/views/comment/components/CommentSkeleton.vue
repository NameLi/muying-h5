<template>
  <div class="skeleton-item">
    <div class="skeleton-header">
      <div class="author-avatar"></div>

      <div class="author-info">
        <div class="author-name"></div>
        <div class="author-rating"></div>
      </div>
    </div>

    <div class="skeleton-content"></div>
    <div class="skeleton-content"></div>
    <div class="skeleton-content" style="width: 24%"></div>
  </div>
</template>

<script>
export default {
  name: "CommentSkeleton",
};
</script>

<style scoped lang="scss">
.skeleton-item {
  position: relative;
  margin: 30px 20px;
  min-height: 200px;
  .skeleton-header {
    display: flex;
    align-items: center;
    height: 60px;
    .author-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #f5f5f5;
    }
    .author-info {
      margin-left: 20px;
      flex: 1;
      .author-name {
        height: 32px;
        width: 40%;
        background-color: #f5f5f5;
      }
    }
  }
  .skeleton-content {
    margin-top: 10px;
    margin-left: 80px;
    height: 22px;
    background-color: #f5f5f5;
  }
}
</style>