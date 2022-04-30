<template>
  <div class="container">
    <header-bar title="收藏视频" />

    <div class="skeleton" v-if="isShowSkeleton">
      <skeleton />
    </div>

    <div class="list" v-infinite-scroll="loadMore">
      <video-item v-for="video in list" :key="video.id" :video="video" />
      <m-loadmore v-if="total" :loading="loading" />
      <no-data v-if="total === 0 && !loading" content="您还没有收藏任何视频" />
    </div>
  </div>
</template>

<script>
import { getUserCollection } from "@/api/user";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "CollectionVideo",

  mixins: [getInfiniteData],

  methods: {
    loadMore() {
      this.getData(getUserCollection, "videos");
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
  .skeleton {
    position: absolute;
    top: 100px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    background-color: #fff;
  }
}
</style>