<template>
  <div class="photo-group">
    <div class="photo-item" v-for="photo in photos" :key="photo.id">
      <img class="photo" v-lazy="photo.url" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoGroup",
  props: {
    photos: {
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss">
.photo-group {
  .photo-item {
    display: inline-block;
    margin-right: 8px;
    .photo {
      height: 180px;
      border-radius: 6px;
      object-fit: cover;
    }
  }
}
</style>