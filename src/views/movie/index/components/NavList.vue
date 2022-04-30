<template>
  <ul class="nav-list">
    <li
      v-for="item of list"
      :key="item.id"
      :class="{ 'is-active': item.name == value }"
      @click="checkItem(item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "NavList",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    list: {
      type: Array,
    },
  },

  methods: {
    checkItem(item) {
      this.$emit("input", item.name);
      this.$emit("change");
    },
  },
};
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  display: none;
}
.nav-list {
  position: relative;
  padding-left: 20px;
  width: 100%;
  height: 64px;
  user-select: none;
  white-space: nowrap;
  overflow-x: scroll;
  li {
    display: inline-block;
    margin: 6px 10px 6px 0;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    font-size: 28px;
    border-radius: 40px;
    transition: all 0.2s;
    &.is-active {
      color: #fff;
      background-color: rgba($color-theme, 0.85);
    }
  }
}
</style>