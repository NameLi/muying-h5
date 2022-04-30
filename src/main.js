import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.css'
import 'mind-ui-vue/lib/mind-ui-vue.css';
import { APP_NAME } from './config'


// px2rem
import 'lib-flexible/flexible'

// 上拉加载指令
import infiniteScroll from "./directive/infinite-scroll";
Vue.use(infiniteScroll)


// UI 组件库
import MindUI from 'mind-ui-vue'
Vue.use(MindUI)

// 懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload);

// 页眉
import HeaderBar from '@/components/Header/HeaderBar/index'
Vue.use(HeaderBar)

// 根据滚动变化页眉
import HeaderScrollBar from '@/components/Header/HeaderScrollBar/index'
Vue.use(HeaderScrollBar)

// fixed 子页面
import Page from '@/components/Page'
Vue.use(Page)

// 
import MPanel from '@/components/MPanel'
Vue.use(MPanel)

// 视频列
import VideoItem from '@/components/Video/VideoItem'
Vue.use(VideoItem)

// 视频行
import VideoRow from '@/components/Video/VideoRow'
Vue.use(VideoRow)

// 文章列
import ArticleItem from '@/components/Article/ArticleItem'
Vue.use(ArticleItem)

// 影人列
import ActorItem from '@/components/Actor/ActorItem/index'
Vue.use(ActorItem)

// 影人行
import ActorRow from '@/components/Actor/ActorRow/index'
Vue.use(ActorRow)

// 角色列
import RoleItem from '@/components/Role/RoleItem/index'
Vue.use(RoleItem)

// 角色行
import RoleRow from '@/components/Role/RoleRow/index'
Vue.use(RoleRow)

// 影视行
import MovieRow from '@/components/Movie/MovieRow/index'
Vue.use(MovieRow)

// 影视列
import MovieItem from '@/components/Movie/MovieItem/index'
Vue.use(MovieItem)

// 影人骨架屏
import MovieSkeleton from '@/components/Movie/Skeleton'
Vue.use(MovieSkeleton)

// 影视信息卡
import MovieCard from '@/components/Movie/MovieCard/index'
Vue.use(MovieCard)

// 影评列
import ReviewItem from '@/components/Review/ReviewItem/index'
Vue.use(ReviewItem)

// switch 样式的 tab 切换
import TabSwitch from '@/components/TabSwitch/index'
Vue.use(TabSwitch)

// app info
import FooterInfo from '@/components/App/FooterInfo'
Vue.use(FooterInfo)

// 无数据
import NoData from '@/components/NoData'
Vue.use(NoData)

// 图片上传
import ImageUpload from "./components/ImageUpload/index";
Vue.use(ImageUpload);

// 图片组
import ImageGroup from "./components/ImageGroup/index";
Vue.use(ImageGroup);


// 图片预览
import PhotoGroup from "./components/Photo/PhotoGroup/index";
Vue.use(PhotoGroup);

import PhotoSwiper from "./components/Photo/PhotoSwiper/index";
Vue.use(PhotoSwiper);

// tool bar
import ToolBar from "./components/Tool/ToolBar/index";
Vue.use(ToolBar);

// 点赞
import UserLike from "./components/Tool/UserLike/index";
Vue.use(UserLike);

// 收藏
import UserCollection from "./components/Tool/UserCollection/index";
Vue.use(UserCollection);


// 举报
import Report from "./components/Report/index";
Vue.use(Report);

// loading skeleton
import Skeleton from "./components/Skeleton/index";
Vue.use(Skeleton);



// 全局过滤器
import * as filters from './filters/index'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 阻止页面滚动
import { preventScroll } from './util/index'
Vue.prototype.$preventScroll = preventScroll;


// 应用名称
Vue.prototype.$APP_NAME = APP_NAME


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
