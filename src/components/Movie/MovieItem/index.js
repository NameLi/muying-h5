import MovieItem from './index.vue';

export default {
  install(Vue) {
    Vue.component(MovieItem.name, MovieItem);
  }
};