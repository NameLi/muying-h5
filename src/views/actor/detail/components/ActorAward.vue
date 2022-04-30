<template>
  <div class="award">
    <img class="poster" :src="award.poster" />
    <div class="info">
      <div class="title">{{ award.title }}</div>
      <div class="content">{{ award.type_name }}</div>
    </div>
    <div class="count" @click="$router.push(`/actors/${id}/awards`)">
      <span>获奖{{ awardCount }}次</span>
      <m-icon name="arrow-right" size="28" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ActorAward",
  props: {
    id: {
      required: true,
    },
    award: {
      type: Object,
    },
    awardCount: {
      type: Number,
    },
  },
};
</script>

<style scoped lang="scss">
.award {
  display: flex;
  align-items: center;
  margin: 20px;
  padding: 0 20px;
  height: 150px;
  border-radius: 8px;
  background-color: #fff;
  .poster {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
  }
  .info {
    margin-left: 20px;
    flex: 1;
    .title {
      font-size: 32px;
      font-weight: bold;
    }
    .content {
      margin-top: 10px;
      font-size: 28px;
    }
  }
  .count {
    font-size: 28px;
    color: #999;
  }
}
</style>