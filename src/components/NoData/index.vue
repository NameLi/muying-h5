<template>
  <div class="no-data-container" ref="noData" :style="{ height: height }">
    <div class="no-data" v-if="showContent">
      <p v-if="!$slots.default">{{ content }}</p>
      <slot v-else />
    </div>
  </div>
</template>

<script>
export default {
  name: "NoData",
  props: {
    type: {
      type: String,
    },
    content: {
      type: String,
      default: "暂无数据",
    },
  },
  data() {
    return {
      height: "",
      showContent: false,
    };
  },
  mounted() {
    try {
      setTimeout(() => {
        let top = this.$refs.noData?.parentNode?.getBoundingClientRect().top;
        this.height = `calc(100vh - ${top + 100}px)`;
        this.showContent = true;
      }, 300);
    } catch (error) {
      console.warn(error);
    }
  },
};
</script>

<style scoped lang="scss">
.no-data-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .no-data {
    color: #aaa;
    font-size: 28px;
  }
}
</style>
