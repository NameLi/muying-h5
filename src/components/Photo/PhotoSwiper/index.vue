<template>
  <div class="photo-swiper-container">
    <!-- header -->
    <div class="swiper-header">
      <div class="back" @click="$router.back()">
        <i class="iconfont icon-back"></i>
      </div>
      <div class="count" v-if="total">{{ initIndex + 1 }}/{{ total }}</div>
      <div class="back"></div>
    </div>

    <!-- photo swiper -->
    <div class="swiper photo-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in photos" :key="item.id">
          <div class="slide-image">
            <img :data-src="item.url_larger" class="swiper-lazy" />
            <div class="swiper-lazy-preloader">
              <m-spinner type="triple" color="#f60, #7fd901, #36a2e0" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div class="swiper-footer" v-if="photo">
      <!-- 用户点赞 -->
      <user-like type="photos" :data="photo" default-count="" />

      <!-- 用户收藏 -->
      <user-collection type="photos" :data="photo" default-count="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoSwiper",

  props: {
    total: {
      type: Number,
    },
    photos: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      loading: false,
      initIndex: 0,
    };
  },

  computed: {
    photo() {
      return this.photos.length ? this.photos[this.initIndex] : null;
    },
  },

  mounted() {
    this.$preventScroll(true);

    this.getInitIndex(); // 当前需要展示的图片索引

    this.$nextTick(() => {
      this.initSwiper();
    });
  },

  beforeDestroy() {
    this.$preventScroll(false);
  },

  methods: {
    // 获取当前需要展示的图片索引
    getInitIndex() {
      const hash = this.$route.hash;
      const query = {};
      hash
        .split("?")[1]
        .split("&")
        .map((q) => {
          let item = q.split("=");
          return (query[item[0]] = item[1]);
        });

      this.initIndex = Number(query.index) || 0;
    },

    // 初始化swiper
    initSwiper() {
      let _this = this;

      new Swiper(".photo-swiper", {
        lazy: true,
        initialSlide: this.initIndex,
        observer: true,
        observeParents: true,
        watchSlidesVisibility: true,
        on: {
          slideChange: function () {
            _this.initIndex = this.activeIndex;
          },
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.photo-swiper-container {
  z-index: 990;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  bottom: 0;
  background-color: #000;
  overflow: hidden;

  // header
  .swiper-header {
    display: flex;
    align-items: center;
    text-align: center;
    height: 100px;
    color: #fff;
    .back {
      width: 100px;
      height: 100px;
      line-height: 100px;
    }
    .count {
      flex: 1;
      font-size: 28px;
    }
  }

  // footer
  .swiper-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100px;
    color: #fff;
    ::v-deep .tool-item {
      margin: 10px 30px;
      position: relative;
      width: 80px;
      height: 80px;
      .tool-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        &.is-checked {
          > i {
            color: red;
          }
        }
      }
      .tool-item-count {
        position: absolute;
        color: red;
        left: 60px;
        top: 6px;
        line-height: 20px;
        font-size: 10px;
      }
    }
  }
}
// photo swiper
.swiper {
  z-index: 1;
  position: relative;
  height: calc(100vh - 200px);
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
}

.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
}

.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: transform;
  .slide-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    img {
      max-width: 100vw;
      max-height: calc(100vh - 200px);
      object-fit: cover;
    }
  }
}
</style>