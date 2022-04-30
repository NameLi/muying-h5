<template>
  <div class="header-wrapper" :style="wrapperStyle">
    <header class="header" :style="style">
      <div class="back" @click="$router.back()" v-if="back">
        <i class="iconfont" :class="'icon-' + backIcon" />
      </div>
      <div
        class="header-content"
        :class="{ 'no-back': !back }"
        @click="scrollTop()"
      >
        <slot v-if="$slots.default"></slot>
        <div v-else class="title">{{ title }}</div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "HeaderBar",
  props: {
    title: {
      type: String,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    back: {
      type: Boolean,
      default: true,
    },
    backIcon: {
      type: String,
      default: "back",
    },
    bgcolor: {
      type: String,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      timer: null,
      backing: false,
      el: null,
    };
  },

  computed: {
    wrapperStyle() {
      return this.transparent ? "height: 0" : "";
    },
    style() {
      if (this.bgcolor) {
        return `background: ${this.bgcolor};color: #fff`;
      } else if (this.transparent) {
        return `background-color: transparent;color: #fff`;
      } else if (this.plain) {
        return `background: #fff;`;
      }
      return "";
    },
  },

  created() {
    document.title = this.title || '慕影网';
  },

  activated() {
    document.title = this.title || '慕影网';
  },

  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },

  methods: {
    scrollTop() {
      if (this.backing) return;

      // el
      const pageEls = [...document.querySelectorAll(".page .page-content")];

      if (pageEls.length) {
        this.el = pageEls[pageEls.length - 1];
      } else {
        this.el = document.documentElement;
      }

      this.toTop();
    },

    toTop() {
      this.timer && clearInterval(this.timer);

      this.backing = true;

      this.timer = setInterval(() => {
        let curHeight = this.el.scrollTop;

        let speed = -curHeight / 4;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (curHeight === 0) clearInterval(this.timer);

        this.el.scrollTop = curHeight + speed;

        this.backing = false;
      }, 25);
    },
  },
};
</script>

<style scoped lang="scss">
.header-wrapper {
  height: 100px;
  .header {
    z-index: 9;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 100px;
    color: #fff;
    background-color: $color-theme;
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
      font-size: 32px;
      &::after {
        z-index: 1;
        content: "";
        position: absolute;
        right: -5px;
        top: 34px;
        height: 32px;
        width: 1px;
        background-color: #f5f5f5;
        opacity: 0.35;
      }
    }
    .header-content {
      position: relative;
      margin: 0 120px;
      line-height: 100px;
      font-size: 32px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #fff;
      font-weight: bold;
      &.no-back {
        margin: 0 20px;
      }
    }
  }
}
</style>