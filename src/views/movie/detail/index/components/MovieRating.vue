<template>
  <div class="movie-rating-wrapper">
    <div class="wish-count" v-if="movie.release_status === 1">
      <div class="count-inner">
        <span class="count">{{ movie.wish_count }}</span>
        <span class="count-label">人想看</span>
      </div>
      <div class="release-date">{{ movie.release_date }}上映</div>
    </div>

    <div
      class="rating-container"
      v-else-if="imdb.rating || movie.rating || douban.rating"
    >
      <!-- IMDB评分 -->

      <template v-if="imdb.rating">
        <div class="rating-map">
          <div class="rating-from">IMDB评分</div>
          <div class="rating-score">{{ imdb.rating }}</div>
          <div class="rating-count">{{ imdb.count }}人评</div>
        </div>

        <div class="line"></div>
      </template>

      <!-- 用户评分 -->
      <template v-if="movie.rating">
        <div class="rating-map" @click="pathToRate()">
          <div class="rating-from">慕影评分</div>
          <div class="rating-score">{{ movie.rating }}</div>
          <div class="rating-count">{{ movie.vote_count }}人评</div>
        </div>

        <div class="line"></div>
      </template>

      <!-- 豆瓣评分 -->
      <template v-if="douban.rating">
        <div class="rating-map">
          <div class="rating-from">
            豆瓣评分<i
              class="iconfont icon-question-fill"
              @click="showDoubanRatingTip()"
            ></i>
          </div>
          <div class="rating-score">{{ douban.rating }}</div>
          <div class="rating-count">{{ douban.count }}人评</div>
        </div>
      </template>
    </div>

    <div v-else class="no-rating">
      <span>暂无评分</span>
    </div>

    <!-- <div class="rating-footer">
      <div class="status-count">
        <div class="count-item" style="margin-right: 8px">{{ movie.wish_count }} 人想看</div>
        <div class="count-item">{{ movie.seen_count }} 人看过</div>
      </div>
    </div> -->

    <m-modal
      title="豆瓣评分"
      :visible.sync="visible"
      :show-cancel-button="false"
      confirm-button-text="我知道了"
      confirm-text-color="#feb300"
    >
      <div class="tip-content">
        <p>豆瓣评分获取于互联网公开数据，如涉及版权问题，可联系作者删除。</p>
      </div>
    </m-modal>
  </div>
</template>

<script>
export default {
  name: "MovieRating",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      visible: false,
    };
  },

  computed: {
    imdb() {
      return this.movie.thrid_rating?.imdb || { rating: 0, count: 0 };
    },
    douban() {
      return this.movie.thrid_rating?.douban || { rating: 0, count: 0 };
    },
  },
  methods: {
    // 豆瓣评分描述
    showDoubanRatingTip() {
      this.visible = true;
    },

    // 评分详情
    pathToRate() {
      this.$router.push(`/movies/${this.movie.id}/rating`);
    },
  },
};
</script>

<style scoped lang="scss">
.movie-rating-wrapper {
  margin: 10px 20px;
  border-radius: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.25);
  padding: 30px 0;
  .wish-count {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 136px;
    .count-inner {
      .count {
        padding: 0 10px;
        font-size: 48px;
        color: rgb(254, 179, 0);
        font-weight: bold;
      }
    }
    .release-date {
      position: absolute;
      right: 20px;
      bottom: -15px;
      color: #e5e5e5;
    }
  }
  .no-rating {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 136px;
  }
  .rating-container {
    display: flex;
    justify-content: space-around;
    .rating-map {
      min-width: 120px;
      text-align: center;
      .rating-from {
        position: relative;
        .icon-question-fill {
          position: absolute;
          top: -20px;
          right: -26px;
          font-size: 28px;
          padding: 10px;
        }
      }

      .rating-score {
        height: 76px;
        line-height: 76px;
        font-size: 44px;
        font-weight: bold;
        color: rgb(254, 179, 0);
      }
      .rating-count {
        color: #fff;
      }
    }
    .line {
      width: 1px;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .rating-footer {
    .status-count {
      display: flex;
      align-items: center;
      justify-content: right;
      margin: 40px 30px 0;
      color: #999;
    }
  }

  .tip-content {
    text-align: left;
    p {
      text-align: justify;
      line-height: 1.6;
    }
    .update-time {
      margin-top: 28px;
      color: #aaa;
      font-size: 24px;
      text-align: right;
    }
  }
}
</style>