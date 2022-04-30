<template>
  <div class="movie-award">
    <div class="award-item" v-if="movie.awards_count">
      <div class="award-count">
        <span>{{ movie.awards_count }}</span>
        <label>次</label>
      </div>
      <div class="award-label">获奖</div>
    </div>

    <div class="award-item" v-if="movie.awards_nominate_count">
      <div class="award-count">
        <span>{{ movie.awards_nominate_count }}</span>
        <label>次</label>
      </div>
      <div class="award-label">提名</div>
    </div>

    <div class="award-item award-detail">
      <div class="award-name">{{ award.title }}</div>
      <div class="award-label">{{ award.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieAward",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },

  computed: {
    award() {
      if (this.movie.awards.length) {
        let detail = this.movie.awards[0].children[0].desc;
        let title = detail.split(" ")[0];
        let info = detail.split(" ")[1];
        return {
          title,
          info,
        };
      }

      return {};
    },
  },
};
</script>

<style scoped lang="scss">
.movie-award {
  display: flex;
  align-items: center;
  padding: 30px;
  height: 150px;
  background-color: rgb(246, 246, 246);
  border-radius: 6px;
  .award-item {
    width: 120px;
    text-align: center;
    .award-count {
      span {
        font-weight: bold;
        font-size: 32px;
        color: rgb(223, 57, 54);
      }
      label {
        font-size: 20px;
        color: rgb(223, 57, 54);
      }
    }
    .award-label {
      display: block;
      margin-top: 20px;
      font-size: 24px;
      color: rgb(176, 179, 187);
    }
    &.award-detail {
      padding-left: 30px;
      flex: 1;
      text-align: left;
      .award-name {
        font-size: 28px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>