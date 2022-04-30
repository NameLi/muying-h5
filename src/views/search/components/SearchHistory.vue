<template>
  <div class="record" v-show="hasHistory">
    <div class="record-title">
      <h6>历史记录</h6>
      <i class="iconfont icon-delete right" @click="clearHistories"></i>
    </div>

    <ul class="record-list" @click="searchGroup($event)">
      <li
        class="record-item"
        v-for="(keyword, index) in histories"
        :key="index"
        @click="$emit('on-keyword', keyword)"
      >
        {{ keyword }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",

  props: {
    histories: {
      type: Array,
    },
  },

  computed: {
    hasHistory() {
      return !!this.histories.length;
    },
  },

  methods: {
    searchGroup() {},

    clearHistories() {
      this.$modal({
        title: "提示",
        content: "确定要清空历史记录吗?",
        asyncClose: true,
      })
        .then((instance) => {
          this.$emit("on-clear");

          instance.close();
        })
        .catch((instance) => {
          instance.close();
        });
    },
  },
};
</script>

<style scoped lang="scss">
.record {
  padding: 0 30px;
  .record-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    > h6 {
      font-size: 28px;
      font-weight: bold;
    }
    i {
      font-size: 32px;
    }
  }
  .record-list {
    margin: 12px -12px 0;
    .record-item {
      display: inline-block;
      margin: 12px;
      padding: 0 24px;
      height: 48px;
      line-height: 48px;
      border-radius: 4px;
      border: 1px solid rgb(240, 240, 240);
      background-color: rgb(244, 244, 244);
    }
  }
}
</style>