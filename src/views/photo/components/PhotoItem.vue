<template>
  <img class="photo-item" v-lazy="photo.url" />
</template>

<script>
export default {
  name: "PhotoItem",
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.photo-item {
  position: relative;
  display: inline-block;
  margin: 5px;
  width: 236px;
  height: 236px;
  border-radius: 6px;
  box-sizing: border-box;
  object-fit: cover;
  background-color: #f6f6f6;
}
</style>