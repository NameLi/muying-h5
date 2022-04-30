<template>
  <page>
    <header-bar title="影人作品" />

    <movie-skeleton class="works-skeleton" v-if="isShowSkeleton" />

    <div class="works-header">
      <div class="works-count">作品 {{ total }}</div>
      <div class="works-type" v-if="total">
        <tab-switch
          v-if="visible"
          @change="onChange"
          :tabs="tabs"
          :disabled="loading"
        />
      </div>
    </div>

    <div
      class="works-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-distance="20"
    >
      <movie-row v-for="movie in list" :key="movie.id" :movie="movie" />

      <m-loadmore :loading="loading" v-if="!isShowSkeleton" />
    </div>
  </page>
</template>

<script>
import { getActorWorks } from "@/api/actor";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "ActorWorks",

  mixins: [getInfiniteData],

  props: ["id"],

  data() {
    return {
      visible: false,
      tabs: [
        {
          label: "热度",
          value: "hot",
        },
        {
          label: "时间",
          value: "year",
        },
        {
          label: "评分",
          value: "rating",
        },
      ],
      form: {
        sortby: "hot",
      },
      per_page: 21,
    };
  },

  mounted() {
    setTimeout(() => {
      this.visible = true;
    }, 600);
  },

  methods: {
    onChange(value) {
      if (this.form.sortby === value) return;

      this.page = 1;
      this.list = [];
      this.form.sortby = value;
      this.loadMore();
    },

    loadMore() {
      this.getData(getActorWorks, this.id);
    },
  },
};
</script>

<style scoped lang="scss">
.works-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 80px;
  font-size: 28px;
  .works-count {
    font-weight: bold;
  }
}
.works-skeleton {
  top: 0 !important;
  margin-top: 180px;
}

.works-list {
  padding: 20px 0;
  margin-left: 15px;
  font-size: 0;
  ::v-deep .movie-row {
    width: 220px;
    margin: 0 10px;
    padding-bottom: 30px;
    .poster-wrapper {
      position: relative;
      width: 100%;
      height: 320px;
      overflow: hidden;
      border-radius: 6px;
      .img-cover {
        width: 220px;
        height: 320px;
        background-color: #eee;
      }
    }
  }
}
</style>
