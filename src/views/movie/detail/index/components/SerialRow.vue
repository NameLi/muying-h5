<template>
  <div class="serial-row" @click="pathTo()">
    <div class="poster-group">
      <image-group :images="photos" />
    </div>
    <h6 class="title">{{ serial.name }}</h6>
  </div>
</template>

<script>
export default {
  name: "SerialRow",
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
    pathTo() {
      this.$router.push(`/serials/${this.serial.id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.serial-row {
  vertical-align: top;
  display: inline-block;
  margin: 0 8px;
  padding-bottom: 15px;
  width: 188px;
  box-sizing: border-box;
  .poster-group {
    display: flex;
    justify-content: center;
    height: 170px;
    ::v-deep .image-group {
      transform: scale(1.2);
      transform-origin: 0 0;
    }
  }
  .title {
    padding-top: 12px;
    line-height: 36px;
    font-size: 28px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
}
</style>
