<template>
  <div class="container">
    <header-bar title="奖项详情" />

    <skeleton v-if="loading" />

    <div class="award-header">
      <div class="award-logo">
        <img :src="award.poster" alt="" />
      </div>
      <div class="award-info">
        <h5 class="award-title">第{{ award.session }}届{{ award.title }}</h5>
        <div class="award-brief">
          {{ award.year }} {{ award.place ? "/" : "" }} {{ award.place }}
        </div>
      </div>
    </div>

    <div class="award-content">
      <m-panel :title="type.type" v-for="type in award.data" :key="type.id">
        <!-- 影视获奖 -->
        <template v-if="type.is_actor === 0">
          <movie-row
            v-for="movie in type.children"
            :key="movie.id"
            :movie="movie"
          >
            <div class="win-tag" v-if="movie.win === 1">获奖</div>
          </movie-row>
        </template>

        <!-- 影人获奖 -->
        <template v-else>
          <actor-row
            v-for="actor in type.children"
            :key="actor.id"
            :actor="actor"
          >
            <div class="win-tag" v-if="actor.win === 1">获奖</div>

            <!-- 影视 -->
            <div class="actor-movie" v-if="actor.movie">
              {{ actor.movie.title }}
            </div>
          </actor-row>
        </template>
      </m-panel>
    </div>
  </div>
</template>

<script>
import { getAwardSession } from "@/api/award";
import Skeleton from "./components/Skeleton.vue";

export default {
  name: "AwardSession",

  components: {
    Skeleton,
  },

  props: ["name", "session"],

  data() {
    return {
      loading: false,
      award: {},
    };
  },

  mounted() {
    this.getAwardSession();
  },

  methods: {
    async getAwardSession() {
      this.loading = true;
      let res = await getAwardSession(this.name, this.session);
      this.loading = false;

      if (res.code === 200) {
        this.award = res.data;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}
.award-header {
  display: flex;
  align-items: center;
  margin: 20px;
  padding: 0 20px;
  height: 140px;
  border-radius: 12px;
  background-color: #fff;
  .award-logo {
    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;
    img {
      width: 100px;
      height: 100px;
      border-radius: 6px;
      object-fit: cover;
    }
  }
  .award-info {
    margin-left: 20px;
    .award-title {
      font-size: 28px;
      font-weight: bold;
    }
    .award-brief {
      margin-top: 10px;
      font-size: 24px;
    }
  }
}
.award-content {
  .win-tag {
    z-index: 1;
    position: absolute;
    right: 8px;
    top: 8px;
    height: 34px;
    line-height: 34px;
    font-size: 20px;
    padding: 0 10px;
    border-radius: 4px;
    color: #fff;
    background-color: #bb9354;
  }
  .actor-movie {
    margin-top: 6px;
    color: #999;
    text-align: center;
    font-size: 24px;
  }
}
</style>