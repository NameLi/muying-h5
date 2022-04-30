
// 文章路由
export default [
  // {
  //   path: '/articles',
  //   name: "Articles",
  //   component: () => import('@/views/article/index')
  // },
  {
    path: '/articles/:id',
    props: true,
    name: "Article",
    component: () => import('@/views/article/detail/index'),
    children: [
      {
        path: '/articles/:id/comments',
        props: true,
        name: "ArticleComments",
        component: () => import('@/views/comment/index')
      },
    ]
  },
]