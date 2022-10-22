<template>
  <div class="container">
    <movie-skeleton v-if="isShowSkeleton" />

    <nav-group @on-change="searchChange" />

    <div class="main" v-infinite-scroll="loadMore">
      <movie-row v-for="movie in list" :movie="movie" :key="movie.id" />
    </div>

    <m-loadmore :loading="loading" />
  </div>
</template>

<script>
import MovieSkeleton from "./components/MovieSkeleton";
import NavGroup from "./components/NavGroup";
import MovieRow from "./components/MovieRow";
import { getMovies } from "@/api/movie";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "Movies",

  mixins: [getInfiniteData],

  components: {
    MovieSkeleton,
    NavGroup,
    MovieRow,
  },

  data() {
    return {
      per_page: 21,
      isLock: false,
    };
  },

  activated() {
    setTimeout(() => {
      this.isLock = false;
    }, 0)
  },

  deactivated() {
    this.isLock = true;
  },

  methods: {
    // 选择类型
    searchChange(form) {
      this.list = [];
      this.page = 1;
      this.loading = false;
      this.noMoreData = false;
      this.form = form;
      this.loadMore();
    },

    loadMore() {
      if (this.isLock) return;

      this.getData(getMovies);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  .main {
    padding: 20px 15px 0;
  }
}
</style>
