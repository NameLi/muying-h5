<template>
  <div class="award-item border_bottom">
    <div class="award-year">{{ award.year }}年</div>

    <div class="award-children" v-for="item in award.children" :key="item.id">
      <div class="award-info">
        <div class="award-title">第{{ item.session }}届 {{ item.award }}</div>
        <div class="award-type">
          {{ item.type }} {{ item.win === 1 ? "(提名)" : "" }}
        </div>
      </div>
      <div class="award-movie" v-if="item.movie">
        <div class="movie-poster">
          <img :src="item.movie.poster" alt="" />
        </div>
        <div class="movie-detail">
          <div class="movie-title">{{ item.movie.title }}</div>
          <div class="movie-rating">
            <m-rate
              v-model="item.movie.rating"
              :size="20"
              :step="2"
              :max="10"
              allow-half
              readonly
            />
            <span class="rating-value">{{ item.movie.rating }}</span>
          </div>
          <div class="movie-info">
            {{ item.movie.year }} / {{ item.movie.genres }} /
            {{ item.movie.countries }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AwardItem",
  props: {
    award: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.award-item {
  padding: 25px 30px;
  .award-year {
    font-size: 28px;
    height: 40px;
    line-height: 40px;
    color: #777;
  }
  .award-children {
    padding-top: 22px;
    .award-info {
      font-size: 28px;
      .award-title {
        font-weight: bold;
        line-height: 40px;
      }
      .award-type {
        margin-top: 10px;
        font-size: 24px;
        color: #999;
      }
    }
    .award-movie {
      display: flex;
      margin-top: 20px;
      padding: 8px 12px;
      background-color: #f5f5f5;
      .movie-poster {
        width: 72px;
        > img {
          width: 72px;
          height: 106px;
          border-radius: 6px;
          object-fit: cover;
        }
      }
      .movie-detail {
        margin-left: 20px;
        .movie-title {
          font-size: 24px;
          font-weight: bold;
        }
        .movie-rating {
          margin-top: 6px;
          .rating-value {
            color: #f7ba2a;
          }
        }
        .movie-info {
          margin-top: 6px;
          color: #777;
          line-height: 1.6;
        }
      }
    }
  }
}
</style>