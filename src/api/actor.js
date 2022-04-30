import http from '@/http/index'

// 影人相关
export const getActor = (id) => http.get(`/actors/${id}`);                              // 获取影人信息
export const getActorAwards = (id) => http.get(`/actors/${id}/awards`);                 // 获取影人奖项
export const getActorPhotos = (id, params) => http.get(`/actors/${id}/photos`, params); // 获取影人相册
export const getActorWorks = (id, params) => http.get(`/actors/${id}/works`, params);   // 获取影人参演作品
export const getActorRoles = (id, params) => http.get(`/actors/${id}/roles`, params);   // 获取影人饰演角色
