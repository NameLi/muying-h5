<template>
  <div class="menu-cell">
    <m-cell-group border card v-if="user">
      <m-cell
        icon="tag"
        icon-color="#ffbe10"
        title="我的资料"
        url="/profile/information"
      />

      <m-cell
        icon="star"
        icon-color="#ffbe10"
        title="影片收藏夹"
        url="/profile/favorites"
      />
    </m-cell-group>

    <m-cell-group border card>
      <m-cell
        icon="feed"
        icon-color="#ffbe10"
        title="意见反馈"
        url="/profile/feedback"
      />
      <m-cell
        icon="boy"
        icon-color="#ffbe10"
        title="关于作者"
        url="/profile/author"
      />
      <m-cell
        icon="aboutus"
        icon-color="#ffbe10"
        title="关于项目"
        url="/profile/project"
      />
      <m-cell
        icon="edit"
        icon-color="#ffbe10"
        title="更新日志"
        url="/profile/changelog"
      />
      <m-cell
        icon="set"
        icon-color="#ffbe10"
        title="设置"
        url="/profile/setting"
      />
    </m-cell-group>
  </div>
</template>

<script>
export default {
  name: "MineCell",
  props: {
    user: {
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.menu-cell {
  ::v-deep .m-cell__group--card {
    box-shadow: 0 0 24px #eee;
    .m-cell {
      margin: 0 30px;
      padding-left: 0;
      padding-right: 0;
    }
  }
  .log {
    padding-left: 300px;
  }
}
</style>