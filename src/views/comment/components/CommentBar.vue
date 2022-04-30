<template>
  <div class="comment-bar">
    <div class="input-bar">
      <div class="virtual-input" @click="showCommentBox()">来点碎碎念...</div>
    </div>

    <comment-editor
      :id="id"
      :type="type"
      v-model="content"
      v-if="isShowEditor"
      @create-success="createSuccess"
    />
  </div>
</template>

<script>
import CommentEditor from "./CommentEditor.vue";

export default {
  name: "CommentBar",

  components: {
    CommentEditor,
  },

  props: {
    id: {
      required: true,
    },
    type: {
      required: true,
    },
  },

  data() {
    return {
      content: "",
    };
  },

  computed: {
    isShowEditor() {
      return this.$route.hash === "#edit";
    },
  },

  methods: {
    showCommentBox() {
      this.$router.push(`#edit`);
    },

    createSuccess() {
      this.content = "";
      this.$emit("create-success");
    },
  },
};
</script>

<style scoped lang="scss">
.comment-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 92px;
  border-top: 1px solid #eee;
  background-color: #fff;
  .input-bar {
    flex: 1;
    margin: 0 30px;
    .virtual-input {
      padding: 0 30px;
      height: 60px;
      line-height: 60px;
      font-size: 24px;
      border-radius: 60px;
      color: #999;
      background-color: #efefef;
    }
  }
}
</style>