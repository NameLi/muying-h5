<template>
  <!-- logo信息 -->
  <div class="app-info">
    <img class="app-logo" src="~images/logo.png" alt="" />
    <div class="app-name">{{ APP_NAME }}</div>
  </div>
</template>

<script>
import { APP_NAME } from "@/config";

export default {
  name: "FooterInfo",
  data() {
    return {
      APP_NAME,
    };
  },
};
</script>

<style scoped lang="scss">
.app-info {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  color: #cbcbcb;
  .app-logo {
    width: 40px;
    height: 40px;
    filter: grayscale(100%);
    opacity: 0.5;
  }
  .app-name {
    margin-left: 6px;
  }
}
</style>