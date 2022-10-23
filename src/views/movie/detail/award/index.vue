<template>
  <page>
    <header-bar title="奖项荣誉" />

    <skeleton v-if="loading" />

    <div class="award">
      <award-item v-for="award in awards" :key="award.id" :award="award" />
    </div>
  </page>
</template>

<script>
import { getMovieAwards } from "@/api/movie";
import AwardItem from "./components/AwardItem";

export default {
  name: "MovieAward",

  components: {
    AwardItem,
  },

  props: ["id"],

  data() {
    return {
      loading: false,
      awards: [],
    };
  },

  mounted() {
    this.getMovieAwards();
  },

  methods: {
    async getMovieAwards() {
      this.loading = true;
      const { code, data } = await getMovieAwards(this.id);
      this.loading = false;

      if (code === 200) {
        this.awards = data;
      }
    },
  },
};
</script>