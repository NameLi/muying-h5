<template>
  <div class="container">
    <header-scroll-bar :title="serial.name" :subtitle="`共${serial.count}部`" />

    <!-- 系列信息 -->
    <serial-info :serial="serial" />

    <!-- 系列影视列表 -->
    <div class="serial-list">
      <movie-item
        v-for="movie in serial.movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script>
import { getSerialMovies } from "@/api/serial";
import SerialInfo from "./components/SerialInfo.vue";

export default {
  name: "SerialMovies",
  components: { SerialInfo },

  props: ["id"],

  data() {
    return {
      loading: false,
      serial: {
        movies: [],
      },
    };
  },
  mounted() {
    this.getSerialMovies();
  },
  methods: {
    async getSerialMovies() {
      this.loading = true;
      let res = await getSerialMovies(this.id);
      this.loading = false;

      if (res.code === 200) {
        this.serial = res.data;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.serial-list {
  padding: 30px 0;
  font-size: 0;
}
</style>
