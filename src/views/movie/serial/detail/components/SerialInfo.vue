<template>
  <div class="serial-info">
    <img :src="serial.poster" class="serial-poster" />

    <div class="serial-info-footer">
      <div class="serial-name">{{ serial.name }}</div>
      <div class="serial-extra">
        <span>共{{ serial.count }}部</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SerialInfo",

  props: {
    serial: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style scoped lang="scss">
.serial-info {
  position: relative;
  height: 420px;
  .serial-poster {
    width: 100%;
    height: 420px;
    object-fit: cover;
  }
  .serial-info-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 20px 30px;
    height: 168px;
    color: #fff;
    background-image: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.32) 100%);
    color: #fff;
    .serial-name {
      padding: 10px 0;
      font-size: 48px;
    }
    .serial-extra {
      font-size: 28px;
    }
  }
}
.summary {
  padding: 0 20px;
  white-space: normal;
  font-size: 28px;
  line-height: 48px;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  width: 100%;
}
</style>