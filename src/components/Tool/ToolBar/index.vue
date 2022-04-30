<template>
  <div class="tool-bar-wrapper">
    <div class="tool-bar">
      <div class="bar-tool-left">
        <!-- 评论虚拟框 -->
        <div
          v-if="!$slots.left"
          class="virtual-input"
          @click="pathToCommentEdit()"
        >
          来点碎碎念...
        </div>

        <!-- 自定义内容 -->
        <slot v-else name="left" />
      </div>

      <!-- 用户操作按钮 -->
      <div class="bar-tool">
        <!-- 自定义 -->
        <slot />

        <!-- 用户点赞 -->
        <user-like :type="type" :data="data" />

        <!-- 用户收藏 -->
        <user-collection :type="type" :data="data" />

        <!-- 用户评论 -->
        <div class="tool-item" @click="pathToComments()">
          <div class="tool-item-icon">
            <i class="iconfont icon-comment-fill"></i>
          </div>
          <div class="tool-item-count">{{ data.comment_count || "评论" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolBar",
  props: {
    // 资源类型，支持 photos、articles、videos等
    type: {
      required: true,
      type: String,
    },
    data: {
      type: Object,
    },
  },

  methods: {
    // 发布评论
    pathToCommentEdit() {
      const path = `/${this.type}/${this.data.id}/comments`;

      this.$router.push(path);

      setTimeout(() => {
        this.$router.push(`${path}#edit`);
      }, (1000 / 60) * 2);
    },

    // 评论列表
    pathToComments() {
      this.$router.push(`/${this.type}/${this.data.id}/comments`);
    },
  },
};
</script>

<style scoped lang="scss">
.tool-bar-wrapper {
  height: 100px;
  .tool-bar {
    z-index: 9;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 90px;
    border-top: 1px solid #eee;
    box-shadow: 0 0 4px #f5f5f5;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    color: rgb(127, 136, 155);
    .bar-tool-left {
      margin-left: 30px;
      height: 60px;
      flex: 1;
      .virtual-input {
        padding: 0 30px;
        height: 60px;
        line-height: 60px;
        font-size: 24px;
        border-radius: 60px;
        background-color: #efefef;
      }
    }
    .bar-tool {
      margin-left: 20px;
      text-align: center;
      ::v-deep .tool-item {
        vertical-align: top;
        display: inline-block;
        width: 80px;
        margin: 0 2px;
        &-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          > i {
            font-size: 40px;
          }
          &.is-checked {
            color: $color-theme;
          }
        }
        &-count {
          height: 32px;
          line-height: 28px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>