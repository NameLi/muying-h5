import http from '@/http/index'

// 系列相关接口
export const getSerials = (params) => http.get(`/serials`, params);   // 系列列表
export const getSerialMovies = (id, params) => http.get(`/serials/${id}/movies`, params); // 系列影视
