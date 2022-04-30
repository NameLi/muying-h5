<template>
  <div class="container">
    <header-bar title="关注角色" />

    <movie-skeleton style="margin-top: -20px" v-if="isShowSkeleton" />

    <div class="list" v-infinite-scroll="loadMore">
      <role-item v-for="role in list" :role="role" :key="role.id" />
      <m-loadmore v-if="total" :loading="loading" />
      <no-data v-if="total === 0 && !loading" content="您还没有关注任何角色" />
    </div>
  </div>
</template>

<script>
import { getUserCollection } from "@/api/user";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "ColectionRole",

  mixins: [getInfiniteData],

  methods: {
    loadMore() {
      this.getData(getUserCollection, "roles");
    },
  },
};
</script>
