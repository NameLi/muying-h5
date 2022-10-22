<template>
  <div class="header-bar-wrapper">
    <div class="header-bar" :class="{ 'is-top': isTop }">
      <div class="search" @click="$router.push('/search')">
        <i class="search-icon iconfont icon-search"></i>
        <span class="search-label">请输入你要搜索的内容</span>
      </div>
      <!-- <div class="message">
        <m-icon name="news" size="46" color="#fff" />
      </div> -->
    </div>

    <div
      class="bgcolor"
      :style="backgroundStyle"
      :class="{ transparent: !isTop }"
    ></div>
  </div>
</template>

<script>
import { throttle } from "@/util/index";
import { colorToRgba } from "@/util/color";

export default {
  name: "HeaderBar",

  props: {
    bgcolor: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      scrollTop: 0,
      backgroundStyle: "",
    };
  },

  computed: {
    isTop() {
      return this.scrollTop <= 1;
    },
  },

  watch: {
    bgcolor(val) {
      if (val) {
        const bgcolorRgba = colorToRgba(this.bgcolor, 0);
        this.backgroundStyle = `background-image: linear-gradient(${val}, ${bgcolorRgba})`;
      }
    },
  },

  activated() {
    window.addEventListener("scroll", this.getScrollTop);
  },

  deactivated() {
    window.removeEventListener("scroll", this.getScrollTop);
  },

  methods: {
    handleScroll: throttle(function () {
      this.getScrollTop();
    }),

    getScrollTop() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      this.scrollTop = scrollTop;
    },
  },
};
</script>

<style scoped lang="scss">
.header-bar-wrapper {
  position: relative;
  height: 100px;
  .bgcolor {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 600px;
    transition: background-image 0.6s ease-in-out, opacity .6s ease-in-out;
    &.transparent {
      opacity: 0;
    }
  }
}
.header-bar {
  z-index: 4;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  &:not(.is-top) {
    background-color: #fff;
    box-shadow: 0 1px 2px #e5e5e5;
    .search {
      background-color: #e5e5e5;
    }
  }
  .search {
    flex: 1;
    display: flex;
    align-items: center;
    height: 56px;
    line-height: 56px;
    border-radius: 100px;
    color: #666;
    background: rgba(#fff, 0.8);
    .search-icon {
      padding: 4px 20px 0;
      font-size: 28px;
    }
    .search-label {
      flex: 1;
      font-size: 28px;
    }
  }
}
</style>