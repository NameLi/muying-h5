import Page from './index.vue';

export default {
  install(Vue) {
    Vue.component(Page.name, Page);
  }
};