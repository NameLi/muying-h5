<template>
  <page>
    <header-bar title="幕后知识" />

    <skeleton v-if="isShowSkeleton" />

    <div class="list" v-infinite-scroll="loadMore">
      <div
        class="item border_bottom"
        v-for="item in list"
        :key="item.id"
        v-html="item.content"
      ></div>

      <m-loadmore :loading="loading" />
    </div>
  </page>
</template>

<script>
import { getMovieKnowledges } from "@/api/movie";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "Knowledge",

  mixins: [getInfiniteData],

  props: ["id"],

  methods: {
    loadMore() {
      this.getData(getMovieKnowledges, this.id);
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  padding: 0 30px 30px;
  .item {
    padding: 26px 0;
    line-height: 1.6;
    font-size: 28px;
    text-align: justify;
    white-space: pre-line;
  }
}
</style>