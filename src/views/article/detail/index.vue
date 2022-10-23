<template>
  <div class="article">
    <header-bar>
      <div class="header-author" :class="{ 'is-show': isShowHeaderAuthor }">
        <img class="header-author-avatar" :src="author.avatar" alt="" />
        <div class="header-author-name">{{ author.username }}</div>
      </div>
    </header-bar>

    <!-- 加载 -->
    <skeleton v-if="loading" />

    <div class="article-main">
      <h2 class="article-title">{{ article.title }}</h2>

      <div class="article-header">
        <div class="author">
          <img class="author-avatar" :src="author.avatar" alt="" />
          <div class="author-info">
            <div class="author-name">{{ author.username }}</div>
            <div class="article-info">{{ article.created_at }}</div>
          </div>
        </div>
        <div class="read-count">{{ article.read_count }}阅读</div>
      </div>

      <img v-if="article.cover" class="article-cover" :src="article.cover" />

      <div class="article-content" v-html="article.content"></div>
    </div>

    <!-- <movie-card v-if="article.movie" :movie="article.movie"></movie-card> -->

    <tool-bar type="articles" :data="article" />

    <transition name="layer">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { throttle } from "@/util";
import { getArticle } from "@/api/article";
// import ToolBar from "./components/ToolBar.vue";
import Skeleton from "./components/Skeleton";

export default {
  name: "Article",

  components: {
    // ToolBar,
    Skeleton,
  },

  props: ["id"],

  data() {
    return {
      loading: false,
      article: {
        movie: {},
        author: {},
      },
      scrollTop: 0,
      scrollTopValue: 0,
      endTop: 160,
    };
  },

  computed: {
    author() {
      return this.article.author;
    },
    isShowHeaderAuthor() {
      return this.scrollTop > 70;
    },
  },

  created() {
    document.title = "加载中...";
  },

  mounted() {
    this.getArticle();
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    async getArticle() {
      this.loading = true;
      const { code, data } = await getArticle(this.id);
      this.loading = false;

      if (code === 200) {
        this.article = data;

        document.title = data.title;
      }
    },

    handleScroll: throttle(function () {
      this.getScrollTop();
    }),

    getScrollTop() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      // 只有在滚动范围内时改变 scrollTop 值以优化滚动
      if (this.scrollTopValue <= this.endTop + 20) {
        this.scrollTop = scrollTop;
      }
      this.scrollTopValue = scrollTop;
    },
  },
};
</script>

<style lang="scss">
.article-content {
  img {
    max-width: 100%;
  }
}
// 影片信息卡
.subject-card-item {
  display: flex;
  margin: 12px 0;
  padding: 18px;
  border-radius: 12px;
  background-color: #fafafa;
  .subject-card-delete {
    display: none;
  }
  .subject-card-poster {
    img {
      margin: 0 !important;
      padding: 0;
      width: 122px;
      height: 178px;
      border-radius: 6px;
      object-fit: cover;
      background-color: #f5f5f5;
    }
  }
  .subject-card-info {
    flex: 1;
    margin-left: 20px;
    .subject-card-info-title {
      font-size: 32px;
      line-height: 40px;
      font-weight: bold;
    }
    .subject-card-info-list {
      margin-top: 10px;
      .subject-card-info-rating {
        color: $color-theme;
        font-size: 28px;
      }
      .subject-card-info-item {
        margin-top: 10px;
        font-size: 28px;
        color: #999;
        line-height: 44px;
      }
    }
  }
}
</style>

<style scoped lang="scss">
.article {
  padding-bottom: 40px;
  .header-author {
    display: flex;
    align-items: center;
    height: 100px;
    opacity: 0;
    transition: all 0.2s;
    transform: translateY(40px);
    &.is-show {
      opacity: 1;
      transform: translateY(0);
    }
    &-avatar {
      width: 40px;
      border-radius: 50%;
    }
    &-name {
      margin-left: 16px;
      font-size: 24px;
      font-weight: normal;
    }
  }
  .article-main {
    padding: 20px 30px;
    .article-title {
      padding: 16px 0;
      font-size: 36px;
      line-height: 60px;
      font-weight: bold;
      text-align: justify;
    }
    .article-header {
      display: flex;
      justify-content: space-between;
      align-content: center;
      padding: 30px 0;
      .read-count {
        line-height: 70px;
        color: #999;
      }
      .author {
        display: flex;
        .author-avatar {
          height: 70px;
          width: 70px;
          border-radius: 50%;
        }
        .author-info {
          margin-left: 20px;
          line-height: 34px;
          .author-name {
            font-weight: bold;
            font-size: 28px;
          }
          .article-info {
            font-size: 24px;
            color: #999;
          }
        }
      }
    }

    .article-cover {
      width: 100%;
      border-radius: 12px;
    }

    .article-content {
      margin-top: 30px;
      font-size: 32px;
      line-height: 1.6;
      ::v-deep img {
        display: block;
        margin: 20px auto;
      }
    }
  }
}
</style>