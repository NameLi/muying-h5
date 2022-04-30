<template>
  <div
    class="slider"
    ref="slider"
    :class="{ 'slider--disabled': disabled }"
    @click="setProgress"
    @mousedown="onButtonDown"
    @touchstart="onButtonDown"
  >
    <div class="track">
      <!-- 缓冲进度 -->
      <div class="slider__buffer" :style="`width: ${buffer}%`"></div>
      <!-- 播放进度 -->
      <div class="slider__bar" :style="`width: ${progress}%`"></div>
    </div>

    <!-- 按钮 -->
    <div
      class="slider__button"
      :class="'is-' + dragStatus"
      :style="`left:${progress}%`"
    ></div>
  </div>
</template>

<script>
export default {
  name: "PlayerProgress",
  props: {
    buffer: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      progress: 0, // 进度百分比
      sliderWitdh: 0, // 可滑动区域宽度/px
      deltaX: 0,
      offsetX: 0,
      startX: 0,
      dragStatus: "start", // 拖拽状态
      isMouseDown: false,
      startValue: 0,
    };
  },

  watch: {
    value(val) {
      this.updateValue(val);
    },
  },

  mounted() {
    this.resetDomSize();
  },

  methods: {
    resetDomSize() {
      this.sliderWitdh = this.$refs.slider.offsetWidth;
      this.updateValue(this.progress);
    },

    onButtonDown(ev) {
      if (this.disabled) return;
      ev.preventDefault();
      this.resetDomSize();

      this.onTouchStart(ev);
      window.addEventListener("mousemove", this.onTouchMove);
      window.addEventListener("touchmove", this.onTouchMove);
      window.addEventListener("mouseup", this.onDragEnd);
      window.addEventListener("touchend", this.onDragEnd);
      window.addEventListener("contextmenu", this.onDragEnd);
    },

    onDragEnd(ev) {
      if (this.dragStatus === "start" || this.dragStatus === "dragging") {
        window.removeEventListener("mousemove", this.onTouchMove);
        window.removeEventListener("touchmove", this.onTouchMove);
        window.removeEventListener("mouseup", this.onDragEnd);
        window.removeEventListener("touchend", this.onDragEnd);
        window.removeEventListener("contextmenu", this.onDragEnd);
        this.onTouchEnd(ev);
      }
    },

    onTouchStart(ev) {
      // if (this.dragStatus === "start") {
      //   this.$emit("drag-start");
      // }

      this.setProgress(ev);

      const touch = ev.touches ? ev.touches[0] : ev;

      this.deltaX = 0;
      this.offsetX = 0;
      this.startX = touch.clientX;

      this.startValue = this.progress;
      this.dragStatus = "start";
    },

    onTouchMove(ev) {
      if (this.dragStatus === "start") {
        this.$emit("drag-start");
      }

      const touch = ev.touches ? ev.touches[0] : ev;

      this.deltaX = touch.clientX - this.startX;

      this.offsetX = Math.abs(this.deltaX);

      this.dragStatus = "dragging";

      const diff = (this.deltaX / this.sliderWitdh) * 100;

      this.progress = this.startValue + diff;

      this.updateValue(this.progress, false, true);
    },

    onTouchEnd(ev) {
      ev.stopPropagation();

      if (this.disabled) return;

      if (this.dragStatus === "dragging") {
        this.dragStatus = "end";
        this.updateValue(this.progress, true);
        this.$emit("drag-end");
      }
    },

    setProgress(ev) {
      console.log(ev);

      if (this.disabled) return;

      const ele = ev.srcElement || ev.target;

      if (!ele.className.includes("slider__button")) {
        const touch = ev.touches ? ev.touches[0] : ev;

        const touchX = touch.clientX;
        const sliderX = this.$refs.slider.getBoundingClientRect().x;

        const value = ((touchX - sliderX) / this.sliderWitdh) * 100;

        this.updateValue(value, true);
      }
    },

    // 播放进度
    updateValue(value, end = false, drag = false) {
      if (value < 0) {
        this.progress = 0;
        return;
      }

      if (value > 100) {
        this.progress = 100;
        return;
      }

      this.progress = value;

      this.$emit("input", value);

      if (end) {
        console.log(value);
        this.$emit("change", value);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.slider {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    .slider__button {
      transform: scale(1);
    }
  }
  .track {
    position: relative;
    overflow: hidden;
    height: 6px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    .slider__buffer {
      z-index: 0;
      position: absolute;
      top: 0px;
      bottom: 0px;
      background-color: rgba(255, 255, 255, 0.6);
      border-radius: 4px 0px 0px 4px;
    }
    .slider__bar {
      position: absolute;
      border-radius: 4px 0px 0px 4px;
      top: 0px;
      bottom: 0px;
      background-color: #1989fa;
    }
  }

  .slider__button {
    z-index: 1;
    position: absolute;
    margin-left: -8px;
    top: 4px;
    left: 0;
    width: 32px;
    height: 32px;
    border-radius: 40px;
    background-color: #fff;
    transition: transform 0.3s ease;
    box-shadow: 0 0 8px 8px rgba($color: #fff, $alpha: 0.4);
  }
}
.slider--disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
