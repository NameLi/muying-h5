<template>
  <div class="container search-result">
    <div class="menu-list" :class="'menu-' + type">
      <div
        class="menu-item"
        :class="{ 'is-active': type === 'movie' }"
        @click="typeChange('movie')"
      >
        影视
      </div>
      <div
        class="menu-item"
        :class="{ 'is-active': type === 'actor' }"
        @click="typeChange('actor')"
      >
        影人
      </div>
      <div
        class="menu-item"
        :class="{ 'is-active': type === 'role' }"
        @click="typeChange('role')"
      >
        角色
      </div>
    </div>

    <!-- 搜索结果 -->

    <div class="result-list" v-infinite-scroll="doSearch">
      <!-- 加载中 -->
      <transition name="fade">
        <div class="init-loading" v-if="isShowLoading">
          <m-spinner type="triple" color="#f60, #7fd901, #36a2e0" />
        </div>
      </transition>

      <!-- 无查询内容 -->
      <div v-if="isShowNoData" class="no-data">未找到相关内容</div>

      <!-- 影视搜索结果 -->
      <div class="movie-result" v-show="type === 'movie'">
        <movie-item
          @on-checked="checkedHandle(movie.title)"
          v-for="movie in movies"
          :movie="movie"
          :key="movie.id"
          :keyword="keyword"
        />
      </div>

      <!-- 影人搜索结果 -->
      <div class="actor-result" v-show="type === 'actor'">
        <actor-item
          @on-checked="checkedHandle(actor.name)"
          v-for="actor in actors"
          :actor="actor"
          :key="actor.id"
          :keyword="keyword"
        />
      </div>

      <!-- 角色搜索结果 -->
      <div class="role-result" v-show="type === 'role'">
        <role-item
          @on-checked="checkedHandle(role.name)"
          v-for="role in roles"
          :role="role"
          :key="role.id"
          :keyword="keyword"
        />
      </div>

      <m-loadmore v-if="!isShowNoData" :loading="loading" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { debounce } from "@/util";

export default {
  name: "SearchResult",

  props: ["keyword"],

  data() {
    return {
      loading: false,
      cancel: null,
      per_page: 20,
      type: "movie",
      movies: [],
      actors: [],
      roles: [],
      moviePage: 1,
      actorPage: 1,
      rolePage: 1,
      movieTotal: 0,
      actorTotal: 0,
      roleTotal: 0,
      movieTop: 0,
      actorTop: 0,
      roleTop: 0,
      movieNoMoreData: false,
      actorNoMoreData: false,
      roleNoMoreData: false,
    };
  },

  watch: {
    keyword(val) {
      if (val) {
        this.refreshSearch();
      }
    },
  },

  computed: {
    isShowLoading() {
      return this.loading && this[this.type + "Page"] === 1;
    },
    isShowNoData() {
      return this[this.type + "Total"] === 0 && !this.loading;
    },
  },

  methods: {
    refreshSearch() {
      this.movieNoMoreData = false;
      this.actorNoMoreData = false;
      this.roleNoMoreData = false;
      this.movies = [];
      this.actors = [];
      this.roles = [];
      this.moviePage = 1;
      this.actorPage = 1;
      this.rolePage = 1;
      this.movieTotal = 0;
      this.actorTotal = 0;
      this.roleTotal = 0;
      this.movieTop = 0;
      this.actorTop = 0;
      this.roleTop = 0;

      this.doSearch();
    },

    // 选中记录关键字
    checkedHandle(keyword) {
      this.$emit("keyword-change", keyword);
    },

    typeChange(type) {
      // 保存当前页面滑动高度
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      this[this.type + "Top"] = scrollTop;

      this.type = type;

      this.$nextTick(() => {
        document.documentElement.scrollTop = this[type + "Top"];
      });

      if (this[this.type + "Total"] === 0) {
        this.doSearch();
      }
    },

    doSearch: debounce(function () {
      if (this.keyword) {
        this.search();
      }
    }),

    async search() {
      if (this[this.type + "NoMoreData"] === true) return;

      // if (this.loading) return;

      this.loading = true;

      let CancelToken = axios.CancelToken;
      let _this = this;

      if (this.cancel) {
        this.cancel();
      }

      let page = 1;
      if (this.type === "actor") {
        page = this.actorPage;
      } else if (this.type === "role") {
        page = this.rolePage;
      } else {
        page = this.moviePage;
      }

      let params = {
        page,
        keyword: this.keyword,
        type: this.type,
      };

      const { code, data, total } = await axios.get(`/search`, {
        params,
        cancelToken: new CancelToken(function executor(c) {
          _this.cancel = c;
        }),
      });

      if (code === 200) {
        switch (this.type) {
          case "actor":
            this.actors.push(...data);
            this.actorPage++;
            this.actorTotal = total;
            break;
          case "role":
            this.roles.push(...data);
            this.rolePage++;
            this.roleTotal = total;
            break;
          default:
            this.movies.push(...data);
            this.moviePage++;
            this.movieTotal = total;
            break;
        }

        if (data.length < this.per_page) {
          this[this.type + "NoMoreData"] = true;
        }
      }

      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.container.search-result {
  .menu-list {
    z-index: 3;
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    padding-left: 12px;
    height: 74px;
    color: rgb(102, 102, 102);
    border-bottom: 1px solid #eee;
    background-color: #fff;
    &::after {
      content: "";
      position: absolute;
      left: 68px;
      bottom: 4px;
      width: 46px;
      height: 6px;
      background-color: $color-theme;
      border-radius: 4px;
      transform: translateX(-50%);
      transition: left 0.2s;
    }
    &.menu-movie {
      &::after {
        left: 68px;
      }
    }
    &.menu-actor {
      &::after {
        left: 180px;
      }
    }
    &.menu-role {
      &::after {
        left: 292px;
      }
    }
    .menu-item {
      display: inline-block;
      width: 112px;
      height: 74px;
      line-height: 56px;
      font-weight: bold;
      font-size: 28px;
      text-align: center;
      transition: font-size 0.2s;
      &.is-active {
        font-size: 32px;
      }
    }
  }

  .result-list {
    padding: 80px 0 15px;
    .no-data {
      height: 400px;
      line-height: 400px;
      text-align: center;
      color: #888;
    }

    // 影视样式重写
    .movie-result {
      ::v-deep .poster-wrapper {
        width: 134px;
        height: 180px;
      }
    }

    // 影人影视重写
    .actor-result {
      ::v-deep .actor-avatar {
        width: 134px;
        height: 180px;
      }
    }

    // 角色样式重写
    .role-result {
      ::v-deep .role-avatar {
        width: 134px;
        height: 180px;
      }
    }
  }

  .init-loading {
    z-index: 99;
    position: fixed;
    left: 0;
    top: 164px;
    right: 0;
    bottom: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>