<template>
  <div class="movie-extra">

    <!-- 上映日期 -->
    <div class="extra-item" v-if="movie.pubdate_count">
      <div class="extra-name">上映日期</div>
      <div class="extra-label" @click="$router.push(`/movies/${id}/pubdates`)">
        查看全部({{ movie.pubdate_count }})<m-icon name="arrow-right" />
      </div>
    </div>
    
    <!-- 家长引导 -->
    <div class="extra-item" v-if="movie.level_count">
      <div class="extra-name">家长引导</div>
      <div class="extra-label" @click="$router.push(`/movies/${id}/levels`)">
        查看全部({{ movie.level_count }})<m-icon name="arrow-right" />
      </div>
    </div>
    
    <!-- 经典台词 -->
    <div class="extra-item" v-if="movie.dialogue_count">
      <div class="extra-name">经典台词</div>
      <div class="extra-label" @click="$router.push(`/movies/${id}/dialogues`)">
        查看全部({{ movie.dialogue_count }})<m-icon name="arrow-right" />
      </div>
    </div>

    <!-- 幕后知识 -->
    <div class="extra-item" v-if="movie.knowledge_count">
      <div class="extra-name">幕后知识</div>
      <div
        class="extra-label"
        @click="$router.push(`/movies/${id}/knowledges`)"
      >
        查看全部({{ movie.knowledge_count }})<m-icon name="arrow-right" />
      </div>
    </div>

    <!-- 制作发行 -->
    <div class="extra-item" v-if="movie.company_count">
      <div class="extra-name">制作发行</div>
      <div class="extra-label" @click="$router.push(`/movies/${id}/companies`)">
        {{ movie.company_count }}家公司参与制作发行<m-icon name="arrow-right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieExtra",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>

<style scoped lang="scss">
.movie-extra {
  white-space: nowrap;
  padding: 20px 10px;
  background-color: rgb(246, 246, 246);
  border-radius: 6px;
  .extra-item {
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
    height: 70px;
    line-height: 70px;
    .extra-name {
      font-weight: bold;
      font-size: 28px;
      color: #333;
    }
    .extra-label {
      font-size: 26px;
      color: rgb(128, 141, 176);
      .m-icon {
        font-size: 24px !important;
      }
    }
  }
}
</style>