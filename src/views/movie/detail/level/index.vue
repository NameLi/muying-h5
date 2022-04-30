<template>
  <page>
    <header-bar title="家长引导" />

    <skeleton v-if="loading" />

    <div class="list">
      <div class="item border_bottom" v-for="item in list" :key="item.id">
        <p>{{ item.content }}</p>
      </div>
    </div>
  </page>
</template>

<script>
import { getMovieLevels } from "@/api/movie";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "Dialogues",

  mixins: [getInfiniteData],

  props: ["id"],

  methods: {
    loadMore() {
      this.getData(getMovieLevels, this.id);
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  padding: 0 30px 30px;
  .item {
    padding: 26px 0;
    line-height: 1.6;
    font-size: 28px;
    p {
      text-align: justify;
    }
    .item-content {
      margin-top: 12px;
    }
  }
}
</style>