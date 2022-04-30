<template>
  <page full>
    <header-bar title="奖项详情" />

    <m-cell-group border>
      <m-cell title="中文名" :value="award.title" />
      <m-cell title="类别" :value="award.category" />
      <m-cell title="英文名" :value="award.title_en" />
      <m-cell title="全名" :value="award.subtitle" />
      <m-cell title="别名" :value="award.akas" />
      <m-cell title="国家" :value="award.country" />
      <m-cell title="起始年" :value="`${award.year}年`" />
      <m-cell title="总届" :value="`${award.session}届`" />
      <m-cell title="官网" :value="award.website" />
    </m-cell-group>

    <div class="content">简介：{{ award.brief }}</div>
  </page>
</template>

<script>
import { getAward } from "@/api/award";

export default {
  name: "AwardDetailInfo",

  props: ["name"],

  data() {
    return {
      award: {},
    };
  },

  mounted() {
    this.getAward();
  },

  methods: {
    async getAward() {
      this.loading = true;
      let res = await getAward(this.name);
      this.loading = false;

      if (res.code === 200) {
        this.award = res.data;
      }
    },
  },
};
</script>


<style scoped lang="scss">
.content {
  padding: 30px;
  font-size: 28px;
  line-height: 1.6;
  text-align: justify;
}
</style>
