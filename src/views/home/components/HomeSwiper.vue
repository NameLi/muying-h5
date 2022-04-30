<template>
  <div class="swiper home-swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in data" :key="item.id">
        <div class="slide-image" @click="pathTo(item)">
          <img :src="item.banner" />
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",

  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initSwiper();
    });
  },

  methods: {
    initSwiper() {
      let _this = this;

      new Swiper(".home-swiper", {
        loop: true,
        speed: 600,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
        pagination: {
          el: ".swiper-pagination",
        },
        on: {
          slideChange: function () {
            _this.$emit("swiper-index-change", this.activeIndex - 1);
          },
        },
      });
    },

    pathTo(banner) {
      if (banner.link_type === 1) {
        this.$router.push(banner.link);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.swiper {
  z-index: 1;
  position: relative;
  padding: 0;
  margin: 0 20px;
  height: 380px;
  border-radius: 8px;
  overflow: hidden;
}

::v-deep .swiper-pagination {
  position: absolute;
  text-align: center;
  transition: 300ms opacity;
  transform: translate3d(0, 0, 0);
  z-index: 10;
  bottom: 10px;
  left: 0;
  right: 0;
  .swiper-pagination-bullet {
    background: #fff;
    display: inline-block;
    margin: 0 4px;
    width: 30px;
    height: 6px;
    border-radius: 6px;
  }
  .swiper-pagination-bullet-active {
    background: $color-theme;
  }

  .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 10px;
    left: 0;
    width: 100%;
  }
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
    width: 100%;
    height: 380px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>