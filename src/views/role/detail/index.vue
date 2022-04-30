<template>
  <div class="role">
    <!-- 加载 -->
    <skeleton v-if="loading" :is-half="isHalf" />

    <header-scroll-bar
      :title="role.name"
      :subtitle="role.name_en"
      :poster="role.avatar"
      :end-top="140"
    >
      <div
        v-if="!loading"
        class="header-btn role-focus"
        :class="{ 'is-focus': role.is_collection }"
        @click="focusrole()"
      >
        {{ role.is_collection ? "已收藏" : "收藏" }}
      </div>
    </header-scroll-bar>

    <div class="role-info">
      <template v-if="!isDefaultPoster">
        <div class="role-avatar" :style="bgImage"></div>
        <div
          class="role-avatar role-avatar-larger"
          :style="bgImageLarger"
        ></div>
      </template>

      <div class="role-info-footer">
        <div class="role-name">{{ role.name }}</div>
        <div class="role-extra">
          <span>{{ role.info }}</span>
        </div>
      </div>

      <div
        v-if="!loading"
        class="role-save"
        :class="{ 'is-save': role.is_collection }"
        @click="focusRole()"
      >
        {{ role.is_collection ? "已收藏" : "收藏" }}
      </div>
    </div>

    <!-- 信息统计 -->
    <role-count :role="role" />

    <!-- 角色简介 -->
    <m-panel
      title="个人简介"
      subtitle="更多信息"
      :to="`/roles/${role.id}/information`"
    >
      <div v-if="role.brief" class="summary" v-html="role.brief"></div>
      <div v-else class="summary no-data">暂无简介</div>
    </m-panel>

    <!-- 角色相册 -->
    <m-panel
      v-if="role.photo_count"
      title="相册"
      :subtitle="`全部${role.photo_count}张`"
      :to="`${id}/photos`"
    >
      <photo-group :photos="role.photos" />
    </m-panel>

    <!-- 角色影视 -->
    <m-panel
      v-if="role.movie_count"
      title="角色影视"
      :subtitle="`全部${role.movie_count}部`"
      :to="`${id}/movies`"
    >
      <ul class="list-content">
        <movie-row
          v-for="movie in role.movies"
          :movie="movie"
          :key="movie.id"
        />
      </ul>
    </m-panel>

    <!-- 角色影人 -->
    <m-panel
      v-if="role.actor_count"
      title="角色影人"
      :subtitle="`全部${role.actor_count}人`"
      :to="`${id}/actors`"
    >
      <ul class="list-content">
        <actor-row
          v-for="actor in role.actors"
          :key="actor.id"
          :actor="actor"
        />
      </ul>
    </m-panel>

    <footer-info />

    <!-- 详情 -->
    <transition :name="transition">
      <router-view :role="role" />
    </transition>
  </div>
</template>

<script>
import { getRole } from "@/api/role";
import { createCollection, deleteCollection } from "@/api/user";
// import PhotoGroup from "./components/PhotoGroup";
import RoleCount from "./components/RoleCount";
import Skeleton from "./components/Skeleton";

export default {
  name: "RoleDetail",

  components: {
    Skeleton,
    // PhotoGroup,
    RoleCount,
  },

  props: ["id"],

  data() {
    return {
      loading: false,
      isHalf: true,
      focusLoading: false,
      role: {
        avatar: "",
        photos: [],
        movies: [],
        actors: [],
        movie_count: 0,
        photo_count: 0,
        actor_count: 0,
        info: "",
      },
      transition: "layer",
    };
  },

  computed: {
    isDefaultPoster() {
      return this.role.avatar.includes("default");
    },
    bgImage() {
      return `background-image:url('${this.role.avatar}')`;
    },
    bgImageLarger() {
      return `background-image:url('${this.role.avatar?.replace(
        /public/,
        "larger"
      )}')`;
    },
  },

  created() {
    document.title = "角色";
  },

  mounted() {
    this.getRole();
  },

  beforeRouteUpdate(to, from, next) {
    const layerRouters = ["RoleDetail"];

    if (layerRouters.includes(to.name)) {
      this.transition = "layer";
    } else {
      this.transition = "slide-left";
    }

    next();
  },

  methods: {
    // 获取角色信息
    async getRole() {
      this.loading = true;
      const res = await getRole(this.id);
      this.loading = false;

      if (res.code === 200) {
        this.role = res.data;

        //
        let infos = [];
        for (let item of res.data.defaults) {
          if (["外文名", "性别", "生日"].includes(item.label) && item.value) {
            infos.push(item.value);
          }
        }

        this.role.info = infos.join(" · ");
      }
    },

    // 收藏
    async focusRole() {
      if (this.focusLoading) return;

      this.focusLoading = true;
      const { code, data, message } = !this.role.is_collection
        ? await createCollection("roles", this.id)
        : await deleteCollection("roles", this.id);
      this.focusLoading = false;

      if (code === 200) {
        this.role.is_collection = data.is_collection;
        this.role.collection_count = data.collection_count;
        this.$message.success(message);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.role {
  padding-bottom: 10px;
  min-height: 100vh;
  background-color: #f5f5f5;
  .header-btn {
    color: #fff;
    padding: 0 40px;
    height: 56px;
    line-height: 56px;
    border-radius: 100px;
    background-color: rgba(#fff, 0.25);
    &.is-focus {
      background-color: rgba($color-theme, 0.3);
    }
  }
  .role-info {
    position: relative;
    height: 460px;
    background-color: rgba($color-theme, 0.85);
    .role-avatar {
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center 20%;
    }
    .role-avatar-larger {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 460px;
    }

    .role-save {
      position: absolute;
      right: 20px;
      bottom: 60px;
      color: #fff;
      padding: 0 40px;
      height: 56px;
      line-height: 56px;
      border-radius: 100px;
      background-color: rgba(#fff, 0.25);
      &.is-save {
        background-color: rgba($color-theme, 0.3);
      }
    }

    .role-info-footer {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 50px 200px 30px 20px;
      color: #fff;
      background-image: linear-gradient(
        transparent 0%,
        rgba(0, 0, 0, 0.9) 100%
      );
      .role-name {
        font-size: 40px;
        line-height: 48px;
      }
      .role-name_en {
        font-size: 24px;
        color: #ccc;
        line-height: 48px;
      }
      .role-extra {
        margin-top: 10px;
        font-size: 24px;
        color: #ddd;
      }
    }
  }
  .summary {
    white-space: normal;
    font-size: 28px;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-align: justify;
    &.no-data {
      height: 160px;
      line-height: 160px;
      text-align: center;
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
