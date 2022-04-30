<template>
  <div
    class="tool-item"
    :class="{ 'is-disabled': data.allow_collection }"
    @click="likeClick()"
  >
    <div class="tool-item-icon" :class="{ 'is-checked': data.is_collection }">
      <i class="m-icon m-icon-star-fill"></i>
    </div>
    <div class="tool-item-count">
      {{ data.collection_count || defaultCount }}
    </div>
  </div>
</template>

<script>
import { createCollection, deleteCollection } from "@/api/user";

export default {
  name: "UserCollection",

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
      default: "收藏",
    },
  },

  methods: {
    async likeClick() {
      if (this.data.allow_collection === 0) {
        return;
      }

      if (this.loading) return;

      this.loading = true;
      let { code, data } = this.data.is_collection
        ? await deleteCollection(this.type, this.data.id)
        : await createCollection(this.type, this.data.id);
      this.loading = false;

      if (code === 200) {
        // this.$emit("on-change", data);
        Object.assign(this.data, data);
      }
    },
  },
};
</script>