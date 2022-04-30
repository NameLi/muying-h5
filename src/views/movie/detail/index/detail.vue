<template>
  <page footer-close>
    <div class="skeleton-wrapper" v-if="loading">
      <div class="skeleton"></div>
      <div class="skeleton"></div>
      <div class="skeleton"></div>
      <div class="skeleton" style="width: 32%"></div>
    </div>

    <div class="detail-main">
      <div class="detail-content">
        <div class="detail-header">
          <div class="detail-title">基本信息</div>
        </div>
        <div class="item">
          <div class="label">片名：</div>
          <div class="value">{{ movie.title }}</div>
        </div>
        <div class="item" v-if="movie.title_original">
          <div class="label">原名：</div>
          <div class="value">
            <span>{{ movie.title_original }}</span>
          </div>
        </div>
        <div class="item">
          <div class="label">别名：</div>
          <div class="value">
            <span>{{ movie.akas }}</span>
          </div>
        </div>
        <div class="item">
          <div class="label">类别：</div>
          <div class="value">{{ movie.category }}</div>
        </div>
        <div class="item">
          <div class="label">类型：</div>
          <div class="value">{{ movie.genres }}</div>
        </div>
        <div class="item">
          <div class="label">上映：</div>
          <div class="value">{{ movie.pubdates }}</div>
        </div>

        <div class="item" v-if="movie.season_count">
          <div class="label">季数：</div>
          <div class="value">第 {{ movie.season_count }} 季</div>
        </div>
        <div class="item" v-if="movie.episode_count">
          <div class="label">集数：</div>
          <div class="value">共 {{ movie.episode_count }} 集</div>
        </div>

        <div class="item" v-if="movie.durations">
          <div class="label">片长：</div>
          <div class="value">
            {{ isEpisode ? "每集" : "" }}{{ movie.durations }}分钟
          </div>
        </div>

        <div class="item">
          <div class="label">地区：</div>
          <div class="value">{{ movie.countries }}</div>
        </div>
        <div class="item">
          <div class="label">色彩：</div>
          <div class="value">{{ movie.color === 0 ? "黑白" : "彩色" }}</div>
        </div>
        <div class="item">
          <div class="label">语言：</div>
          <div class="value">{{ movie.languages }}</div>
        </div>
      </div>

      <div class="detail-content">
        <div class="detail-header">
          <div class="detail-title">简介</div>
        </div>
        <div class="summary">
          <div v-if="movie.summary" v-html="movie.summary"></div>
          <div v-else class="no-summary">暂无简介</div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  name: "MovieDetail",

  props: {
    loading: {
      type: Boolean,
    },
    movie: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isEpisode() {
      return this.movie.episode_count;
    },
  },
};
</script>

<style scoped lang="scss">
.skeleton-wrapper {
  z-index: 3;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding-top: 20px;
  background-color: rgba(255, 255, 255, 5);
  .skeleton {
    height: 32px;
    margin: 20px 20px;
    border-radius: 4px;
    background-color: #f5f5f5;
  }
}
.detail-main {
  padding: 20px 30px;
  .detail-content {
    padding-bottom: 20px;
    .detail-header {
      position: relative;
      display: flex;
      align-items: center;
      height: 80px;
      .detail-title {
        font-size: 28px;
        font-weight: bold;
      }
    }
    .item {
      padding: 15px 0;
      line-height: 50px;
      display: flex;
      font-size: 28px;
      .label {
        min-width: 100px;
        color: #666;
      }
      .value {
        flex: 1;
        color: #333;
        width: 0;
        word-break: break-all;
      }
    }
    .summary {
      font-size: 28px;
      line-height: 56px;
      color: #444;
      text-align: justify;
      word-break: break-all;
      .no-summary {
        text-align: center;
        font-size: 28px;
        color: #999;
      }
    }
  }
}
</style>