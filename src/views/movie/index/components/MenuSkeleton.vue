<template>
  <div class="skeleton-container">
    <div class="skeleton">
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item" style="width: 32%"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuSkeleton",
};
</script>

<style scoped lang="scss">
.skeleton-container {
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 280px;
  background-color: #fff;
}
.skeleton {
  margin: 0 20px;
  .skeleton-item {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    margin: 24px 0;
    height: 40px;
  }
}
</style>