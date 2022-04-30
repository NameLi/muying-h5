<template>
  <page bgcolor="#f5f5f5">
    <header-bar title="影评" />

    <div class="review-header" :class="{ 'is-hidden': total === 0 }">
      <div class="review-count">影评 {{ total }}</div>
      <div class="review-type" v-if="total">
        <tab-switch @change="onChange" :disabled="loading" />
      </div>
    </div>

    <div class="review-list" v-infinite-scroll="loadMore">
      <review-item v-for="review in list" :review="review" :key="review.id" />
      <m-loadmore v-if="!noData" :loading="loading" />

      <div v-if="noData" class="no-review-container">
        <div class="no-review">
          <p>还没有影评</p>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import { getMovieReviews } from "@/api/movie";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "MovieReviews",

  mixins: [getInfiniteData],

  props: ["id"],

  data() {
    return {
      isFisrt: true,
      form: {
        sortby: "hot",
      },
    };
  },

  methods: {
    onChange(value) {
      if (this.form.sortby === value) return;

      this.form.sortby = value;
      this.page = 1;
      this.list = [];

      this.loadMore();
    },

    loadMore() {
      // 在页面切换动画中渲染列表真机上会有卡顿，故做延迟处理
      if (this.page === 1 && this.isFisrt) {
        setTimeout(() => {
          this.isFisrt = false;
          this.getData(getMovieReviews, this.id);
        }, 200);
      } else {
        this.getData(getMovieReviews, this.id);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.skeleton {
  z-index: 3;
  position: fixed;
  left: 0;
  top: 100px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
}
.review-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100vw;
  height: 80px;
  font-size: 28px;
  box-shadow: 0 0 6px #ccc;
  background-color: #fff;
  &.is-hidden {
    visibility: hidden;
  }
  .review-count {
    font-weight: bold;
  }
  .review-type {
    z-index: 2;
    position: relative;
  }
}
.review-list {
  padding-top: 5px;
  background-color: #f5f5f5;
  -webkit-overflow-scrolling: touch;
}
.no-review-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  .no-review {
    color: #aaa;
    font-size: 28px;
  }
}
</style>