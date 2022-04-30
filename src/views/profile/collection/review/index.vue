<template>
  <div class="container">
    <header-bar title="收藏影评" />

    <div class="skeleton" v-if="isShowSkeleton">
      <skeleton />
    </div>

    <div class="list" v-infinite-scroll="loadMore">
      <review-item v-for="review in list" :review="review" :key="review.id" />
      <m-loadmore v-if="total" :loading="loading" />
      <no-data v-if="total === 0 && !loading" content="您还没有收藏任何影评" />
    </div>
  </div>
</template>

<script>
import { getUserCollection } from "@/api/user";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "SaveReview",

  mixins: [getInfiniteData],

  mounted() {
    this.$preventScroll(false);
  },

  methods: {
    loadMore() {
      this.getData(getUserCollection, "reviews");
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
  .review-list {
    ::v-deep .review {
      margin: 20px;
      border-radius: 10px;
    }
  }
}
</style>