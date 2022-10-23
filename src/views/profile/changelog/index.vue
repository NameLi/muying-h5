<template>
  <page>
    <header-bar title="更新日志" />

    <div class="container">
      <m-timeline>
        <m-timeline-item text="v0.1.2">
          <div class="content">
            <div class="title">2022-10-23</div>
            <div class="intro">
              <p>1.优化影视、影人等页面 header-bar 显示效果</p>
              <p>2.修复 tab-switch 由于组件库升级导致样式异常</p>
              <p>3.收藏夹列表增加创建收藏夹入口</p>
              <p>4.增加更新日志页面</p>
              <p>5.其它一些样式优化</p>
            </div>
          </div>
        </m-timeline-item>

        <m-timeline-item text="v0.1.1">
          <div class="content">
            <div class="title">2022-10-22</div>
            <div class="intro">
              修复 keep-alive 页面切换时滚动触底持续触发问题
            </div>
          </div>
        </m-timeline-item>

        <m-timeline-item text="v0.1">
          <div class="content">
            <div class="title">2022-06-12</div>
            <div class="intro">项目开发文档发布</div>
          </div>
        </m-timeline-item>

        <m-timeline-item text="v0.1">
          <div class="content">
            <div class="title">2022-05-01</div>
            <div class="intro">项目源码、在线演示版、接口文档发布</div>
          </div>
        </m-timeline-item>

        <m-timeline-item text="idea">
          <div class="content">
            <div class="title">2022-03-27</div>
            <div class="intro">项目初始化</div>
          </div>
        </m-timeline-item>
      </m-timeline>
    </div>
  </page>
</template>

<script>
export default {
  name: "ChangeLog",
};
</script>

<style scoped lang="scss">
.container {
  padding-top: 20px;
  .content {
    padding: 32px;
    border-radius: 6px;
    background-color: #f1f1f1;
    .title {
    }
    .intro {
      padding-top: 10px;
      line-height: 1.6;
      color: #666;
      font-size: 24px;
    }
  }
}
</style>