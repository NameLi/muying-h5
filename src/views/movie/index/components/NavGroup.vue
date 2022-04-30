<template>
  <div class="nav-group-wrapper">
    <menu-skeleton v-if="loading" />

    <div class="nav-group" ref="navGroup" :class="{ 'is-fixed': isFixed }">
      <!-- 分类 -->
      <nav-list
        v-model="form.category"
        :list="categories"
        @change="changeHandle()"
      />

      <!-- 类型 -->
      <nav-list v-model="form.genre" :list="genres" @change="changeHandle()" />

      <!-- 国家/地区 -->
      <nav-list
        v-model="form.country"
        :list="countries"
        @change="changeHandle()"
      />

      <!-- 年份 -->
      <nav-list v-model="form.year" :list="years" @change="changeHandle()" />
    </div>

    <transition name="fade">
      <div
        class="nav-group-fixed"
        ref="navFixed"
        v-show="isShowMenu"
        @click="showGroupMenu()"
      >
        <div class="current-menu">
          {{ checkedMenus }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MenuSkeleton from "./MenuSkeleton";
import NavList from "./NavList";
import { getCategories } from "@/api/api";

export default {
  name: "NavGroup",

  components: {
    MenuSkeleton,
    NavList,
  },

  data() {
    return {
      loading: false,
      categories: [],
      countries: [],
      years: [],

      form: {
        category: "电影",
        genre: "全部",
        country: "全部",
        year: "全部",
      },
      navGroupH: 0,
      isFixed: false,
      isShowMenu: false,
    };
  },

  computed: {
    genres() {
      const category = this.categories.find(
        (item) => item.name === this.form.category
      );
      return [{ name: "全部" }, ...(category?.children || [])];
    },
    checkedMenus() {
      const genre = this.form.genre === "全部" ? "" : this.form.genre;
      const country = this.form.country === "全部" ? "" : this.form.country;
      const year = this.form.year === "全部" ? "" : this.form.year;

      return `${this.form.category}${genre ? "-" + genre : ""}${
        country ? "-" + country : ""
      }${year ? "-" + year : ""}`;
    },
  },

  watch: {
    "form.category": {
      handler(val) {
        if (!this.genres.includes((item) => item.name === this.genre.name)) {
          this.genre = "";
        }
      },
      immediate: true,
    },
  },

  mounted() {
    this.getCategories();
    this.changeHandle();
    this.$nextTick(() => {
      this.navGroupH = this.$refs.navGroup.offsetHeight;
    });

    window.addEventListener("scroll", this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    async getCategories() {
      this.loading = true;
      let res = await getCategories();
      this.loading = false;

      if (res.code === 200) {
        this.navList = res.data;
        this.categories = res.data.categories;
        this.countries = [{ name: "全部" }, ...res.data.countries];
        this.years = [{ name: "全部" }, ...res.data.years];
      }
    },

    changeHandle() {
      this.$emit("on-change", this.form);
    },

    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      if (scrollTop > this.navGroupH) {
        this.isShowMenu = true;
      } else {
        this.isShowMenu = false;
      }

      this.isFixed = false;
    },

    // 显示菜单
    showGroupMenu() {
      this.isFixed = true;
    },
  },
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.2s;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(-100%);
}

.nav-group-wrapper {
  height: 280px;
  .nav-group {
    padding-top: 20px;
    &.is-fixed {
      z-index: 2;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #eee;
    }
  }

  .nav-group-fixed {
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 72px;
    line-height: 72px;
    background-color: #f5f5f5;
    .current-menu {
      text-align: center;
    }
    .m-icon {
      float: right;
      text-align: center;
      width: 72px;
      color: $color-theme;
    }
  }
}
</style>