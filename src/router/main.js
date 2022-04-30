
// 基础路由
export default [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/home',
        name: "Home",
        component: () => import('@/views/home/index')
      },
      {
        path: '/movies',
        name: "Movies",
        component: () => import('@/views/movie/index/index')
      },
      {
        path: '/videos',
        name: "Videos",
        component: () => import('@/views/video/index/index')
      },
      {
        path: '/profile',
        name: "Profile",
        component: () => import('@/views/profile/index/index'),
        children: [
          {
            path: '/profile/information',
            name: "ProfileInformation",
            component: () => import('@/views/profile/information/index')
          },
          {
            path: '/profile/feedback',
            name: "Feedback",
            component: () => import('@/views/profile/feedback')
          },
          {
            path: '/profile/author',
            name: "AboutAuthor",
            component: () => import('@/views/profile/aboutus/author')
          },
          {
            path: '/profile/project',
            name: "AboutProject",
            component: () => import('@/views/profile/aboutus/project')
          },
          {
            path: '/profile/setting',
            name: "Setting",
            component: () => import('@/views/profile/setting/index')
          },
        ]
      },
    ]
  },
]