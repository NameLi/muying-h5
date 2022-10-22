<template>
  <div class="favorite-container">
    <div class="banner">
      <div class="banner__round banner__round--left"></div>
      <div class="banner__round banner__round--right"></div>
    </div>

    <div class="favorite-content">
      <image-group :images="images" />

      <div class="favorite-info">
        <div class="favorite-title">{{ favorite.name }}</div>
        <div class="favorite-count">共 {{ favorite.count }} 部影视</div>
        <div class="favorite-brief">{{ favorite.brief }}</div>
      </div>

      <m-icon
        v-if="!$parent.loading"
        class="edit"
        :size="32"
        name="edit"
        @click="showEditAction()"
      />
    </div>

    <m-action-sheet
      :visible="visible"
      :actions="actions"
      show-cancel
      @cancel="visible = false"
      @click="handleClickItem"
    >
      <div slot="header">
        <div>确定吗？</div>
        <text>删除后无法恢复哦</text>
      </div>
    </m-action-sheet>
  </div>
</template>

<script>
import { deleteUserFavorite } from "@/api/user";

export default {
  name: "FavoriteInfo",

  props: {
    favorite: {
      type: Object,
    },
    images: {
      type: Array,
    },
  },

  data() {
    return {
      id: this.$route.params.id,
      visible: false,
      actions: [
        {
          name: "编辑",
        },
        {
          name: "删除",
          color: "#ed3f14",
          loading: false,
        },
      ],
    };
  },

  methods: {
    showEditAction() {
      this.visible = true;
    },

    handleClickItem(index) {
      this.visible = false;

      switch (index) {
        case 0:
          this.$router.push(`/profile/favorites/${this.id}/edit`);
          break;

        case 1:
          this.deleteFavorite();
      }
    },

    async deleteFavorite() {
      try {
        let instance = await this.$modal({
          title: "警告",
          content: "确定要删除该收藏夹吗？",
          confirmTextColor: "red",
          confirmButtonText: "删除",
          asyncClose: true,
        });

        let res = await deleteUserFavorite(this.id);
        instance.loading = false;

        if (res.code === 200) {
          this.$message({
            content: "删除成功！",
            type: "success",
          });

          instance.close();

          this.$router.back();
        }
      } catch (e) {
        console.warn(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.favorite-container {
  height: 320px;
  .favorite-content {
    display: flex;
    position: relative;
    padding: 130px 30px;
    .edit {
      position: absolute;
      right: 20px;
      width: 44px;
      height: 44px;
      line-height: 44px;
      color: #fff;
    }
    .favorite-poster {
      width: 140px;
      height: 140px;
      border-radius: 6px;
      object-fit: cover;
    }
    .favorite-info {
      margin-left: 26px;
      color: #fff;
      .favorite-title {
        font-size: 32px;
        font-weight: bold;
        height: 44px;
        line-height: 44px;
      }
      .favorite-count {
        margin-top: 12px;
        height: 32px;
        line-height: 32px;
      }
      .favorite-brief {
        margin-top: 12px;
        font-size: 24px;
      }
    }
  }

  .banner {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: #d67624;
    height: 320px;
    overflow: hidden;
  }
  .banner__round {
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    position: absolute;
  }
  .banner__round--left {
    left: -120px;
    top: -120px;
  }
  .banner__round--right {
    right: -120px;
    bottom: -120px;
  }
  .banner__round::after {
    display: block;
    content: "";
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    position: absolute;
  }
  .banner__round--left::after {
    right: -50px;
    top: 160px;
  }
  .banner__round--right::after {
    left: 60px;
    top: -30px;
  }
}
</style>