<template>
  <div class="page" :style="customStyle">
    <!-- 背景遮罩 -->
    <div
      v-if="half"
      class="page-cover"
      :class="{ 'is-show': isShow }"
      @click="goBack()"
    ></div>

    <!-- 内容区 -->
    <div
      class="page-main"
      :class="{ 'is-half': half, 'is-round': round }"
      :style="mainBgcolor"
    >
      <!-- 头部 -->
      <div class="page-header" v-if="title && !$slots.header">
        <!-- 自定义顶部左区域 -->
        <div class="header-left">
          <slot name="headerLeft" />
        </div>

        <!-- 自定义标题，点击标题可返回顶部 -->
        <h6 class="title" @click="scrollToTop()">{{ title }}</h6>

        <!-- 自定义顶部右区域 -->
        <div class="header-right-back" v-if="half && !$slots.headerRight">
          <m-icon name="cross" :size="24" color="#fff" @click="goBack()" />
        </div>

        <div class="header-right" v-else>
          <slot name="headerRight" />
        </div>
      </div>

      <!-- 自定义头部 -->
      <slot name="header" v-else />

      <!-- 内容 -->
      <div class="page-content" ref="pageContent">
        <slot />
      </div>

      <!-- 页底关闭返回上一页按钮 -->
      <div class="page-icon-footer" v-if="footerClose && !$slots.footer">
        <m-icon name="cross" @click="goBack()" />
      </div>

      <!-- 页底自定义内容 -->
      <div class="page-footer" v-else>
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page",

  props: {
    zIndex: {
      type: [Number, String],
      default: 97,
    },
    // 半屏显示
    half: {
      type: Boolean,
      default: false,
    },

    // 圆角
    round: {
      type: Boolean,
      default: false,
    },
    // 距离顶部高度
    top: {
      type: [Number, String],
      default: 0,
    },
    // 标题
    title: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "auto",
    },
    bgcolor: {
      type: String,
      default: "#fff",
    },
    // 返回拦截
    beforeBack: Function,
    // 底部关闭按钮
    footerClose: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isShow: false,
      backing: false,
      timer: null,
    };
  },

  computed: {
    customStyle() {
      let top = this.top;

      // 全屏模式下，top值为0
      if (this.half && this.height === "auto" && this.top === 0) {
        top = `${100 / 75}rem`;
      } else if (!isNaN(top) && parseInt(top) && this.height === "auto") {
        top = `${top / 75}rem`;
      } else if (this.height !== "auto") {
        top = "auto";
      }

      return `z-index: ${this.zIndex}; top: ${top}; height: ${this.height}`;
    },
    mainBgcolor() {
      return this.bgcolor ? `background-color: ${this.bgcolor}` : "";
    },
  },

  mounted() {
    this.isShow = true;
    this.$preventScroll(true);
  },

  beforeDestroy() {
    this.isShow = false;
    this.$preventScroll(false);

    this.timer && clearInterval(this.timer);
  },

  methods: {
    // 内容区返回顶部
    scrollToTop() {
      if (this.backing) return;
      this.toTop();
    },

    // 返回顶部
    toTop() {
      this.timer && clearInterval(this.timer);

      this.backing = true;

      this.timer = setInterval(() => {
        let curHeight = this.$refs.pageContent.scrollTop;

        let speed = -curHeight / 4;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (curHeight === 0) clearInterval(this.timer);

        this.$refs.pageContent.scrollTop = curHeight + speed;

        this.backing = false;
      }, 25);
    },

    // 返回上一页
    goBack() {
      if (typeof this.beforeBack === "function") {
        this.beforeBack(this.back);
      } else {
        this.back();
      }
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  .page-cover {
    z-index: 1;
    position: fixed;
    left: 0;
    top: -100vh;
    right: 0;
    bottom: 0;
    background-color: rgba(#000, 0.35);
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
    &.is-show {
      opacity: 1;
    }
  }

  .page-main {
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #fff;
    &.is-round {
      border-radius: 20px 20px 0 0;
    }
    .page-header {
      z-index: 1;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 90px;
      border-bottom: 1px solid #f5f5f5;
      .title {
        margin: 0 120px;
        flex: 1;
        height: 90px;
        line-height: 90px;
        font-weight: bold;
        font-size: 28px;
        text-align: center;
      }
      .header-left {
        position: absolute;
        left: 20px;
        height: 40px;
        line-height: 40px;
      }
      .header-right-back {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 10px solid #fff;
        background-color: #e5e5e5;
        box-sizing: content-box;
      }
      .header-right {
        position: absolute;
        right: 20px;
        height: 40px;
        line-height: 40px;
      }
    }
    .page-content {
      position: relative;
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .page-icon-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 120px;
      .m-icon {
        font-size: 60px;
        width: 68px;
        height: 68px;
        line-height: 68px;
        border-radius: 50%;
        text-align: center;
        color: #fff;
        background-color: #e5e5e5;
      }
    }
  }
}
</style>