<template>
  <div class="serial-wrapper">
    <header-bar title="影视系列" back />

    <skeleton v-if="loading" />

    <div class="serial-list">
      <serial-item
        v-for="serial in serials"
        :serial="serial"
        :key="serial.id"
      />
    </div>
  </div>
</template>

<script>
import { getMovieSerials } from "@/api/movie";
import SerialItem from "./components/SerialItem";

export default {
  name: "MovieSerials",

  components: {
    SerialItem,
  },

  props: ["id"],

  data() {
    return {
      loading: false,
      serials: [],
    };
  },

  mounted() {
    this.getMovieSerials();
  },

  methods: {
    async getMovieSerials() {
      this.loading = true;
      const { code, data } = await getMovieSerials(this.id);
      this.loading = false;

      if (code === 200) {
        this.serials = data;
      }
    },
  },
};
</script>