import http from '@/http/index'

// 角色相关接口
export const getRole = (id) => http.get(`/roles/${id}`);  // 角色详情
export const getRolePhotos = (id, params) => http.get(`/roles/${id}/photos`, params); // 角色相册
export const getRoleMovies = (id, params) => http.get(`/roles/${id}/movies`, params); // 角色影视
export const getRoleActors = (id, params) => http.get(`/roles/${id}/actors`, params); // 角色影人