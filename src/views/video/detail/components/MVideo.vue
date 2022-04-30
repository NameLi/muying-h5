<template>
  <div class="video-wrapper">
    <div class="video-box">
      <player ref="player" show-player />
    </div>
  </div>
</template>

<script>
import player from "@/components/Player/index";

export default {
  name: "MVideo",

  components: {
    player,
  },

  props: {
    video: {
      required: true,
    },
  },

  methods: {
    play() {
      this.$refs.player.play(this.video);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  .video-wrapper {
    height: 423px;
    .video-box {
      z-index: 98;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 423px;
      background: #000;
      height: 423px;
      #video {
        display: block;
        width: 100%;
        height: 420px;
      }
      .progress-wrapper {
        z-index: 99;
        height: 3px;
        background: #dedede;
        .progress {
          height: 3px;
          background: #51ace6;
        }
      }
    }
  }
}
</style>