<template>
  <div class="movie-cast">
    <header-bar title="演员表" />

    <movie-skeleton v-if="loading" top="50px" />

    <cast-panel
      v-for="actor in cast"
      :key="actor.id"
      :actors="actor.children"
      :title="actor.name"
      :count="actor.count"
    />
  </div>
</template>

<script>
import { getMovieCast } from "@/api/movie";
import CastPanel from "./components/CastPanel";

export default {
  name: "MovieCast",

  components: {
    CastPanel,
  },

  props: ["id"],

  data() {
    return {
      loading: false,
      cast: [],
    };
  },

  mounted() {
    this.getMovieCast();
  },

  methods: {
    async getMovieCast() {
      this.loading = true;
      let res = await getMovieCast(this.id);
      this.loading = false;

      if (res.code === 200) {
        this.cast = res.data;
      }
    },
  },
};
</script>