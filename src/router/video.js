
// 视频路由
export default [
  {
    path: '/videos/:id',
    props: true,
    name: "Video",
    component: () => import('@/views/video/detail/index'),
    children: [
      {
        path: '/videos/:id/comments',
        props: true,
        name: "VideoComments",
        component: () => import('@/views/comment'),
      }
    ]
  },
]