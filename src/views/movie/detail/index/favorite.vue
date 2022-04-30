<template>
  <page z-index="98" title="选择收藏夹" half round height="60vh">
    <template v-slot:header-left>
      <m-icon name="arrow-left" :size="32" @click="close()" />
    </template>

    <template v-slot:headerRight>
      <div class="create-btn" @click="pathToCreate()">新建</div>
    </template>

    <div class="save-main">
      <div class="save-content">
        <m-cell-group border v-if="list.length">
          <m-cell :title="item.name" v-for="item in list" :key="item.id">
            <m-checkbox v-model="item.is_checked" round />
          </m-cell>
        </m-cell-group>
      </div>
      <div class="no-data" v-if="list.length === 0 && !loading">
        您还没有收集夹
      </div>

      <div class="loading" v-if="loading">
        <m-spinner
          v-if="loading"
          type="triple"
          color="#f60, #7fd901, #36a2e0"
        />
      </div>
    </div>

    <template v-slot:footer>
      <m-button @click="submit" v-if="list.length" :loading="submitLoading"
        >保 存</m-button
      >
    </template>

    <!-- 创建收藏夹 -->
    <transition name="layer">
      <router-view @on-create="getUserFavorites" />
    </transition>
  </page>
</template>

<script>
import { getUserFavorites, updateUserMovieFavorite } from "@/api/user";

export default {
  name: "MovieFavorite",

  props: ["id"],

  data() {
    return {
      loading: false,
      list: [],
      submitLoading: false,
    };
  },

  mounted() {
    this.$preventScroll(true);

    this.getUserFavorites();
  },

  beforeRouteEnter(to, from, next) {
    next();
  },

  beforeDestroy() {
    this.$preventScroll(false);
  },

  methods: {
    pathToCreate() {
      this.$router.push(`/movies/${this.id}/favorite/create`);
    },

    close() {
      this.loading = false;
      this.$router.back();
    },

    async getUserFavorites() {
      let params = {
        movie: this.id,
      };

      this.loading = true;
      let res = await getUserFavorites(params);
      this.loading = false;

      if (res.code === 200) {
        this.list = res.data;
      }
    },

    async submit() {
      const checkedList = this.list.filter((item) => item.is_checked);
      const favorite_ids = checkedList.map((item) => item.id);

      const params = {
        favorite_ids,
      };

      this.submitLoading = true;
      let res = await updateUserMovieFavorite(this.id, params);
      this.submitLoading = false;

      if (res.code === 200) {
        this.$toast({
          position: "top",
          message: res.message,
        });

        this.$emit("favorite-update", res.data);
        this.$router.back();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  ::v-deep .page-header {
    .m-icon,
    .create-btn {
      font-size: 28px;
      color: $color-theme;
      padding: 0 10px;
    }
  }
  ::v-deep .m-checkbox__label--right {
    margin-left: 0;
  }
  .no-data {
    margin-top: 20vh;
    text-align: center;
    font-size: 28px;
    color: #999;
  }
  .loading {
    padding-top: 20vh;
  }
}
</style>