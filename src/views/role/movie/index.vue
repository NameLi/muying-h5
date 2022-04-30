<template>
  <page>
    <header-bar title="角色作品" />

    <div class="movie-list" v-infinite-scroll="loadMore">
      <movie-item v-for="movie in list" :key="movie.id" :movie="movie" />
      <m-loadmore :loading="loading" />
    </div>
  </page>
</template>

<script>
import { getRoleMovies } from "@/api/role";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "RoleMovies",

  mixins: [getInfiniteData],

  props: ["id"],

  methods: {
    loadMore() {
      this.getData(getRoleMovies, this.id);
    },
  },
};
</script>

<style scoped lang="scss">
.movie-list {
  padding: 10px 0;
}
</style>
