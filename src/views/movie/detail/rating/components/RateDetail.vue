<template>
  <div class="rate-main">
    <h6 class="subtitle">评分详细</h6>
    <div class="rate-content">
      <!-- 分数 -->
      <div class="rate-left">
        <div class="rate-score">
          <span class="rate">{{ rating }}</span>
          <span class="label">分</span>
        </div>
        <div class="rate-count">{{ voteCount }}人评分</div>
      </div>

      <!-- 占比 -->
      <div class="rate-right">
        <div class="rate-item" v-for="item in ratios" :key="item.star">
          <span class="level">{{ item.label }}</span>
          <div class="progress">
            <div class="percent" :style="{ width: item.ratio }"></div>
          </div>
          <span class="ratio">{{ item.ratio }}</span>
        </div>
      </div>
    </div>

    <!-- 好于 -->
    <div class="better-than">
      <div class="better-item" v-for="b in betterThan" :key="b.genre">
        <span>好于</span>
        <em>{{ b.ratio }}</em>
        <span>的{{ b.genre }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RateDetail",

  props: {
    rating: {},
    voteCount: {},
    ratios: {
      type: Array,
      default: () => [],
    },
    betterThan: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.subtitle {
  position: relative;
  margin: 0 20px;
  padding-left: 16px;
  height: 80px;
  line-height: 80px;
  font-size: 28px;
  font-weight: bold;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 24px;
    height: 30px;
    width: 8px;
    border-radius: 4px;
    background-color: $color-theme;
  }
}

.rate-main {
  margin: 40px 20px 0;
  border-radius: 8px;
  box-shadow: 0 4px 12px #e5e5e5;
  .rate-content {
    display: flex;
    height: 240px;
    // background-color: #eee;
    .rate-left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 250px;
      flex-direction: column;
      .rate-score {
        .rate {
          font-size: 48px;
          color: $color-theme;
          font-weight: bold;
        }
        .label {
          font-size: 20px;
          color: $color-theme;
          margin-left: 2px;
        }
      }
      .rate-count {
        color: #999;
      }
    }
    .rate-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      padding: 20px 30px;
      color: #999;
      font-size: 24px;
      .rate-item {
        display: flex;
        align-items: center;
        width: 100%;
        .level {
          width: 100px;
          padding-right: 20px;
          text-align: right;
        }
        .progress {
          flex: 1;
          height: 12px;
          background-color: #e5e5e5;
          .percent {
            width: 0;
            height: 12px;
            border-radius: 3px;
            background-color: $color-theme;
            transition: width 0.3s;
          }
        }
        .ratio {
          width: 100px;
          padding-left: 20px;
        }
      }
    }
  }

  .better-than {
    border-top: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #999;
    height: 70px;
    .better-item {
      margin-right: 36px;
    }
  }
}
</style>