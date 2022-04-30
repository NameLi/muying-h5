
// 影人路由表
export default [
  {
    path: '/actors/:id',
    props: true,
    name: "Actor",
    component: () => import('@/views/actor/detail'),
    children: [
      {
        path: '/actors/:id/information',
        props: true,
        name: "ActorDetail",
        component: () => import('@/views/actor/detail/information')
      },
      {
        path: '/actors/:id/awards',
        props: true,
        name: "ActorAwards",
        component: () => import('@/views/actor/award/index')
      },
      {
        path: '/actors/:id/works',
        props: true,
        name: "ActorWorks",
        component: () => import('@/views/actor/works/index')
      },
      {
        path: '/actors/:id/roles',
        props: true,
        name: "ActorRoles",
        component: () => import('@/views/actor/role/index')
      },
    ]
  },
]