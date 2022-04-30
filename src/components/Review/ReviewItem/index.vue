<template>
  <div class="review" @click="$router.push(`/reviews/${review.id}`)">
    <div class="review-header">
      <div class="review-title ellipsis">{{ review.title }}</div>

      <div class="_stars" v-if="review.rating">
        <m-rate
          v-model="review.rating"
          :size="24"
          :step="2"
          :max="10"
          readonly
          allow-half
        />
      </div>
    </div>

    <div class="review-brief">
      <div class="review-content overflow" v-html="review.brief"></div>
    </div>

    <div class="review-tool">
      <span v-if="review.from === 'muying'"
        >{{ review.vote_up_count }} 赞 · {{ review.read_count }} 浏览</span
      >
      <span v-else
        >转载自<label>{{ review.from_zh }}</label></span
      >
      <span class="review-date">{{ review.created_at | dateBefore }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewItem",
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.review {
  padding: 12px 30px;
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 0 0 6px #f1f1f1;
  .review-header {
    display: flex;
    height: 52px;
    line-height: 52px;
    .review-title {
      font-size: 32px;
      font-weight: bold;
      margin-right: 20px;
      color: #333;
      flex: 1;
      width: 0;
    }
  }
  .review-brief {
    margin: 20px 0 20px;
    .review-content {
      font-size: 28px;
      line-height: 44px;
      color: #555;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
  .review-tool {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    font-size: 24px;
    color: #888;
    label {
      margin-left: 6px;
      color: rgba(#42bd56, 0.6);
    }
  }
}

._stars_null {
  font-size: 24px;
  color: #aaa;
}
</style>
