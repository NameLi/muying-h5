<template>
  <div class="photo-page">
    <header-bar title="相册" />

    <m-navbar-group
      line-color="#e54847"
      active-color="#e54847"
      @change="tabChange"
    >
      <m-navbar
        v-for="n in navs"
        :title="n.title"
        :name="n.name"
        :key="n.name"
      />
    </m-navbar-group>

    <div class="photo-list" v-infinite-scroll="loadMore">
      <photo-item
        v-for="(photo, index) in list"
        :photo="photo"
        :key="photo.id"
        @click.native="preview(index)"
      />

      <m-loadmore :loading="loading" :load-end-content="loadEndContent" />
    </div>

    <transition name="photo-fade">
      <photo-swiper v-if="isShowSwiper" :photos="photos" :total="total" />
    </transition>
  </div>
</template>

<script>
import { getMoviePhotos } from "@/api/movie";
import { getActorPhotos } from "@/api/actor";
import { getRolePhotos } from "@/api/role";
import { getInfiniteData } from "@/mixins/getInfiniteData";
import PhotoItem from "./components/PhotoItem";

export default {
  name: "Photos",

  components: {
    PhotoItem,
  },

  mixins: [getInfiniteData],

  props: ["id"],

  data() {
    return {
      request: null,
      type: "",
      form: {
        type: "all",
      },
      navs: [],
    };
  },

  computed: {
    photos() {
      let photos = this.list.map((p) => {
        p.url_larger = p.url.replace(/@mini/, "@larger");
        return p;
      });
      return photos;
    },
    isShowSwiper() {
      return this.$route.hash.includes("#preview");
    },
    loadEndContent() {
      return this.total ? (this.total > 9 ? "没有更多图片了" : "") : "暂无图片";
    },
  },

  created() {
    this.type = this.$route.params.type;

    switch (this.type) {
      case "movies":
        this.request = getMoviePhotos;
        this.navs = [
          {
            title: "全部",
            name: "all",
          },
          {
            title: "海报",
            name: "poster",
          },
          {
            title: "剧照",
            name: "still",
          },
          {
            title: "其它",
            name: "other",
          },
        ];
        break;
      case "actors":
        this.request = getActorPhotos;
        this.navs = [
          {
            title: "全部",
            name: "all",
          },
          {
            title: "写真",
            name: "portrait",
          },
          {
            title: "截图",
            name: "cut",
          },
          {
            title: "其它",
            name: "other",
          },
        ];
        break;
      case "roles":
        this.request = getRolePhotos;
        this.navs = [
          {
            title: "全部",
            name: "all",
          },
          {
            title: "海报",
            name: "poster",
          },
          {
            title: "截图",
            name: "cut",
          },
          {
            title: "其它",
            name: "other",
          },
        ];
        break;
    }
  },

  methods: {
    tabChange(type) {
      this.form.type = type;
      this.page = 1;
      this.list = [];
      this.loadMore();
    },

    loadMore() {
      this.getData(this.request, this.id);
    },

    // 预览
    preview(index) {
      this.$router.push(`#preview?index=${index}`);
    },
  },
};
</script>

<style scoped lang="scss">
.photo-fade-enter-active,
.photo-fade-leave-active {
  transition: opacity 0.5s;
}
.photo-fade-enter,
.photo-fade-leave-to {
  opacity: 0;
}

::v-deep .tabs__wrap {
  z-index: 2;
  position: sticky;
  top: 100px;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  .tabs__line {
    height: 8px !important;
  }
}

.photo-list {
  font-size: 0;
  padding: 5px;
}
</style>