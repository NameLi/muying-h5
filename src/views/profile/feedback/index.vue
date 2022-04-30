<template>
  <page>
    <header-bar title="用户反馈" />

    <div class="main" v-if="isFeedback">
      <div class="success">反馈成功，感谢您的支持</div>
    </div>

    <div class="main" v-else>
      <div class="content">
        <textarea
          v-model="content"
          rows="6"
          :maxlength="maxlength"
          placeholder="请详细描述您遇到的问题，不低于10个字"
        />
        <div class="word-count">{{ wordLength }}/{{ maxlength }}</div>
      </div>

      <m-button
        type="primary"
        class="submit"
        :loading="submitLoading"
        @click="submit()"
        >提 交</m-button
      >
    </div>
  </page>
</template>

<script>
import { createFeedback } from "@/api/user";

export default {
  name: "Feedback",

  data() {
    return {
      isFeedback: false,
      maxlength: 200,
      content: "",
      submitLoading: false,
    };
  },

  computed: {
    wordLength() {
      return this.content.length;
    },
  },

  methods: {
    async submit() {
      if (this.submitLoading) return;

      if (this.wordLength < 2) {
        this.$message.warning("不能少于2个字");
        return;
      }

      let params = {
        content: this.content,
      };

      this.submitLoading = true;
      let res = await createFeedback(params);
      this.submitLoading = false;

      if (res.code === 200) {
        this.$toast(res.message);
        this.isFeedback = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  .main {
    padding: 30px;
    .success {
      height: 40vh;
      line-height: 40vh;
      text-align: center;
      font-size: 28px;
      color: $color-theme;
    }
    .content {
      position: relative;
      textarea {
        border: 0;
        background-color: #f5f5f5;
        width: 100%;
        border-radius: 8px;
        padding: 20px;
        font-size: 28px;
      }
      .word-count {
        z-index: 1;
        position: absolute;
        right: 15px;
        bottom: 15px;
      }
    }
    .submit {
      margin-top: 40px;
    }
  }
}
</style>