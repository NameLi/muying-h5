import infiniteScroll from './infinite-scroll'

export default {
  install(Vue) {
    Vue.directive('infinite-scroll', infiniteScroll)
  }
}