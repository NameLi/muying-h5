<template>
  <div class="container">
    <header-bar title="即将上映" />

    <!-- 加载骨架屏 -->
    <movie-skeleton v-if="isShowSkeleton" top="100px" />

    <!-- 内容区 -->
    <div class="main" v-infinite-scroll="loadMore">
      <!-- 标题 shadow -->
      <div class="group-title-holder"></div>

      <div class="group" v-for="group in groups" :key="group.date">
        <div class="group-title">
          {{ group.date }}
        </div>
        <div class="group-children">
          <movie-item
            v-for="movie in group.children"
            :key="movie.id"
            :movie="movie"
            is-coming
          />
        </div>
      </div>

      <m-loadmore :loading="loading" v-if="!isShowSkeleton" />
    </div>
  </div>
</template>

<script>
import { getMovieComing } from "@/api/api";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "Coming",

  mixins: [getInfiniteData],

  computed: {
    // 电影按日期分组
    groups() {
      let groups = [];
      this.list.map((movie) => {
        const gLen = groups.length;
        if (gLen && movie.release_date === groups[gLen - 1].date) {
          groups[gLen - 1].children.push(movie);
        } else {
          const group = {
            date: movie.release_date,
            children: [movie],
          };
          groups.push(group);
        }
      });

      return groups;
    },
  },

  methods: {
    loadMore() {
      this.getData(getMovieComing);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  .main {
    position: relative;
    .group-title-holder {
      z-index: 1;
      position: fixed;
      left: 0;
      top: 100px;
      right: 0;
      height: 80px;
      box-shadow: 0 2px 6px #cdcdcd;
      background-color: #fff;
    }
    .group {
      .group-title {
        z-index: 1;
        position: sticky;
        top: 100px;
        height: 80px;
        line-height: 80px;
        padding: 0 30px;
        font-size: 28px;
        font-weight: bold;
        background-color: #fff;
      }
    }
  }
}
</style>