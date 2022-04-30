<template>
  <!-- 播放器最外层，visibility: hidden 不能hidden，否则取不到控制条元素，实际并不使用 -->
  <div
    class="player-wrapper"
    :style="{ display: showPlayer ? 'block' : 'none' }"
  >
    <div id="player">
      <!-- 视频内容 -->
      <video
        class="video"
        ref="video"
        preload="auto"
        playsinline
        webkit-playsinline
        x5-video-player-type="h5"
        :poster="poster"
        :src="source.url"
        @timeupdate="timeUpdateHandle"
        @loadedmetadata="loadedmetadataHandle"
        @waiting="handleWaiting"
        @error="handleError"
        @ended="handleEnded"
      ></video>

      <!-- 视频加载中（loadedmetadata之前） -->
      <div class="video-loading" v-if="loading">
        <m-spinner type="triple" />
      </div>

      <!-- 加载与播放 -->
      <div class="video-cover" @click="videoClickHandle()">
        <!-- <span class="loading-icon" v-show="loading"></span> -->
        <p class="reload" v-show="reload" @click="replay()">
          <span>重新播放</span>
        </p>
      </div>

      <!-- 声音按钮 -->
      <div
        class="video-sound"
        :class="{ 'is-muted': isMuted }"
        @click="setVideoSound()"
      >
        <i class="muted-icon iconfont icon-sound"></i>
      </div>

      <!-- 播放器控制条 -->
      <transition name="control">
        <div class="control" v-show="control">
          <div class="tool">
            <i
              class="iconfont"
              :class="paused ? 'icon-play' : 'icon-paused'"
              @click="doPaused"
            ></i>
          </div>

          <div class="video-duration">{{ currentTime }}</div>

          <!-- 进度条 -->
          <div class="progress">
            <player-progress
              v-model="progress"
              :disabled="!duration"
              :buffer="bufferPercent"
              @change="progressChangeHandle"
              @drag-start="dragStartHandle"
              @drag-end="dragEndHandle"
            />
          </div>

          <!-- 视频时间 -->
          <div class="video-duration">{{ totalTime }}</div>

          <!-- 清晰度 -->
          <div class="clarity-wrapper">
            <div
              class="clarity-btn"
              :class="{ 'is-disabeld': isClarityDisabled }"
              @click="showSwitchClarity()"
            >
              {{ source.clarity | clarity_zh }}
            </div>

            <ul class="clarity-list" v-show="isShowClaritySwitch">
              <li
                v-for="item in sources"
                :key="item.clarity"
                :class="{ 'is-active': source.clarity === item.clarity }"
                @click="switchClarity(item)"
              >
                {{ item.clarity | clarity_zh }}
              </li>
            </ul>
          </div>

          <!-- 最大化 -->
          <div class="tool full-screen-btn">
            <i class="iconfont icon-max" @click="fullScreen"></i>
            <div class="full-screen-tip">全屏</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import PlayerProgress from "./PlayerProgress";

export default {
  name: "VideoPlayer",
  components: {
    PlayerProgress,
  },

  props: {
    showPlayer: {
      type: Boolean,
      default: false,
    },

    config: {
      type: Object,
      default() {
        return {
          title: "",
          cover: "",
          autoplay: true,
        };
      },
    },
  },

  data() {
    return {
      $video: null, // 视频实例
      source: {}, // 当前播放资源
      sources: [],
      poster: "",

      videoCover: false, // 视频背景
      loading: false, //	加载中
      reload: false, //	重新播放

      duration: 0, // 视频时长/s
      currentDuration: 0, // 当前播放时长/s

      bufferPercent: 20, // 当前缓冲时长/s

      control: true, //	视频控制条
      controlTimer: null, //
      isShowClaritySwitch: false, // 显示清晰度切换

      paused: true, //	暂停
      progress: 50, // 播放进度百分比
      disabled: true,
      isSwitching: false, // 是否正在切换清晰度
      isMuted: false, // 是否静音
    };
  },

  filters: {
    clarity_zh(val) {
      const clarities = {
        FD: "超清",
        HD: "高清",
        SD: "标清",
      };

      return clarities[val];
    },
  },

  computed: {
    // @return '00:00'
    currentTime() {
      return this.formatTime(this.currentDuration);
    },
    totalTime() {
      return this.formatTime(this.duration);
    },
    isClarityDisabled() {
      return this.sources.length === 1;
    },
  },

  watch: {
    sources: {
      handler(val) {
        this.source = val.length ? val[0] : {};
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {
    this.$video = this.$refs.video;
    document.addEventListener("visibilitychange", this.visibleChangeHandle);
  },

  beforeDestroy() {
    this.controlTimer = null;
    document.removeEventListener("visibilitychange", this.visibleChangeHandle);
  },

  methods: {
    visibleChangeHandle() {
      if (document.visibilityState === "hidden") {
        this.paused = true;
        this.$video.pause();
      }
    },

    // 声音
    setVideoSound() {
      this.$video.muted = !this.$video.muted;
      this.isMuted = this.$video.muted;
    },

    // 播放视频
    play(video) {
      this.poster = video.poster;

      this.loading = true; //	加载中
      this.reload = false; //	重加载

      // 处理video数据
      this.sources = video.sources;

      this.$nextTick(() => {
        this.doPlay();
      });
    },

    // 播放视频，如果非静音不能播放，则先静音，再调用播放
    async doPlay() {
      this.paused = false;
      try {
        await this.$video.play();
      } catch (error) {
        this.setVideoSound();
        this.$video.play();
      }
    },

    // // 空格事件
    // handleKeypress(e) {
    //   if (e.target.tagName === "BODY" && e.keyCode === 32) {
    //     this.doPaused();
    //   }
    // },

    // 切换清晰度
    switchClarity(source) {
      // 点击当前清晰度时禁止
      if (source.clarity === this.source.clarity) {
        return;
      } else {
        // 切换中锁，防止新视频进度条回到初始位置，在新视频设置完时间并播放后释放
        this.isSwitching = true;

        // 切换时暂停原视频
        this.$video.pause();

        // 原视频已播放时长,新视频也需要设置到该时长
        const oldCurrentTime = this.$video.currentTime;

        this.source = source;

        setTimeout(() => {
          this.$video.currentTime = oldCurrentTime;
          this.$video.play();

          this.isSwitching = false;
        }, 0);

        this.isShowClaritySwitch = false;
      }
    },

    // 开始拖动进度条时，视频暂停
    dragStartHandle() {
      this.paused = true;
      this.$video.pause();
    },

    // 停止拖动进度条时，继续播放
    dragEndHandle() {
      this.paused = false;
      this.$video.play();
      this.showVideoControl();
    },

    // 视频位置更新
    progressChangeHandle(percent) {
      this.$video.currentTime = (this.$video.duration * percent) / 100;
    },

    // 视频缓冲进度
    getBufferPercent() {
      if (this.$video.buffered.length > 0) {
        this.bufferPercent =
          (this.$video.buffered.end(0) / this.duration) * 100;
      }
    },

    // 当浏览器已加载视频的元数据时
    loadedmetadataHandle() {
      this.duration = this.$video.duration;
      this.loading = false;
      this.showVideoControl();
    },

    // 当前的播放位置已更改时
    timeUpdateHandle() {
      if (this.isSwitching) return;

      this.currentDuration = this.$video.currentTime;
      this.progress = (this.currentDuration / this.duration) * 100;

      this.getBufferPercent();
    },

    // 当视频由于需要缓冲下一帧而停止
    handleWaiting() {},

    // 当目前的播放列表已结束
    handleEnded() {
      this.reload = true; //	显示重加载
      this.showVideoControl(); //	显示控制条
    },

    // 视频加载错误
    handleError() {},

    //	显示控制条
    showVideoControl() {
      this.control = true;

      if (this.reload || this.paused || this.loading) return;

      clearTimeout(this.controlTimer);

      this.controlTimer = setTimeout(() => {
        this.control = false;
      }, 3000);
    },

    // 隐藏控制条
    hideVideoControl() {
      if (this.reload || this.paused || this.loading) return;
      clearTimeout(this.controlTimer);

      this.control = false;
    },

    // 点击视频显示控制条
    videoClickHandle() {
      if (this.control) {
        this.control = false;
      } else {
        this.showVideoControl();
      }
    },

    //
    showSwitchClarity() {
      if (this.isClarityDisabled) {
        this.isShowClaritySwitch = false;
      } else {
        this.isShowClaritySwitch = !this.isShowClaritySwitch;
      }
    },

    //	暂停
    doPaused() {
      if (!this.$video.duration) {
        return;
      }

      if (this.$video.paused) {
        this.paused = false;
        this.$video.play();
      } else {
        this.paused = true;
        this.$video.pause();
      }
    },

    handelPaused() {
      this.paused = true;
      this.$video.pause();
    },

    destroy() {
      this.paused = true;
      this.$video.pause();
      this.source = {};
    },

    //	全屏显示
    fullScreen() {
      this.$video.webkitRequestFullScreen();
    },

    //	时间格式化 s => 00:00
    formatTime(time) {
      let min = Math.floor(time / 60);
      min < 10 && (min = "0" + min);
      return min + ":" + ((time % 60) / 100).toFixed(2).slice(-2);
    },

    replay() {
      this.reload = false;
      this.$video.currentTime = 0;
      this.paused = false;
      this.$video.play();
    },
  },
};
</script>

<style scoped lang="scss">
.clarity-wrapper {
  z-index: 1;
  position: relative;
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 24px;
  color: #e5e5e5;
  transition: color 0.3s ease;
  .is-disabeld {
    opacity: 0.85;
  }
  &:hover {
    color: #fff;
    cursor: pointer;
    .clarity-list {
      visibility: visible;
      opacity: 1;
    }
  }
  .clarity-list {
    transition: visibility 0.2s ease, opacity 0.2s ease;
    visibility: hidden;
    opacity: 0;
    z-index: 2;
    position: absolute;
    padding: 8px 0;
    left: -3px;
    right: -3px;
    bottom: 42px;
    color: #fff;
    background-color: rgba(#000, 0.5);
    border-radius: 4px;
    text-align: center;
    li {
      height: 44px;
      line-height: 44px;
      color: rgba(#fff, 0.5);
      transition: color 300ms ease 0s, background-color 300ms ease 0s;
      &:hover {
        cursor: pointer;
        background-color: rgba(#fff, 0.2);
      }
      &.is-active {
        color: #fff;
      }
    }
  }
}

.full-screen-btn {
  margin-right: 10px;
  &:hover {
    .full-screen-tip {
      visibility: visible;
      opacity: 1;
    }
  }
  .full-screen-tip {
    transition: visibility 0.2s ease, opacity 0.2s ease;
    visibility: hidden;
    opacity: 0;
    z-index: 2;
    position: absolute;
    padding: 4px 0;
    left: -3px;
    right: -3px;
    bottom: 40px;
    color: #fff;
    background-color: rgba(#000, 0.5);
    border-radius: 4px;
    text-align: center;
  }
}

.player-wrapper {
  z-index: 101;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  padding-top: 56.25%;
  // padding-top: 42.85%;
  width: 100%;
  background-color: #000;
}

#player {
  z-index: 99;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video {
  width: 100%;
  // object-fit: fill;
  height: 100%;
}

.video-loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0);
  text-align: center;
  display: flex;
  align-content: center;
  justify-content: center;
}

.video-cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0);
  text-align: center;
}
.loading-icon {
  display: inline-block;
  margin-top: 25%;
  width: 24px;
  height: 24px;
  animation: rotate 1s infinite linear;
  border: 4px solid #ccc;
  border-right: 4px solid rgba(0, 0, 0, 0);
  border-radius: 50%;
}
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

.paused {
  position: absolute;
  left: 0;
  right: 0;
  top: 40%;
  width: 40px;
  height: 30px;
  margin: 0 auto;
  text-align: center;
  line-height: 30px;
  z-index: 100;
}

.reload {
  display: inline-block;
  margin-top: 25%;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.reload:hover {
  background: rgba(255, 255, 255, 0.2);
}
.reload > span {
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
}

.video-sound {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  position: absolute;
  left: 30px;
  bottom: 80px;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  color: #fff;
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: center;
    border: 1px solid #fff;
    border-radius: 50%;
  }
  &.is-muted {
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 200%;
      height: 1px;
      background-color: #fff;
      transform: rotate(45deg) scale(0.5);
      transform-origin: center;
    }
  }
  .muted-icon {
    font-size: 28px;
  }
}

/* 控制条样式 */
.control-enter-active,
.control-leave-active {
  transition: opacity 0.3s ease;
}
.control-enter,
.control-leave-to {
  opacity: 0;
  // visibility: hidden;
}

// 控制栏
.control {
  display: flex;
  align-items: center;
  z-index: 2;
  position: absolute;
  padding: 0 8px;
  left: 0;
  right: 0;
  bottom: 0;
  height: 64px;
  font-size: 42px;
  opacity: 1;
  visibility: visible;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  .tool {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    &:hover {
      cursor: pointer;
      i {
        color: #fff;
      }
    }
    i {
      font-size: 36px;
      color: rgba(#fff, 0.85);
      transition: color 0.3s ease;
    }
  }
  .progress {
    padding: 0 16px;
    flex: 1;
  }
  .video-duration {
    padding: 0 8px;
    color: #fff;
    font-size: 24px;
  }
}
</style>