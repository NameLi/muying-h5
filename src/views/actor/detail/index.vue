<template>
  <div class="actor">
    <!-- 加载 -->
    <skeleton v-if="loading" :is-half="isHalf" />

    <header-scroll-bar
      :title="actor.name"
      :subtitle="actor.name_en"
      :poster="actor.avatar"
    >
      <div
        v-if="!loading"
        class="header-btn actor-focus"
        :class="{ 'is-focus': actor.is_collection }"
        @click="focusActor()"
      >
        {{ actor.is_collection ? "已关注" : "关注" }}
      </div>
    </header-scroll-bar>

    <div class="actor-info" :style="ImageH" @click="showFullAvatar()">
      <template v-if="!isDefaultPoster">
        <div class="actor-avatar" :style="bgImage"></div>
        <div
          class="actor-avatar actor-avatar-larger"
          :style="bgImageLarger"
        ></div>
      </template>

      <div class="actor-info-footer">
        <div class="actor-name">{{ actor.name }}</div>
        <div class="actor-name_en">{{ actor.name_en }}</div>

        <div class="actor-extra">
          <span>{{ actor.gender }}</span>
          <em v-if="actor.gender">·</em>
          <span>{{ actor.birthday }}</span>
          <em v-if="actor.country">·</em>
          <span>{{ actor.country }}</span>
        </div>
      </div>

      <div
        v-if="!loading"
        class="actor-focus"
        :class="{ 'is-focus': actor.is_collection }"
        @click.stop="focusActor()"
      >
        {{ actor.is_collection ? "已关注" : "关注" }}
      </div>
    </div>

    <!-- 信息统计 -->
    <actor-count :actor="actor" />

    <!-- 奖项 -->
    <actor-award
      v-if="actor.award_count"
      :id="id"
      :award="actor.award"
      :award-count="actor.award_count"
    />

    <!-- 简介 -->
    <m-panel
      title="个人简介"
      subtitle="更多信息"
      :to="`/actors/${actor.id}/information`"
    >
      <div v-if="actor.summary" class="summary" v-html="actor.summary"></div>
      <div v-else class="summary no-data">暂无简介</div>
    </m-panel>

    <!-- 相册 -->
    <m-panel
      v-if="actor.photo_count"
      title="相册"
      :subtitle="`全部${actor.photo_count}张`"
      :to="`${id}/photos`"
    >
      <photo-group :photos="actor.photos" />
    </m-panel>

    <!-- 影视作品 -->
    <m-panel
      v-if="actor.works_count"
      title="影视作品"
      :subtitle="`全部${actor.works_count}部`"
      :to="`${id}/works`"
    >
      <ul class="list-content">
        <movie-row
          v-for="movie in actor.works"
          :key="movie.id"
          :movie="movie"
        />
      </ul>
    </m-panel>

    <!-- 角色 -->
    <m-panel
      v-if="actor.role_count"
      title="饰演角色"
      :subtitle="`全部${actor.role_count}部`"
      :to="`${id}/roles`"
    >
      <ul class="list-content">
        <role-row v-for="role in actor.roles" :key="role.id" :role="role" />
      </ul>
    </m-panel>

    <footer-info />

    <transition :name="transition">
      <router-view :actor="actor" />
    </transition>
  </div>
</template>

<script>
import { getActor } from "@/api/actor";
import { createCollection, deleteCollection } from "@/api/user";
import ActorAward from "./components/ActorAward";
import ActorCount from "./components/ActorCount";
import Skeleton from "./components/Skeleton";

export default {
  name: "ActorDetail",

  components: {
    ActorAward,
    ActorCount,
    Skeleton,
  },

  props: ["id"],

  data() {
    return {
      loading: false,
      isHalf: true,
      focusLoading: false,
      actor: {
        avatar: "",
        photo_count: 0,
        works_count: 0,
        role_count: 0,
        award: {},
        photos: [],
        works: [],
      },
      isShowFullAvatar: false,
      defaultHeight: "",
      maxHeight: "",
      transition: "layer",
    };
  },

  computed: {
    isDefaultPoster() {
      return this.actor.avatar.includes("default");
    },
    bgImage() {
      return `background-image:url('${this.actor.avatar}')`;
    },
    bgImageLarger() {
      return `background-image:url('${this.actor.avatar?.replace(
        /public/,
        "larger"
      )}')`;
    },
    ImageH() {
      const H = this.isShowFullAvatar ? this.maxHeight : this.defaultHeight;
      return H ? `height: ${H}` : "";
    },
  },

  created() {
    document.title = "影人";

    const actor = this.$store.getters.getActor;

    if (actor && parseInt(this.id) === actor.id) {
      this.actor = { ...this.$options.data().actor, ...actor };
      document.title = actor.name;
    }

    this.getActor();
  },

  mounted() {
    this.defaultHeight =
      document.querySelector(".actor-info").offsetHeight + "px";
  },

  beforeRouteUpdate(to, from, next) {
    const layerRouters = ["ActorDetail"];

    if (layerRouters.includes(to.name)) {
      this.transition = "layer";
    } else {
      this.transition = "slide-left";
    }

    next();
  },

  methods: {
    async getActor() {
      this.loading = true;
      const { code, data } = await getActor(this.id);
      this.loading = false;

      if (code === 200) {
        this.actor = data;
        document.title = data.name;
        this.getAvatarInfo(data.avatar);
      }
    },

    // 关注
    async focusActor() {
      if (this.focusLoading) return;

      this.focusLoading = true;
      const { code, data, message } = !this.actor.is_collection
        ? await createCollection("actors", this.id)
        : await deleteCollection("actors", this.id);
      this.focusLoading = false;

      if (code === 200) {
        this.actor.is_collection = data.is_collection;
        this.actor.collection_count = data.collection_count;
        this.$message.success(message);
      }
    },

    // 获取影人封面图片长宽，用于点击查看大图
    getAvatarInfo(url) {
      let img = new Image();
      img.src = url;
      img.onload = () => {
        const windowW = document.body.offsetWidth;
        const { width, height } = img;
        const maxHeight = Math.floor((height * windowW) / width);
        this.maxHeight = maxHeight + "px";
      };
    },

    // 显示全图
    showFullAvatar() {
      this.isShowFullAvatar = !this.isShowFullAvatar;
    },
  },
};
</script>

<style scoped lang="scss">
.actor {
  background-color: #f5f5f5;
  padding-bottom: 10px;
  min-height: 100vh;
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

  .actor-info {
    position: relative;
    height: 460px;
    background-color: rgba($color-theme, 0.85);
    transition: height 0.2s;
    .actor-avatar {
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center 20%;
    }
    .actor-avatar-larger {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }

    .actor-focus {
      position: absolute;
      right: 20px;
      bottom: 60px;
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

    .actor-info-footer {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 50px 200px 30px 20px;
      color: #fff;
      background-image: linear-gradient(
        transparent 0%,
        rgba(0, 0, 0, 0.4) 100%
      );
      .actor-name {
        font-size: 40px;
        line-height: 48px;
      }
      .actor-name_en {
        font-size: 24px;
        color: #ccc;
        line-height: 48px;
      }
      .actor-extra {
        margin-top: 10px;
        font-size: 24px;
        color: #ddd;
        > em {
          margin: 0 10px;
        }
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
      font-size: 24px;
    }
  }
}
</style>
