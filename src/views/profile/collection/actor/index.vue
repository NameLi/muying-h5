<template>
  <div class="container">
    <header-bar title="关注影人" />

    <movie-skeleton style="margin-top: -20px" v-if="isShowSkeleton" />

    <div class="list" v-infinite-scroll="loadMore">
      <actor-item v-for="actor in list" :actor="actor" :key="actor.id" />

      <m-loadmore v-if="total" :loading="loading" />

      <no-data v-if="total === 0 && !loading" content="您还没有关注任何影人" />
    </div>
  </div>
</template>

<script>
import { getUserCollection } from "@/api/user";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "CollectionActor",

  mixins: [getInfiniteData],

  methods: {
    loadMore() {
      this.getData(getUserCollection, "actors");
    },
  },
};
</script>