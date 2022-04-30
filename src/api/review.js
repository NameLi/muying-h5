import http from '@/http/index'

// 影评相关接口
export const getReview = (id) => http.get(`/reviews/${id}`);    // 影评详情


