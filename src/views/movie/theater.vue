<template>
  <div class="container">
    <header-bar title="正在热映" />

    <!-- 加载骨架屏 -->
    <movie-skeleton v-if="isShowSkeleton" top="60px" />

    <div class="main" v-infinite-scroll="loadMore">
      <movie-item v-for="movie in list" :movie="movie" :key="movie.id" />
      <m-loadmore :loading="loading" v-if="!isShowSkeleton" />
    </div>
  </div>
</template>

<script>
import { getMovieTheater } from "@/api/api";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "Theater",

  mixins: [getInfiniteData],

  methods: {
    loadMore() {
      this.getData(getMovieTheater);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  .main {
    margin-top: 15px;
  }
}
</style>