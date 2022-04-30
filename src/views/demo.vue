<template>
  <page half round title="标题" :before-back="beforeBack">
    <div class="item" v-for="n in 20" :key="n">{{ n }}</div>

    <template v-slot:footer>
      <div class="close">123</div>
    </template>
  </page>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    beforeBack(done) {
      done();
    },
  },
};
</script>

<style scoped lang="scss">
.item {
  height: 80px;
  margin: 10px;
  background-color: #f5f5f5;
}
.close {
  height: 80px;
  line-height: 80px;
  text-align: center;
}
</style>