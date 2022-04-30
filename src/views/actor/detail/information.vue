<template>
  <page footer-close>
    <m-cell-group border>
      <m-cell title="中文名" :value="actor.name" />
      <m-cell title="英文名" :value="actor.name_en" />
      <m-cell title="性别" :value="actor.gender" />
      <m-cell title="生日" :value="actor.birthday" />
      <m-cell v-if="actor.deathday" title="逝世" :value="actor.deathday" />
      <m-cell title="年龄" :value="actor.age" />
      <m-cell title="国籍" :value="actor.country" />
      <m-cell title="出生地" :value="actor.born_place" />
      <m-cell title="职业" :value="professions" />
      <m-cell title="星座" :value="actor.constellation" />
      <m-cell title="身高" :value="actor.height" />
      <m-cell title="民族" :value="actor.nationality" />
      <m-cell title="血型" :value="actor.blood_type" />
      <m-cell title="教育" :value="actor.education" />
    </m-cell-group>

    <div class="content" v-if="actor.summary">
      <div class="summary" v-html="actor.summary"></div>
    </div>
  </page>
</template>

<script>
export default {
  name: "ActorDetail",

  props: {
    actor: {
      type: Object,
    },
  },

  computed: {
    professions() {
      return this.actor.professions?.join(",");
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
