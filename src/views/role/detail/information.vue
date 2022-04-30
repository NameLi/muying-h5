<template>
  <page footer-close>
    <m-cell-group border>
      <m-cell title="中文名" :value="role.name" />
      <m-cell title="英文名" :value="role.name_en" />
      <m-cell title="别名" :value="akas" />

      <m-cell
        v-for="item in role.defaults"
        :title="item.label"
        :value="item.value"
        :key="item.label"
      />

      <m-cell
        v-for="item in role.extras"
        :title="item.label"
        :value="item.value"
        :key="item.label"
      />

      <m-cell title="标签" :value="tags" />
    </m-cell-group>

    <div class="content">
      <div class="summary" v-html="role.summary"></div>
    </div>
  </page>
</template>

<script>
export default {
  name: "RoleDetail",

  props: {
    role: {
      type: Object,
    },
  },

  computed: {
    akas() {
      return this.role.akas?.join(",") || "";
    },
    tags() {
      return this.role.tags?.join(",") || "";
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  margin-top: 20px;
  padding: 30px;
}
</style>
