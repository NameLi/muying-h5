<template>
  <m-navbar-group
    @change="onChange"
    :acive-name="aciveName"
    :disabled="disabled"
  >
    <m-navbar
      v-for="tab in tabs"
      :title="tab.label"
      :name="tab.value"
      :key="tab.value"
    />
  </m-navbar-group>
</template>

<script>
export default {
  name: "TabSwitch",
  props: {
    tabs: {
      type: Array,
      default: () => [
        {
          label: "热度",
          value: "hot",
        },
        {
          label: "最新",
          value: "created_at",
        },
      ],
    },

    aciveName: {
      type: String,
      default: "hot",
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onChange(value) {
      if (this.disabled) return;

      this.$emit("change", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.m-tabs__wrap {
  height: 58px;
  border-radius: 60px;
  box-sizing: content-box;
  vertical-align: middle;
  background-color: #f5f5f5;
  ::v-deep .m-tabs__scroll {
    .m-tabs__nav {
      margin: 6px 2px;
      height: 46px;
      .m-tabs__line {
        z-index: 1;
        margin-left: -15px;
        border-left: 15px solid #fff;
        border-right: 15px solid #fff;
        height: 46px !important;
        background-color: #fff;
        transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
        border-radius: 50px;
        box-sizing: content-box;
      }
      .m-tab-item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 6px;
        padding: 0 15px;
        height: 46px;
        &.m-tab-item--is-active {
          .m-tab-item__content {
            color: #333;
          }
        }
        .m-tab-item__content {
          z-index: 1;
          position: relative;
          margin: 0;
          height: 46px;
          line-height: 46px;
          font-size: 24px;
          color: #999;
        }
      }
    }
  }
}
</style>
