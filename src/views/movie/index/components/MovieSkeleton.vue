<template>
  <div class="skeleton-container">
    <div class="skeleton">
      <div class="movie-row" v-for="k in 20" :key="k">
        <div class="poster-wrapper"></div>
        <h6 class="title"></h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieSkeleton",
};
</script>

<style scoped lang="scss">
.skeleton-container {
  z-index: 9;
  position: fixed;
  left: 0;
  top: 280px;
  right: 0;
  bottom: 0;
  background-color: #fff;
}
.skeleton {
  position: absolute;
  z-index: 1;
  top: 0;
  padding: 20px 15px 0;
  .movie-row {
    vertical-align: top;
    display: inline-block;
    margin: 0 10px;
    padding-bottom: 20px;
    width: 220px;
    box-sizing: border-box;
    .poster-wrapper {
      width: 100%;
      height: 320px;
      overflow: hidden;
      border-radius: 6px;
      background-color: #f5f5f5;
    }
    .title {
      margin-top: 12px;
      height: 32px;
      background-color: #f5f5f5;
    }
  }
}
</style>