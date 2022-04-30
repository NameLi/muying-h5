<template>
  <!-- 所属影视 -->
  <div class="movie-card-container">
    <div class="card" @click="$router.push(`/movies/${movie.id}`)">
      <img class="movie-poster" :src="movie.poster" />

      <div class="movie-info-wrapper">
        <div class="movie-header">
          <div class="movie-title ellipsis">{{ movie.title }}</div>

          <div class="movie-rating" v-if="movie.rating">
            <m-rate
              v-model="movie.rating"
              :step="2"
              :max="10"
              :size="20"
              readonly
              allow-half
            />
            <span class="rating">{{ movie.rating }}分</span>
          </div>
        </div>
        <div class="movie-info ellipsis">
          <span>{{ movie.year }}</span
          ><em v-if="movie.countries">·</em><span>{{ movie.countries }}</span
          ><em v-if="movie.genres">·</em><span>{{ movie.genres }}</span
          ><em v-if="movie.duration">·</em><span>{{ movie.duration }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movie: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
.movie-card-container {
  .card {
    padding: 20px;
    display: flex;
    color: #555;
    background-color: #f5f5f5;
    .movie-poster {
      display: block;
      width: 70px;
      height: 100px;
      object-fit: cover;
      border-radius: 3px;
      background: #f7f7f7;
    }
    .movie-info-wrapper {
      flex: 1;
      width: 0;
      padding-left: 20px;
      font-size: 28px;
    }
    .movie-header {
      display: flex;
      align-items: center;
      height: 56px;
      color: #444;
      font-weight: 700;
      .movie-title {
        max-width: 400px;
      }

      .movie-rating {
        font-size: 24px;
        padding: 0 16px;
        .rating {
          font-size: 20px;
          margin-left: 8px;
          color: #f16c00;
        }
        .rating-no {
          font-size: 20px;
          color: #666;
        }
      }
    }
    .movie-info {
      font-size: 24px;
      line-height: 40px;
      > em {
        margin: 0 6px;
        color: #aaa;
      }
    }
  }
}
</style>