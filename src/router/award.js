
// 奖项路由
export default [
  {
    path: '/awards',
    name: "Awards",
    component: () => import('@/views/award/index/index')
  },
  {
    path: '/awards/:name',
    props: true,
    name: "Award",
    component: () => import('@/views/award/detail/index'),
    children: [
      {
        path: '/awards/:name/detail',
        name: "AwardDetail",
        props: true,
        component: () => import('@/views/award/detail/info')
      },
    ]
  },
  {
    path: '/awards/:name/:session',
    props: true,
    name: "AwardSession",
    component: () => import('@/views/award/session/index')
  },
]