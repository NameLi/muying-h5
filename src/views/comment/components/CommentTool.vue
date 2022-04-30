<template>
  <div>
    <!-- 用户操作 -->
    <m-action-sheet
      :visible="visible"
      :actions="actions"
      @cancel="handleCancel"
      @click="handleClickItem"
      show-cancel
    />

    <!-- 举报 -->
    <report ref="reportModal" @on-success="reportHandle" />
  </div>
</template>

<script>
import { deleteComment } from "@/api/common";

export default {
  name: "CommentTool",

  data() {
    return {
      visible: false,
      actions: [],
      comment: null,
    };
  },

  methods: {
    show(comment) {
      this.comment = comment;

      this.showAction();
    },

    showAction() {
      if (this.comment.is_author) {
        this.actions = [
          {
            loading: false,
            type: "delete",
            name: "删除",
            color: "#ff0000",
          },
        ];
      } else {
        this.actions = [
          {
            loading: false,
            type: "report",
            name: "举报",
            icon: "jubao1",
            color: "#ff0000",
          },
        ];
      }

      this.visible = true;
    },

    handleClickItem(index) {
      const type = this.actions[index].type;

      if (type === "delete") {
        this.deleteComment(index);
      } else if (type === "report") {
        this.showReportModal();
      }
    },

    // 举报评论
    showReportModal() {
      this.$refs.reportModal.open(this.comment.id, "comments");
    },

    // 举报成功回调
    reportHandle() {
      this.visible = false;
    },

    // 删除评论
    async deleteComment(index) {
      this.actions[index].loading = true;
      let { code, data, message } = await deleteComment(this.comment.id);
      this.actions[index].loading = false;

      if (code === 200) {
        this.$toast({
          position: "top",
          message,
        });

        this.visible = false;

        this.$emit("on-delete", data);
      }
    },

    handleCancel() {
      this.visible = false;
    },
  },
};
</script>

<style scoped lang="scss">
</style>