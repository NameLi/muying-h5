<template>
  <div class="role-item" @click="pathToRole()">
    <img class="role-avatar" v-lazy="role.avatar" />

    <div class="role-info">
      <div class="role-name ellipsis" v-html="name"></div>
      <div class="info-item ellipsis">{{ role.name_en }}</div>
      <div class="info-item info">{{ info }}</div>
      <!-- <div class="role-brief">{{ role.brief }}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleItem",
  props: {
    role: {
      type: Object,
      required: true,
    },
    keyword: {},
  },

  computed: {
    name() {
      return this.role?.name.replace(
        this.keyword,
        `<span>${this.keyword}</span>`
      );
    },
    info() {
      return this.role.defaults
        ?.filter((item) => item.value)
        .map((item) => item.value)
        .join(" · ");
    },
  },

  methods: {
    pathToRole() {
      this.$emit("on-checked", this.role);

      this.$router.push(`/roles/${this.role.id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.role-item {
  display: flex;
  padding: 20px 0;
  margin: 0 30px;
  position: relative;
  .role-avatar {
    position: relative;
    width: 138px;
    height: 190px;
    overflow: hidden;
    object-fit: cover;
    border-radius: 6px;
    background-color: rgba(#f5f5f5, 0.45);
  }
  .role-info {
    flex: 1;
    margin-left: 28px;
    .role-name {
      font-size: 32px;
      color: #333;
    }
    .info-item {
      font-size: 28px;
      line-height: 46px;
      color: #999;
      &.info {
        margin-top: 6px;
        font-size: 24px;
        line-height: 1.6;
      }
    }
    .role-brief {
      margin-top: 26px;
      white-space: normal;
      font-size: 24px;
      line-height: 40px;
      color: #999;
      width: 100%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      text-align: justify;
    }
  }
}

.tag {
  height: 46px;
  line-height: 40px;
  font-size: 24px;
  color: #999;
  padding-top: 12px;
}
</style>
