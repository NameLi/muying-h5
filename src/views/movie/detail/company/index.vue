<template>
  <page>
    <header-bar title="制作发行" />

    <skeleton v-if="loading" />

    <div class="list">
      <div class="item" v-for="item in list" :key="item.type">
        <div class="type" v-if="item.children.length">{{ item.type_zh }}</div>
        <div class="company-list">
          <div
            class="company-item"
            v-for="company in item.children"
            :key="company.id"
          >
            {{ company.name }}
          </div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import { getMovieCompanies } from "@/api/movie";
export default {
  name: "company",

  props: ["id"],

  data() {
    return {
      loading: false,
      list: [],
    };
  },

  mounted() {
    this.getMovieCompanies();
  },

  methods: {
    async getMovieCompanies() {
      this.loading = true;
      let res = await getMovieCompanies(this.id);
      this.loading = false;

      if (res.code === 200) {
        this.list = res.data;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  .item {
    line-height: 92px;
    font-size: 28px;
    .type {
      font-weight: bold;
      padding: 0 30px;
      background-color: rgb(245, 245, 245);
    }
    .company-list {
      .company-item {
        padding: 0 30px;
        height: 100px;
        line-height: 100px;
      }
    }
  }
}
</style>