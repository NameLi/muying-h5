<template>
  <div class="movie-row" @click="pathTo()">
    <div class="poster-wrapper">
      <img v-lazy="movie.poster" class="img-cover" />
      <div class="info">
        <span v-if="movie.episode_count">全{{ movie.episode_count }}集</span>
        <label v-if="movie.rating">{{ movie.rating }}</label>
      </div>
    </div>
    <h6 class="title">{{ movie.title }}</h6>
  </div>
</template>

<script>
export default {
  name: "MovieRow",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },

  methods: {
    pathTo() {
      this.$store.commit("SET_MOVIE", this.movie);
      this.$router.push(`/movies/${this.movie.id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.movie-row {
  vertical-align: top;
  display: inline-block;
  margin: 0 10px;
  padding-bottom: 20px;
  width: 220px;
  box-sizing: border-box;
  .poster-wrapper {
    position: relative;
    width: 100%;
    height: 320px;
    overflow: hidden;
    border-radius: 6px;
    .img-cover {
      width: 220px;
      height: 320px;
      background-color: #eee;
      object-fit: cover;
    }
    .info {
      position: absolute;
      padding: 0 16px;
      left: 0;
      bottom: 0;
      height: 60px;
      width: 100%;
      font-size: 24px;
      line-height: 76px;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
      span {
        float: left;
        color: #ccc;
      }
      label {
        float: right;
        color: orange;
      }
    }
  }
  .title {
    padding-top: 12px;
    line-height: 36px;
    font-size: 28px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
}
</style>
