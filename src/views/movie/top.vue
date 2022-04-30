<template>
  <div class="container">
    <header-bar title="TOP 100" />

    <!-- 加载骨架屏 -->
    <movie-skeleton v-if="isShowSkeleton" top="65px" />

    <div class="main" v-infinite-scroll="loadMore">
      <movie-item
        v-for="(movie, index) in list"
        :movie="movie"
        :index="index + 1"
        :key="movie.id"
      />

      <m-loadmore :loading="loading" v-if="!isShowSkeleton" />
    </div>
  </div>
</template>

<script>
import { getMovieTop } from "@/api/api";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "Top",

  mixins: [getInfiniteData],

  methods: {
    loadMore() {
      this.getData(getMovieTop);
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