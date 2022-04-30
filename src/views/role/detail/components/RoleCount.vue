<template>
  <div class="role-count">
    <div class="info-card">
      <div class="card-item">
        <div class="value">{{ role.collection_count }}人</div>
        <div class="label">关注数</div>
      </div>
      <div class="card-item">
        <div class="value">{{ role.movie_count }}部</div>
        <div class="label">影视数</div>
      </div>
      <div class="card-item">
        <div class="value">{{ role.actor_count }}个</div>
        <div class="label">影人数</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleCount",
  props: {
    role: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
.role-count {
  margin: 20px;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px 0;
  .info-card {
    display: flex;
    height: 110px;
    align-items: center;
    .card-item {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &:nth-child(1)::after,
      &:nth-child(2)::after {
        content: "";
        position: absolute;
        right: 0;
        width: 1px;
        height: 80px;
        background-color: #e5e5e5;
      }
      .value {
        font-size: 32px;
        font-weight: bold;
        line-height: 46px;
      }
      .label {
        font-size: 28px;
        color: #888;
      }
    }
  }
}
</style>