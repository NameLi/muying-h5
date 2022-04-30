<template>
  <div
    class="tool-item"
    :class="{ 'is-disabled': data.allow_like }"
    @click="likeClick()"
  >
    <div class="tool-item-icon" :class="{ 'is-checked': data.is_like }">
      <i class="m-icon m-icon-like-fill"></i>
    </div>
    <div class="tool-item-count">{{ data.like_count || defaultCount }}</div>
  </div>
</template>

<script>
import { createLike, deleteLike } from "@/api/user";

export default {
  name: "UserLike",

  props: {
    // 资源类型，支持 photos、articles、videos等
    type: {
      required: true,
      type: String,
    },
    // 数据
    data: {
      required: true,
      type: Object,
    },
    defaultCount: {
      default: "喜欢",
    },
  },

  methods: {
    async likeClick() {
      if (this.data.allow_like === 0) {
        return;
      }

      if (this.loading) return;

      this.loading = true;
      let { code, data } = this.data.is_like
        ? await deleteLike(this.type, this.data.id)
        : await createLike(this.type, this.data.id);
      this.loading = false;

      if (code === 200) {
        // this.$emit("on-change", data);
        Object.assign(this.data, data);
      }
    },
  },
};
</script>