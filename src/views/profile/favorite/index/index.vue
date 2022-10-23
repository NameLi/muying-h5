<template>
  <div class="container">
    <header-bar title="我的收藏夹" />
    <!-- 加载动画 -->
    <div class="skeleton-wrapper" v-if="loading">
      <div class="skeleton">
        <div class="skeleton-item" v-for="n in 7" :key="n">
          <div class="item-poster"></div>
          <div class="item-info">
            <div class="item-info-title"></div>
            <div class="item-info-count" style="width: 24%"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="save-header">
      <div class="count">{{ total }}个收藏夹</div>
      <div class="create-btn" @click="showCreatePage">新建收藏夹</div>
    </div>

    <!-- 收藏夹列表 -->
    <div class="save-list">
      <div
        class="save-item"
        v-for="item in list"
        :key="item.id"
        @click="$router.push(`/profile/favorites/${item.id}`)"
      >
        <div class="save-content">
          <div class="save-title">{{ item.name }}</div>
          <div class="save-info">{{ item.count }}个内容</div>
        </div>
      </div>
    </div>

    <no-data v-if="total === 0 && !loading">
      <div class="no-data">
        您还没有收藏夹，立即<span
          @click="$router.push('/profile/favorites/create')"
          >创建</span
        >？
      </div>
    </no-data>

    <transition name="layer">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { getUserFavorites } from "@/api/user";

export default {
  name: "Favorites",

  data() {
    return {
      loading: false,
      list: [],
    };
  },

  computed: {
    total() {
      return this.list.length;
    },
  },

  mounted() {
    this.getUserFavorites();
  },

  methods: {
    showCreatePage() {
      this.$router.push(`/profile/favorites/create`);
    },

    async getUserFavorites() {
      this.loading = true;
      let res = await getUserFavorites();
      this.loading = false;

      if (res.code === 200) {
        this.list = res.data;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  .skeleton-wrapper {
    z-index: 2;
    position: fixed;
    left: 0;
    top: 100px;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);
    .skeleton {
      top: 10px;
      .skeleton-item {
        display: flex;
        align-items: center;
        margin: 0 30px;
        height: 130px;
        .item-poster {
          width: 90px;
          height: 90px;
          border-radius: 6px;
          background-color: #f5f5f5;
        }
        .item-info {
          flex: 1;
          margin-left: 16px;
          .item-info-title {
            margin-bottom: 18px;
            height: 36px;
            background-color: #f5f5f5;
          }
          .item-info-count {
            height: 32px;
            background-color: #f5f5f5;
          }
        }
      }
    }
  }

  .save-header {
    z-index: 1;
    position: sticky;
    left: 0;
    top: 100px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    height: 68px;
    background-color: #f5f5f5;

    .count {
      color: #999;
      font-size: 24px;
    }

    .create-btn {
      color: $color-theme;
    }
  }

  .save-list {
    padding: 10px 0;
    .save-item {
      display: flex;
      height: 130px;
      padding: 20px 30px;
      border-bottom: 1px solid #f5f5f5;
      .save-poster {
        width: 90px;
        height: 90px;
        border-radius: 6px;
        object-fit: cover;
      }
      .save-content {
        // margin-left: 16px;
        .save-title {
          height: 50px;
          line-height: 40px;
          font-size: 28px;
          font-weight: bold;
        }
        .save-info {
          height: 40px;
          line-height: 40px;
          font-size: 24px;
          color: #999;
        }
      }
    }
  }
  .no-data {
    span {
      color: $color-theme;
    }
  }
}
</style>