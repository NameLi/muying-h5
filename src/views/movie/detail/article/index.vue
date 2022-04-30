<template>
  <div class="container">
    <header-bar title="文章资讯" />

    <div class="article-list" v-infinite-scroll="loadMore">
      <article-item
        v-for="article in list"
        :article="article"
        :key="article.id"
      />

      <m-loadmore :loading="loading" />
    </div>
  </div>
</template>

<script>
import { getMovieArticles } from "@/api/movie";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "MovieArticles",

  mixins: [getInfiniteData],

  props: ["id"],

  methods: {
    loadMore() {
      this.getData(getMovieArticles, this.id);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  .article-list {
    .article-item {
      margin-bottom: 20px;
    }
  }
}
</style>