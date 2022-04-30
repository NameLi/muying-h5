<template>
  <div class="container">
    <header-bar title="奖项列表" />

    <div class="award-main">
      <div class="award-group" v-for="award in awards" :key="award.id">
        <!-- <div class="award-header">
          <h6 class="type-name">{{ award.country }}</h6>
        </div> -->
        <div class="award-content border_right">
          <div
            class="award-item border_bottom"
            :key="award.id"
            @click="pathTo(award)"
          >
            <span>{{ award.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAwards } from "@/api/award";

export default {
  name: "Award",
  data() {
    return {
      loading: false,
      awards: [],
    };
  },

  mounted() {
    this.getAwards();
  },

  methods: {
    async getAwards() {
      this.loading = true;
      let res = await getAwards();
      this.loading = false;

      if (res.code === 200) {
        this.awards = res.data;
      }
    },

    pathTo(award) {
      this.$router.push(`/awards/${award.name}`);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  .award-main {
    .award-group {
      display: inline-block;
      width: 50%;
      // .award-header {
      //   padding: 0 30px;
      //   height: 80px;
      //   line-height: 80px;
      //   background-color: #eee;
      //   .type-name {
      //     font-size: 28px;
      //   }
      // }
      &:nth-child(2n) .border_right::before {
        display: none;
      }
      .award-content {
        .award-item {
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80px;
          line-height: 80px;
        }
      }
    }
  }
}
</style>