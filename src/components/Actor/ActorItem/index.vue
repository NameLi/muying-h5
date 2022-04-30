<template>
  <div class="actor-item border_bottom" @click="pathToActor()">
    <img class="actor-avatar" v-lazy="actor.avatar" />

    <div class="actor-info">
      <div class="actor-name ellipsis" v-html="name"></div>
      <div class="info-item ellipsis">{{ actor.name_en }}</div>
      <div class="info-item ellipsis">
        <span>{{ actor.gender }}</span>
        <em v-if="actor.gender && actor.country">·</em>
        <span>{{ actor.country }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActorItem",

  props: {
    actor: {
      type: Object,
      required: true,
    },
    keyword: {},
  },

  computed: {
    name() {
      return this.actor.name
        ? this.actor.name.replace(this.keyword, `<span>${this.keyword}</span>`)
        : this.actor.name;
    },
  },

  methods: {
    pathToActor() {
      this.$emit("on-checked", this.actor);

      this.$store.commit("SET_ACTOR", this.actor);

      this.$router.push(`/actors/${this.actor.id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.actor-item {
  display: flex;
  margin: 0 30px;
  padding: 16px 0;
  position: relative;
  &:nth-last-child(1)::before {
    display: none;
  }
  .actor-avatar {
    position: relative;
    width: 138px;
    height: 190px;
    overflow: hidden;
    border-radius: 6px;
    object-fit: cover;
    background-color: rgba(#f5f5f5, 0.45);
  }
  .actor-info {
    flex: 1;
    margin-left: 28px;
    .actor-name {
      padding-bottom: 8px;
      font-size: 32px;
      color: #333;
      line-height: 48px;
      ::v-deep span {
        color: red;
      }
    }
    .info-item {
      font-size: 28px;
      line-height: 46px;
      color: #999;
      em {
        margin: 0 4px;
        color: #aaa;
      }
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
