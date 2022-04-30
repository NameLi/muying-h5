import Component from './index.vue';

export default {
  install(Vue) {
    Vue.component(Component.name, Component);
  }
};