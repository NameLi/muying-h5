<template>
  <div class="container">
    <skeleton v-if="loading" />

    <header-bar :bgcolor="bgcolor" />

    <!-- swiper -->
    <div class="swipe-wrapper" v-if="swipers.length">
      <home-swiper :data="swipers" @swiper-index-change="onSwiperIndexChange" />
    </div>

    <!-- 导航菜单 -->
    <home-menu />

    <!-- 正在热映 -->
    <m-panel title="正在热映" :subtitle="theaters.total + '部'" to="/theater">
      <div class="movie-list">
        <movie-row
          v-for="movie in theaters.data"
          :movie="movie"
          :key="movie.id"
        />
      </div>
    </m-panel>

    <!-- 即将上映 -->
    <m-panel title="即将上映" :subtitle="comings.total + '部'" to="/coming">
      <div class="movie-list">
        <movie-row
          v-for="movie in comings.data"
          :movie="movie"
          :key="movie.id"
          is-coming
        >
          <div class="coming-date">{{ movie.release_date }}</div>
        </movie-row>
      </div>
    </m-panel>

    <!-- 那年今日 -->
    <m-panel title="那年今日" :subtitle="todays.total + '部'" to="/today">
      <div class="movie-list">
        <movie-row
          v-for="movie in todays.data"
          :movie="movie"
          :key="movie.id"
        />
      </div>
    </m-panel>

    <!-- 热门文章 -->
    <m-panel title="文章资讯" :scroll-x="false">
      <div class="article-list">
        <article-item
          v-for="article in articles"
          :article="article"
          :key="article.id"
        />
      </div>
    </m-panel>

    <footer-info />
  </div>
</template>

<script>
import { APP_NAME } from "@/config";
import { getIndex } from "@/api/api";

import Skeleton from "./components/Skeleton.vue";
import HomeMenu from "./components/HomeMenu.vue";
import HomeSwiper from "./components/HomeSwiper.vue";
import HeaderBar from "./components/HeaderBar.vue";

export default {
  name: "Home",
  components: {
    Skeleton,
    HeaderBar,
    HomeMenu,
    HomeSwiper,
  },
  data() {
    return {
      loading: false,
      swipers: [],
      articles: [],
      todays: {
        total: "-",
      },
      theaters: { total: "-" },
      comings: { total: "-" },
      bgcolor: "",
    };
  },

  filters: {
    dateToZh(date) {
      let dateList = date.split("-");

      if (dateList.length === 1) {
        return dateList[0] + "年";
      } else if (dateList.length === 2) {
        return dateList[0] + "年" + dateList[1] + "月";
      } else if (dateList.length === 3) {
        return dateList[1] + "月" + dateList[2] + "日";
      } else {
        return "";
      }
    },
  },

  created() {
    document.title = APP_NAME;
  },

  activated() {
    document.title = APP_NAME;
  },

  mounted() {
    this.getIndex();
  },

  methods: {
    async getIndex() {
      this.loading = true;
      const { code, data } = await getIndex();

      if (code === 200) {
        this.swipers = data.swiper;
        this.articles = data.article.data;
        this.comings = data.coming;
        this.theaters = data.theater;
        this.todays = data.today;
      }

      this.onSwiperIndexChange(0);

      this.$nextTick(() => {
        this.loading = false;
      });
    },

    // 根据轮播变换背景色（swiper的index有bug）
    onSwiperIndexChange(index = 0) {
      const len = this.swipers.length;
      if (len) {
        if (index === len) {
          index = 0;
        } else if (index < 0) {
          index = len - 1;
        }
        this.bgcolor = this.swipers[index].bgcolor;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding-bottom: 10px;
  background-color: #f5f5f5;
  .swipe-wrapper {
    position: relative;
    height: 380px;
  }
  .movie-list {
    min-height: 335px;
    .coming-date {
      height: 36px;
      line-height: 40px;
      font-size: 24px;
      color: #888;
    }
  }
}
</style>
