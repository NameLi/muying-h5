<template>
  <div class="container">
    <header-bar title="那年今日" />

    <div class="menu-wrapper">
      <div
        class="menu"
        :class="{ 'is-active': form.sortby === 'hot' }"
        @click="typeChangeHandle('hot')"
      >
        热度排序
      </div>
      <div
        class="menu"
        :class="{ 'is-active': form.sortby === 'date' }"
        @click="typeChangeHandle('date')"
      >
        时间排序
      </div>
    </div>

    <!-- 加载骨架屏 -->
    <movie-skeleton v-if="isShowSkeleton" top="100px" />

    <div class="main" v-infinite-scroll="loadMore">
      <movie-item v-for="movie in list" :key="movie.id" :movie="movie" />
      <m-loadmore :loading="loading" v-if="!isShowSkeleton" />
    </div>
  </div>
</template>

<script>
import { getMovieToday } from "@/api/api";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "Today",

  mixins: [getInfiniteData],

  data() {
    return {
      form: {
        sortby: "hot",
      },
    };
  },

  methods: {
    typeChangeHandle(name) {
      this.form.sortby = name;
      this.page = 1;
      this.list = [];
      this.loadMore();
    },

    loadMore() {
      this.getData(getMovieToday);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  .menu-wrapper {
    z-index: 999;
    position: fixed;
    left: 0;
    top: 100px;
    display: flex;
    width: 100%;
    height: 90px;
    line-height: 90px;
    background: #fff;
    border-bottom: 1px solid #eee;
    .menu {
      flex: 1;
      text-align: center;
      font-size: 28px;
      &.is-active {
        color: $color-theme;
      }
    }
  }
  .main {
    padding-top: 90px;
  }
}
</style>