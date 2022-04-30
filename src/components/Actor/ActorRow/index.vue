<template>
  <div class="actor-row" @click="pathToActor()">
    <img class="actor-avatar" v-lazy="actor.avatar" />

    <div class="actor-info">
      <div class="actor-name">{{ actor.name }}</div>
      <div class="actor-label" v-if="actor.profession === '导演'">导演</div>
      <div
        class="actor-label"
        v-else-if="actor.profession === '演员' && actor.act"
      >
        饰: {{ actor.act }}
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "ActorRow",
  props: {
    actor: {
      type: Object,
      required: true,
    },
  },

  methods: {
    pathToActor() {
      this.$store.commit("SET_ACTOR", this.actor);

      this.$router.push(`/actors/${this.actor.id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.actor-row {
  display: inline-block;
  position: relative;
  vertical-align: top;
  margin-right: 16px;
  padding-bottom: 15px;
  width: 188px;
  .actor-avatar {
    position: relative;
    width: 188px;
    height: 268px;
    overflow: hidden;
    object-fit: cover;
    border-radius: 6px;
    background-color: rgba(#f5f5f5, 0.45);
  }
  .actor-info {
    .actor-name {
      padding-top: 10px;
      line-height: 32px;
      font-size: 28px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .actor-label {
      font-size: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
