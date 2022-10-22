import http from '@/http/index'

export const getVideos = (params) => http.get('/videos', params);   // 获取视频列表
export const getVideo = (id) => http.get(`/videos/${id}`);          // 获取视频详情
