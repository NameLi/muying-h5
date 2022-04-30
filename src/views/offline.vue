<template>
  <div class="container">
    <header-bar title="离线" />
    <div class="main">
      <div class="inner">
        <p class="tip">网络出了点小问题</p>
        <m-button
          size="small"
          type="warning"
          round
          style="display: inline; width: 100px"
          @click="refresh()"
          :loading="loading"
          >刷新</m-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getVersion } from "@/api/common";

export default {
  name: "NotFound",

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    async refresh() {
      this.loading = true;
      const { code } = await getVersion();
      this.loading = false;

      if (code === 200) {
        this.$router.back();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 100px);
    text-align: center;
    .tip {
      margin-bottom: 40px;
			font-size: 32px;
			color: #777;
    }
  }
}
</style>