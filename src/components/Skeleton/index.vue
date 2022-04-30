<template>
  <div class="common-skeleton">
    <m-spinner type="triple" color="#f60, #7fd901, #36a2e0" />
  </div>
</template>

<script>
export default {
  name: "Skeleton",
};
</script>

<style scoped lang="scss">
.common-skeleton {
  z-index: 5;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
</style>