<template>
  <div class="photo-wall">
    <div class="photo-item" v-for="photo in photos" :key="photo.id">
      <img class="photo" v-lazy="photo.url" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoWall",
  props: {
    photos: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.photo-wall {
  margin-left: 12px;
  white-space: nowrap;
  .photo-item {
    display: inline-block;
    margin-right: 16px;
    .photo {
      height: 180px;
      border-radius: 6px;
    }
  }
}
</style>