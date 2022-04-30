<template>
  <div class="comment-item">
    <div class="comment-header" v-if="author">
      <img class="author-avatar" v-lazy="author.avatar" />

      <div class="author-info">
        <div class="author-name">{{ author.username }}</div>

        <!-- 影视用户评分 -->
        <template v-if="type === 'movie'">
          <m-rate
            class="author-rating"
            v-model="comment.rating"
            :size="20"
            :step="2"
            :max="10"
            readonly
            allow-half
          />
        </template>
      </div>

      <div class="more" @click="showActionSheet" v-if="comment.is_delete === 0">
        <m-icon name="more" size="24" />
      </div>
    </div>

    <div class="comment-content" v-if="comment.is_delete">
      <div class="is-delete">{{ comment.content }}</div>
    </div>

    <div v-else class="comment-content" v-html="comment.content"></div>

    <div class="comment-footer">
      <div class="comment-date">{{ comment.created_at | dateBefore }}</div>

      <div class="tool-list" v-if="comment.is_delete === 0">
        <div class="tool-item" @click="likeClick()">
          <span>{{ comment.like_count }}</span>
          <div
            class="like-icon"
            :class="{
              'is-active': comment.is_like === 1,
              'is-disabled': comment.allow_like === 0,
            }"
          >
            <m-icon
              name="like-fill"
              :color="comment.is_like === 1 ? 'red' : ''"
              size="28"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createCommentLike, deleteCommentLike } from "@/api/user";

export default {
  name: "CommentItem",
  props: {
    comment: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
    },
  },

  computed: {
    author() {
      return this.comment?.author;
    },
  },

  methods: {
    // 喜欢
    async likeClick() {
      if (this.comment.allow_like === 0) {
        return;
      }

      if (this.loading) return;

      this.loading = true;
      let { code, data } = this.comment.is_like
        ? await deleteCommentLike(this.comment.id)
        : await createCommentLike(this.comment.id);
      this.loading = false;

      if (code === 200) {
        Object.assign(this.comment, data);
      }
    },

    // 评论操作
    showActionSheet() {
      this.$emit("show-action-sheet", this.comment);
    },
  },
};
</script>

<style scoped lang="scss">
.comment-item {
  padding: 30px 0;
  margin: 0 20px;
  position: relative;
  .comment-header {
    display: flex;
    align-items: center;
    height: 60px;
    .author-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #f7f7f7;
    }
    .author-info {
      margin-left: 20px;
      flex: 1;
      .author-name {
        font-size: 24px;
      }
      .author-rating {
        height: 32px;
        line-height: 32px;
      }
    }
    .more {
      width: 40px;
      text-align: center;
    }
  }
  .comment-content {
    font-size: 28px;
    padding: 12px 0 4px 70px;
    line-height: 44px;
    color: #333;
    word-break: break-all;
    .is-delete {
      display: inline-block;
      padding: 0 12px;
      background-color: #f5f5f5;
      font-size: 24px;
      border-radius: 6px;
      color: #999;
    }
  }
  .comment-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0 0 70px;
    height: 44px;
    color: #999;
    font-size: 24px;
    &::before {
      content: "";
      border-bottom: 1px solid #f5f5f5;
      background: #f0f0f0;
      position: absolute;
      left: 70px;
      right: 0;
      bottom: 0;
    }

    .tool-list {
      display: flex;
      align-items: center;
      .tool-item {
        padding: 5px 10px;
        min-width: 70px;
        text-align: right;
        .like-icon {
          display: inline-block;
          margin-left: 6px;
          &.is-active {
            animation: jump 0.4s ease-in-out;
          }
          &.is-disabled {
            animation: none;
            .m-icon {
              color: #ccc !important;
            }
          }
        }
        .m-icon {
          font-size: 24px;
        }
      }
    }
  }
}
@keyframes jump {
  0% {
    transform: scale(1);
  }

  60% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>