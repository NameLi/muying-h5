<template>
  <div class="award-item border_bottom">
    <div class="award">
      <div class="award-poster">
        <img class="poster" :src="award.poster" alt="" />
      </div>
      <div class="award-info">
        <div class="award-title">第{{ award.session }}届 {{ award.award }}</div>
        <div class="award-brief">{{ award.year }}年</div>
      </div>
    </div>
    <div class="award-children">
      <div class="award-detail" v-for="item in award.children" :key="item.id">
        <div class="award-type">
          {{ item.type }} {{ item.win === 0 ? "(提名)" : "(获奖)" }}
        </div>
        <div class="award-actor">
          <span v-for="(actor, index) in item.actors" :key="actor.id"
            >{{ actor.name }}
            {{ item.actors.length - 1 > index ? "/" : "" }}</span
          >
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
  margin: 5px 30px;
  padding-bottom: 20px;
  .award {
    display: flex;
    align-items: center;
    margin: 20px 0;
    height: 100px;
    .award-poster {
      width: 100px;
      height: 100px;
      .poster {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 6px;
        background-color: #f7f7f7;
      }
    }
    .award-info {
      flex: 1;
      margin-left: 20px;
      font-size: 28px;
      .award-title {
        font-weight: bold;
        line-height: 40px;
      }
      .award-brief {
        margin-top: 10px;
        font-size: 24px;
      }
    }
  }
  .award-children {
    .award-detail {
      font-size: 24px;
      .award-type {
        height: 60px;
        line-height: 68px;
      }
      .award-actor {
        color: #999;
        > span {
          margin-right: 6px;
        }
      }
    }
  }
}
</style>