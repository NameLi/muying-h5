<template>
  <page>
    <header-bar title="影人角色" />

    <movie-skeleton class="roles-skeleton" v-if="isShowSkeleton" />

    <div class="role-header">
      <div class="role-count">角色 {{ total }}</div>
      <div class="role-type" v-if="total">
        <tab-switch @change="onChange" :disabled="loading" />
      </div>
    </div>

    <div class="role-list" v-infinite-scroll="loadMore">
      <role-row v-for="role in list" :key="role.id" :role="role" />

      <m-loadmore :loading="loading" v-if="!isShowSkeleton" />
    </div>
  </page>
</template>

<script>
import { getActorRoles } from "@/api/actor";
import { getInfiniteData } from "@/mixins/getInfiniteData";

export default {
  name: "ActorRoles",

  mixins: [getInfiniteData],

  props: ["id"],

  methods: {
    onChange(value) {
      if (this.form.sortby === value) return;

      this.page = 1;
      this.list = [];
      this.form.sobtBy = value;
      this.loadMore();
    },

    loadMore() {
      this.getData(getActorRoles, this.id);
    },
  },
};
</script>

<style scoped lang="scss">
.roles-skeleton {
  top: 0 !important;
  margin-top: 180px;
}

.role-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 80px;
  font-size: 28px;
  .role-count {
    font-weight: bold;
  }
}

.role-list {
  padding: 20px 0;
  margin-left: 15px;
  font-size: 0;
  ::v-deep .role-row {
    width: 220px;
    margin: 0 10px;
    padding-bottom: 30px;
    .role-avatar {
      position: relative;
      width: 100%;
      height: 320px;
      overflow: hidden;
      border-radius: 6px;
    }
  }
}
</style>
