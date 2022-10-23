<template>
  <div class="serial-item border_bottom" @click="pathToSerial()">
    <image-group :images="photos" />

    <div class="serial-info">
      <div class="serial-name ellipsis">{{ serial.name }}</div>
      <div class="serial-label ellipsis">{{ serial.name_en }}</div>
      <div class="serial-label">影视数量 {{ serial.count }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SerialItem",
  props: {
    serial: {
      type: Object,
      required: true,
    },
  },
  computed: {
    photos() {
      return this.serial?.movies.map((m) => m.poster);
    },
  },

  methods: {
    pathToSerial() {
      this.$router.push(`/serials/${this.serial.id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.serial-item {
  display: flex;
  padding: 20px 0;
  margin: 0 30px;
  position: relative;
  .serial-info {
    flex: 1;
    margin-left: 28px;
    .serial-name {
      font-size: 32px;
      color: #333;
    }
    .serial-label {
      margin-top: 10px;
      font-size: 28px;
      color: #999;
    }
  }
}
</style>