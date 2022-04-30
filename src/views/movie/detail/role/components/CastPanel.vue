<template>
  <div class="panel">
    <div class="panel-header">
      <div class="panel-title">
        <span>{{ title }}</span>
      </div>
      <div class="panel-more">{{ count }}</div>
    </div>

    <div class="panel-content">
      <actor-item v-for="actor in actors" :actor="actor" :key="actor.id" />
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
    actors: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    count() {
      return this.actors.length;
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
      flex: 1;
      span {
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
    .panel-more {
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
  .panel-content {
    ::v-deep .actor-item {
      border-bottom: 1px solid rgb(227, 227, 227);
      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>