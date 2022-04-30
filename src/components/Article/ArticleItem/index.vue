<template>
  <div class="article-item border_bottom" @click="pathTo()">
    <div class="article-title">
      <h5>{{ article.title }}</h5>
    </div>

    <div class="article-author">
      <img class="author-avatar" :src="author.avatar" alt="" />
      <div class="author-name">{{ author.username }}</div>
    </div>

    <div class="article-content">
      <div class="article-brief">{{ article.brief }}</div>
      <div class="article-cover" v-if="article.cover">
        <img class="cover" v-lazy="article.cover" />
      </div>
    </div>

    <div class="article-footer">
      <div class="tool-item">{{ article.like_count }} 点赞</div>
      <em>·</em>
      <div class="tool-item">{{ article.read_count }} 浏览</div>
      <div style="flex: 1"></div>
      <div class="tool-item">{{ article.created_at | dateBefore }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    author() {
      return this.article?.author;
    },
  },

  methods: {
    pathTo() {
      this.$router.push(`/articles/${this.article.id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.article-item {
  position: relative;
  padding: 20px 32px;
  background-color: #fff;
  &:nth-last-child(1)::before {
    display: none;
  }
  .article-title {
    h5 {
      white-space: normal;
      text-align: justify;
      font-weight: bold;
      font-size: 28px;
      line-height: 40px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .article-author {
    display: flex;
    align-items: center;
    height: 68px;
    .author-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .author-name {
      margin-left: 6px;
      line-height: 40px;
      font-weight: bold;
      color: #676767;
    }
  }
  .article-content {
    display: flex;
    height: 88px;
    .article-brief {
      line-height: 1.6;
      font-size: 28px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal;
    }
    .article-cover {
      position: relative;
      margin-left: 12px;
      width: 160px;
      flex-shrink: 0;
      .cover {
        position: absolute;
        bottom: 6px;
        width: 160px;
        height: 120px;
        object-fit: cover;
        border-radius: 6px;
        background-color: #f5f5f5;
      }
    }
  }

  .article-footer {
    margin-top: 12px;
    display: flex;
    align-items: center;
    height: 48px;
    color: rgb(176, 179, 187);
    em {
      margin: 0 16px;
    }
  }
}
</style>