<template>
  <div class="basic-item">
    <div class="basic-poster">
      <img v-lazy="cover" class="basic-image" />
      <slot name="cover-view" />
    </div>

    <div class="basic-info">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicItem",

  props: {
    cover: {
      required: true,
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.basic-item {
  display: flex;
  padding: 16px 0;
  margin: 0 30px;
  .basic-poster {
    position: relative;
    width: 164px;
    height: 220px;
    overflow: hidden;
    border-radius: 6px;
    flex-shrink: 0;
    .basic-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: #f5f5f5;
    }
  }
  .basic-info {
    flex: 1;
    margin-left: 24px;
    width: 0;
  }
}
</style>
