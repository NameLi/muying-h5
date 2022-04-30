<template>
  <div class="image-group">
    <div class="list" v-if="images.length">
      <img
        class="image-item"
        v-for="(src, index) in photos"
        :class="'item_' + index"
        v-lazy="src"
        :key="index"
      />
    </div>
    <img
      class="no-image"
      v-else
      src="https://img.ixook.com/image/default.jpg@avatar"
    />
  </div>
</template>

<script>
export default {
  name: "ImageGroup",
  props: {
    images: {
      type: Array,
    },
  },
  computed: {
    photos() {
      let photos = [];
      for (let i = 0; i < 3; i++) {
        if (this.images[i]) {
          photos.push(this.images[i]);
        } else {
          photos.push("https://img.ixook.com/image/default.jpg@avatar");
        }
      }
      return photos;
    },
  },
};
</script>

<style scoped lang="scss">
.image-group {
  width: 140px;
  height: 140px;
  .list {
    position: relative;
    width: 140px;
    height: 140px;
    text-align: left;
    .image-item {
      position: absolute;
      width: 100px;
      height: 140px;
      border-radius: 8px;
      object-fit: cover;
      overflow: hidden;
      &.item_0 {
        z-index: 3;
      }
      &.item_1 {
        z-index: 2;
        right: 20px;
        bottom: 0;
        width: 94px;
        height: 132px;
        opacity: 0.7;
      }
      &.item_2 {
        z-index: 1;
        right: 0;
        bottom: 0;
        width: 88px;
        height: 123px;
        opacity: 0.4;
      }
    }
  }
  .no-image {
    width: 140px;
    height: 140px;
    border-radius: 12px;
    object-fit: cover;
  }
}
</style>