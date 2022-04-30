import MovieCard from './index.vue';

export default {
  install(Vue) {
    Vue.component(MovieCard.name, MovieCard);
  }
};