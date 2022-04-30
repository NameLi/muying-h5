import http from '@/http/index'

// 文章相关
export const getArticle = (id) => http.get(`/articles/${id}`);    // 文章详情
