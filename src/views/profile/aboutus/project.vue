<template>
  <page>
    <header-bar title="关于项目" />

    <div class="main">
      <m-cell-group border card>
        <m-cell title="项目名称" value="慕影网" />
        <m-cell title="技术栈">
          <span>vue2.6/vue-router/vuex/axios</span>
        </m-cell>
        <m-cell title="使用组件" value="mind-ui-vue" />
        <m-cell title="组件文档">
          <a class="link" href="https://mind-ui.ixook.com" target="_black"
            >https://mind-ui.ixook.com</a
          >
        </m-cell>
        <m-cell title="QQ群" value="577133021" />
      </m-cell-group>
    </div>
  </page>
</template>

<script>
export default {
  name: "AboutProject",
};
</script>

<style scoped lang="scss">
.main {
  overflow: hidden;
  height: calc(100vh - 100px);
  background-color: #f5f5f5;
  .link {
    display: inline-block;
    word-break: break-all;
    width: 400px;
    text-align: right;
    color: $color-theme;
  }
}
</style>