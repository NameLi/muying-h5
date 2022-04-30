<template>
  <div class="header-wrapper" ref="header">
    <header class="header">
      <div class="back" @click="$router.back()">
        <i class="iconfont icon-back"></i>
      </div>

      <div class="category" v-show="isTop">{{ placeholder }}</div>

      <div class="header-content" :style="opacity">
        <div class="header-box">
          <div class="header-poster" v-if="poster">
            <img class="poster" :src="poster" />
          </div>
          <div class="header-info">
            <h3 class="title">{{ title }}</h3>

            <slot name="subtitle" v-if="$slots.subtitle"></slot>
            <div class="subtitle" v-else>{{ subtitle }}</div>
          </div>
        </div>

        <div class="header-slot" :class="{ 'is-share': share }">
          <slot></slot>
        </div>
      </div>

      <div class="share" v-if="share" @click="showShare()">
        <m-icon name="share" size="40" />
      </div>
    </header>
  </div>
</template>

<script>
import { throttle } from "@/util";

export default {
  name: "HeaderScrollBar",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    poster: {
      type: String,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    bgcolor: {
      type: String,
    },
    share: {
      type: Boolean,
      default: false,
    },
    startTop: {
      type: Number,
      default: 40,
    },
    endTop: {
      type: Number,
      default: 160,
    },
  },
  data() {
    return {
      scrollTop: 0,
      isBindScroll: false,
      scrollTopValue: 0,
    };
  },
  computed: {
    isTop() {
      return this.scrollTop <= 30;
    },
    bgcolorStyle() {
      return this.bgcolor ? `background-color: ${this.bgcolor}` : "";
    },
    opacity() {
      if (this.scrollTop < this.startTop) return;
      const rate = (this.scrollTop - this.startTop) / this.endTop;
      const opacity = rate > 1 ? 1 : rate;
      return `opacity: ${opacity};${this.bgcolorStyle}`;
    },
  },

  // 由于有页面是 keep-alive，会先后触发 mounted->activated 生命周期，因此
  // 用 isBindScrol 标志位判断是否已绑定 srcoll 事件监听，已监听则 actived 生命周期中
  // 不需要再次监听
  mounted() {
    this.isBindScroll = true;
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeDestroy() {
    this.isBindScroll = false;
    window.removeEventListener("scroll", this.handleScroll);
  },

  activated() {
    if (this.isBindScroll) return;
    window.addEventListener("scroll", this.handleScroll);
  },

  deactivated() {
    this.isBindScroll = false;
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    showShare() {
      console.warn("uncomplate");
    },

    handleScroll: throttle(function () {
      this.getScrollTop();
    }),

    getScrollTop() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      // 只有在滚动范围内时改变 scrollTop 值以优化滚动
      if (this.scrollTopValue <= this.endTop + 20) {
        this.scrollTop = scrollTop;
      }
      this.scrollTopValue = scrollTop;

      if (this.scrollTopValue === 0 && this.scrollTop !== 0) {
        this.scrollTop = 0;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.header-wrapper {
  background-color: transparent;
  .header {
    z-index: 9;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 100px;
    color: #fff;
    .back {
      z-index: 1;
      position: absolute;
      left: 10px;
      top: 0;
      width: 80px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 38px;
    }
    .category {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 32px;
    }
    .header-content {
      position: relative;
      flex: 1;
      display: flex;
      justify-content: space-between;
      background-color: $color-theme;
      opacity: 0;
      .header-box {
        display: flex;
        align-items: center;
        height: 100px;
        padding-left: 100px;
        flex: 1;
        width: 0;
        .header-poster {
          margin-right: 16px;
          width: 50px;
          height: 68px;
          flex-shrink: 0;
          background-color: #f5f5f5;
          .poster {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
          }
        }
        .header-info {
          overflow: hidden;
          .title {
            font-size: 28px;
            height: 38px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .subtitle {
            font-size: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .header-slot {
        display: flex;
        align-items: center;
        margin-right: 20px;
        &.is-share {
          margin-right: 100px;
        }
      }
    }
    .share {
      z-index: 1;
      position: absolute;
      right: 10px;
      top: 0;
      width: 80px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>