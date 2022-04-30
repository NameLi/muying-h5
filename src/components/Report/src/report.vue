<template>
  <m-modal
    ref="modal"
    title="举报原因"
    :visible.sync="visible"
    :show-cancel-button="false"
    confirm-text-color="#e54847"
    async-close
    confirm-button-text="提交反馈"
    @confirm="handleConfirm"
  >
    <div v-if="loading" class="loading">
      <m-spinner type="triple" color="#f60"></m-spinner>
    </div>
    <div v-else class="reason-list">
      <div
        class="reason-item"
        v-for="r in reasons"
        :key="r.value"
        :class="{ 'is-active': r.value === reason }"
        @click="checkReason(r.value)"
      >
        {{ r.label }}
      </div>
    </div>
  </m-modal>
</template>

<script>
import { getReport, createReport } from "@/api/common";

export default {
  name: "Report",

  data() {
    return {
      loading: false,
      visible: false,
      submitLoading: false,
      reason: null,
      reasons: [],
      id: null,
      type: "",
    };
  },

  computed: {
    disabled() {
      return this.reason === null;
    },
  },

  methods: {
    open(id, type) {
      this.submitLoading = false;
      this.reasons = [];
      this.reason = null;
      this.id = null;
      this.type = "";
      this.loading = false;

      this.visible = true;
      this.type = type;
      this.id = id;

      this.getReport();
    },

    async getReport() {
      let params = {
        type: this.type,
      };

      this.loading = true;
      const { code, data } = await getReport(params);
      this.loading = false;

      if (code === 200) {
        this.reasons = data;
      }
    },

    checkReason(reason) {
      this.reason = reason;
    },

    handleConfirm() {
      if (this.submitLoading) return;

      if (this.reason === null) {
        this.$toast("请选择原因");
        this.$refs.modal.loading = false;
        return;
      }
      this.createReport();
    },

    async createReport() {
      if (!this.reason) {
        this.$toast("请选择原因");
        return;
      }

      let params = {
        type: this.type,
        union_id: this.id,
        reason: this.reason,
      };
      this.submitLoading = true;
      let { code, message } = await createReport(params);
      this.submitLoading = false;

      if (code === 200) {
        this.$toast({
          position: "top",
          message,
        });

        this.$emit("on-success");

        this.visible = false;
      } else {
        this.$refs.modal.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
.reason-list {
  display: flex;
  flex-wrap: wrap;
  color: #333;
  .reason-item {
    width: 50%;
    height: 60px;
    line-height: 60px;
    &.is-active {
      color: $color-theme;
    }
  }
}
</style>
