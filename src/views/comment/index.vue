<template>
  <page half :round="isRound" :top="top" title="全部评论">
    <!-- 头部操作 -->
    <div class="comment-header">
      <div class="comment-count" v-if="total">评论 {{ total }}</div>
      <div class="comment-type" v-if="total">
        <tab-switch @change="onChange" :disabled="loading" />
      </div>
    </div>

    <!-- 评论内容区 -->
    <div
      class="comment-list"
      v-infinite-scroll="loadMore"
      :infinite-scroll-distance="100"
    >
      <comment-item
        v-for="comment in list"
        :key="comment.id"
        :comment="comment"
        :type="type"
        @show-action-sheet="showActionSheetHandle"
      />

      <!-- 加载动画，放 v-infinite-scroll 指令里面是因为指令存在同级元素v-if时会渲染错误 -->
      <div class="skeleton" v-if="isShowSkeleton">
        <div class="skeleton-animation">
          <comment-skeleton v-for="n in 4" :key="n" />
        </div>
      </div>

      <m-loadmore :loading="loading" v-if="total && page !== 1" />

      <no-data v-if="!total && !loading">还没有用户发表过评论</no-data>
    </div>

    <comment-tool ref="commentTool" @on-delete="deleteHandle" />

    <!-- 评论发布 -->
    <template v-slot:footer>
      <div class="comment-bar">
        <comment-bar v-if="!isShowSkeleton" :id="id" :type="type" @create-success="getComments" />
      </div>
    </template>
  </page>
</template>

<script>
import CommentBar from "./components/CommentBar.vue";
import CommentItem from "./components/CommentItem.vue";
import CommentTool from "./components/CommentTool.vue";
import CommentSkeleton from "./components/CommentSkeleton.vue";
import { getComments } from "@/api/common";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "Comments",

  components: {
    CommentBar,
    CommentItem,
    CommentSkeleton,
    CommentTool,
  },

  mixins: [getInfiniteData],

  props: ["id", "comment_count"],

  data() {
    return {
      form: {
        sortby: "hot",
      },
      type: "",
      isRound: true,
      top: "",
      visible: false,
      actions: [],
    };
  },

  beforeMount() {
    this.type = this.$route.path.split("/")[1];

    if (this.type === "videos") {
      this.isRound = false;
      this.top = 100 * 0.56 + "vw";
    } else {
      this.top = 100 / 75 + "rem";
    }
  },

  methods: {
    onChange(value) {
      if (this.form.sortby === value) return;

      this.page = 1;
      this.list = [];
      this.form.sortby = value;
      this.loadMore();
    },
    // 获取评论
    getComments() {
      this.onChange();
    },

    loadMore() {
      this.getData(getComments, this.type, this.id);
    },

    // 显示操作表单
    showActionSheetHandle(comment) {
      this.$refs.commentTool.show(comment);
    },

    // 删除评论
    deleteHandle(comment) {
      const index = this.list.findIndex((c) => c.id === comment.id);
      if (index > -1) {
        Object.assign(this.list[index], comment);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 80px;
  font-size: 28px;
  .comment-count {
    font-weight: bold;
  }
}
.comment-bar {
  height: 92px;
}
.no-comment-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 300px);
  .no-comment {
    color: #aaa;
    font-size: 28px;
  }
}
</style>