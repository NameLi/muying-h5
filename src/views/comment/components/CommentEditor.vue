<template>
  <div class="comment-box">
    <div class="cover" @click="back()"></div>
    <div class="comment-main" ref="commentMain">
      <div class="comment-header" v-if="to">
        <div class="to-user">评论给 {{ to.username }}</div>
      </div>

      <div
        @input="inputChange"
        contenteditable
        ref="input"
        class="comment-edit"
        :style="style"
        autosize
        placeholder="爱笑的人运气不会太差~"
      ></div>

      <div class="comment-footer">
        <div class="tool-item"></div>
        <div
          v-if="!submitLoading"
          class="tool-item submit"
          :class="{ disabled: disabled }"
          @mousedown="submit"
        >
          发布
        </div>
        <div class="submit" v-else><m-spinner type="snake" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { createComment } from "@/api/common";

export default {
  name: "CommentEditor",

  props: {
    id: {
      required: true,
    },
    type: {
      required: true,
    },
    to: {},
  },

  data() {
    return {
      content: "",
      submitLoading: false,
      style: "",
    };
  },

  computed: {
    disabled() {
      return !this.content.length;
    },
  },

  mounted() {
    this.$refs.input.innerHTML = this.$parent.content;

    this.content = this.$parent.content;

    const _this = this;

    var originalHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    window.onresize = function () {
      //键盘弹起与隐藏都会引起窗口的高度发生变化
      var resizeHeight =
        document.documentElement.clientHeight || document.body.clientHeight;

      if (resizeHeight - 0 < originalHeight - 0) {
        //软键盘弹起
      } else {
        //软键盘收起
        _this.$router.back();
      }
    };

    this.$nextTick(() => {
      this.$refs.input.focus();

      let range = window.getSelection();
      range.selectAllChildren(this.$refs.input);
      range.collapseToEnd(); //光标移至最后

      setTimeout(() => {
        this.inputFocus();
      }, 300);
    });
  },

  beforeDestroy() {
    window.onresize = null;
  },

  methods: {
    inputFocus() {
      const height = window.innerHeight - 112;
      this.style = `max-height: ${height}px`;
    },

    inputChange(event) {
      this.content = event.target.innerHTML;
      this.$emit("input", event.target.innerHTML);
    },

    // 返回上一页
    back() {
      if (this.submitLoading) return;

      this.$router.back();
    },

    // 提交评论
    async submit(event) {
      // 阻止输入框失去光标
      event.preventDefault();

      if (this.content.length < 2) {
        this.$message.warning("不能少于2个字");
        return;
      }

      const params = {
        content: this.content,
      };

      this.submitLoading = true;
      let res = await createComment(this.type, this.id, params);
      this.submitLoading = false;

      if (res.code === 200) {
        this.$toast({
          position: "top",
          message: "评论成功",
        });

        this.$emit("create-success");

        this.back();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.cover {
  z-index: 101;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.35);
}

.comment-main {
  z-index: 102;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 0 30px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 20px 20px 0 0;
  .comment-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    font-size: 28px;
    color: #777;
  }
  .comment-edit {
    flex: 1;
    margin-top: 30px;
    min-height: 60px;
    line-height: 1.4;
    font-size: 32px;
    background: none;
    border: none;
    outline: none;
    overflow: auto;
    &:empty::after {
      content: attr(placeholder);
      color: #ccc;
      font-size: 28px;
    }
  }

  .comment-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    line-height: 60px;
    .submit {
      font-size: 32px;
      width: 70px;
      text-align: center;
      color: $color-theme;
      &.disabled {
        opacity: 0.55;
      }
    }
  }
}
</style>