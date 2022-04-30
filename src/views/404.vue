<template>
  <div class="container">
    <header-bar title="404" />
    <div class="main">404</div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped lang="scss">
.container {
  .main {
    text-align: center;
    line-height: calc(100vh - 100px);
    font-size: 56px;
  }
}
</style>