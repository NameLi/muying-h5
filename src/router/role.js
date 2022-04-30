
// 角色路由表
export default [
  {
    path: '/roles/:id',
    props: true,
    name: "Role",
    component: () => import('@/views/role/detail'),
    children: [
      {
        path: '/roles/:id/information',
        props: true,
        name: "RoleDetail",
        component: () => import('@/views/role/detail/information')
      },
      {
        path: '/roles/:id/movies',
        props: true,
        name: 'RoleMovies',
        component: () => import('@/views/role/movie/index')
      },
      {
        path: '/roles/:id/actors',
        props: true,
        name: 'RoleActors',
        component: () => import('@/views/role/actor/index')
      },
    ]
  },
]