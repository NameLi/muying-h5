<template>
  <div class="panel">
    <div class="panel-header">
      <div class="panel-title">
        <span class="panel-type">{{ title }}</span>
      </div>
      <div class="panel-count">({{ count }})</div>
    </div>

    <div class="panel-content">
      <actor-item v-for="actor in actors" :key="actor.id" :actor="actor" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CastPanel",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    count: {
      type: Number,
      default: 0,
    },
    actors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.panel {
  padding: 0;
  .panel-header {
    z-index: 1;
    position: sticky;
    top: 100px;
    padding: 0 20px;
    height: 86px;
    line-height: 86px;
    font-size: 28px;
    display: flex;
    background-color: rgb(245, 245, 245);
    .panel-title {
      // flex: 1;
      .panel-type {
        font-weight: bold;
        display: inline-block;
        &::before {
          content: "";
          vertical-align: middle;
          display: inline-block;
          margin-top: -4px;
          margin-right: 12px;
          width: 8px;
          height: 8px;
          background: #f8a52d;
        }
      }
    }
    .panel-count {
      padding-right: 20px;
      font-size: 24px;
      padding-left: 8px;
      ::v-deep {
        .m-icon {
          font-size: 24px;
        }
      }
    }
  }
}
</style>