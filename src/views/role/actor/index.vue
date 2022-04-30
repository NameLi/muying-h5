<template>
  <page>
    <header-bar title="角色影人" />

    <div class="actor-list" v-infinite-scroll="loadMore">
      <actor-item v-for="actor in list" :actor="actor" :key="actor.id" />

      <m-loadmore :loading="loading" />
    </div>
  </page>
</template>


<script>
import { getRoleActors } from "@/api/role";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "RoleActors",

  mixins: [getInfiniteData],

  props: ["id"],

  methods: {
    loadMore() {
      this.getData(getRoleActors, this.id);
    },
  },
};
</script>

<style scoped lang="scss">
.actor-list {
  padding: 10px 0;
}
</style>
