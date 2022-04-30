<template>
  <div class="container">
    <!-- 搜索栏 -->
    <search-bar
      v-model="keyword"
      @keyword-change="storageKeyword"
      @on-clear="clearKeyword()"
    />

    <!-- 搜索结果 -->
    <search-result
      v-show="keyword"
      :keyword="keyword"
      @keyword-change="storageKeyword"
    />

    <!-- 未搜索时显示内容 -->
    <div v-show="!keyword">
      <!-- 导航菜单 -->
      <!-- <search-menu /> -->

      <!-- 历史搜索记录 -->
      <search-history
        :histories="histories"
        @on-clear="clearHistories"
        @on-keyword="keywordChange"
      />
    </div>
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar";
import SearchMenu from "./components/SearchMenu";
import SearchHistory from "./components/SearchHistory";
import SearchResult from "./components/SearchResult";

export default {
  name: "Search",

  components: { SearchMenu, SearchBar, SearchHistory, SearchResult },

  data() {
    return {
      keyword: "", //	搜索内容
      histories: [],
    };
  },

  computed: {
    hasHistory() {
      return !!this.histories.length;
    },
  },

  created() {
    this.getHistories();
  },

  methods: {
    // 历史搜索记录
    getHistories() {
      const histories = localStorage.getItem("histories");

      if (histories) {
        try {
          this.histories = JSON.parse(histories);
        } catch (e) {
          console.warn(e);
        }
      } else {
        this.histories = [];
      }
    },

    // 选择历史记录中的关键字
    keywordChange(keyword) {
      this.keyword = keyword;
    },

    // 清空历史记录
    clearHistories() {
      localStorage.removeItem("histories");
      this.histories = [];
    },

    // 清空搜索内容
    clearKeyword() {
      this.keyword = "";
    },

    // 搜索关键字存储
    storageKeyword(keyword) {
      if (!keyword) return;

      this.getHistories();

      if (!this.histories.includes(keyword)) {
        if (this.histories.length > 20) {
          this.histories.pop();
        }

        this.histories.unshift(keyword);
        localStorage.setItem("histories", JSON.stringify(this.histories));
      }
    },
  },
};
</script>

<style scoped lang="scss">
.recommend {
  padding: 5px 10px;
  border-bottom: 10px solid #eee;
}
.history {
  padding: 5px 10px;
}
.title {
  margin: 0 8px;
  line-height: 30px;
  color: #666;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.title > i {
  width: 30px;
  text-align: center;
}
.list > li {
  display: inline-block;
  padding: 5px 10px 4px;
  color: #666;
  margin: 7px;
  border: 1px solid #eee;
  font-size: 14px;
  border-radius: 20px;
}

.no-history {
  margin-top: 30px;
  text-align: center;
  color: #aaa;
  font-size: 14px;
}
</style>
