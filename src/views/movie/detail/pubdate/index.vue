<template>
  <page>
    <header-bar title="上映日期" />

    <skeleton v-if="loading" />

    <m-cell v-for="p in list" :key="p.id" :title="p.pubdate"
      >{{ p.country }}
      <span class="is-premiere">{{ p.premiere ? "(首映)" : "" }}</span></m-cell
    >
  </page>
</template>

<script>
import { getMoviePubdates } from "@/api/movie";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "Pubdate",

  mixins: [getInfiniteData],

  props: ["id"],

  methods: {
    loadMore() {
      this.getData(getMoviePubdates, this.id);
    },
  },
};
</script>

<style scoped lang="scss">
.is-premiere {
  font-size: 24px;
  color: #999;
}
</style>