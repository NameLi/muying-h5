export const preventScroll = {
  mounted() {
    this.$preventScroll(true);
  },

  beforeDestroy() {
    this.$preventScroll(false);
  },
}