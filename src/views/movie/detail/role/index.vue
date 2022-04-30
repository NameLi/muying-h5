<template>
  <div class="container">
    <header-bar title="角色表" back />

    <skeleton v-if="isShowSkeleton" />

    <div class="role-list" v-infinite-scroll="loadMore">
      <role-item v-for="role in list" :key="role.id" :role="role" />

      <m-loadmore :loading="loading" />
    </div>
  </div>
</template>

<script>
import { getMovieRoles } from "@/api/movie";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "MovieRole",

  mixins: [getInfiniteData],

  props: ["id"],

  methods: {
    loadMore() {
      this.getData(getMovieRoles, this.id);
    },
  },
};
</script>