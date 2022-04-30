<template>
  <div class="role-row" @click="pathToRole()">
    <img class="role-avatar" v-lazy="role.avatar" />

    <div class="role-info">
      <div class="role-name ellipsis">{{ role.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleRow",
  props: {
    role: {
      type: Object,
      required: true,
    },
  },

  methods: {
    pathToRole() {
      this.$router.push(`/roles/${this.role.id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.role-row {
  display: inline-block;
  position: relative;
  vertical-align: top;
  margin-right: 16px;
  padding-bottom: 15px;
  width: 188px;
  .role-avatar {
    position: relative;
    width: 188px;
    height: 268px;
    overflow: hidden;
    object-fit: cover;
    border-radius: 6px;
    background-color: rgba(#f5f5f5, 0.45);
  }
  .role-info {
    .role-name {
      padding-top: 10px;
      line-height: 32px;
      font-size: 28px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .role-label {
      color: #888;
      font-size: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
