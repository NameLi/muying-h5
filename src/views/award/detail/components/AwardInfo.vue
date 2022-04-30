<template>
  <!-- 奖项信息 -->
  <div class="award-main">
    <div class="award-poster">
      <img :src="award.poster" />
      <div class="award-info">
        <span v-if="award.categories">{{ award.categories }}</span>
        <span v-if="award.year">始于{{ award.year }}年</span>
        <span v-if="award.country">{{ award.country }}</span>
      </div>
    </div>

    <div class="award-title">{{ award.title }}</div>
    <div class="award-subtitle">{{ award.original_title }}</div>
    <div class="award-brief" @click="pathTo()">{{ award.brief }}</div>
  </div>
</template>

<script>
export default {
  name: "AwardInfo",
  props: {
    award: {
      type: Object,
    },
  },
  methods: {
    pathTo() {
      const name = this.$route.params.name;

      this.$router.push(`/awards/${name}/detail`);
    },
  },
};
</script>

<style scoped lang="scss">
.award-main {
  .award-poster {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 500px;
    background-color: #bb9354;
    img {
      max-width: 220px;
      max-height: 325px;
    }
    .award-info {
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 12px 30px;
      span {
        vertical-align: top;
        display: inline-block;
        margin-right: 10px;
        padding: 0 12px;
        height: 36px;
        line-height: 36px;
        font-size: 24px;
        background-color: rgba(0, 0, 0, 0.35);
        border-radius: 4px;
        color: #fff;
      }
    }
  }
  .award-title {
    margin: 40px 30px 20px;
    height: 40px;
    line-height: 40px;
    font-size: 40px;
    font-weight: bold;
  }
  .award-subtitle {
    padding: 0 30px;
    font-size: 28px;
    color: #666;
    height: 40px;
    line-height: 40px;
  }
  .award-info {
    margin-top: 10px;
    padding: 0 30px;
    font-size: 24px;
    color: #666;
  }
  .award-brief {
    margin-top: 10px;
    padding: 0 30px;
    font-size: 28px;
    line-height: 44px;
    color: #333;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-align: justify;
  }
}
</style>