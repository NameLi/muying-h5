import http from '@/http/index'

export const getAwards = () => http.get(`/awards`);                 // 奖项列表
export const getAward = (name) => http.get(`/awards/${name}`);      // 奖项详情
export const getAwardSession = (name, session) => http.get(`/awards/${name}/${session}`);   // 奖项届详情