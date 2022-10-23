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
import { getActorAwards } from "@/api/actor";
import AwardItem from "./components/AwardItem";

export default {
  name: "ActorAward",

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
    this.getActorAwards();
  },

  methods: {
    async getActorAwards() {
      this.loading = true;
      const { code, data } = await getActorAwards(this.id);
      this.loading = false;

      if (code === 200) {
        this.awards = data;
      }
    },
  },
};
</script>