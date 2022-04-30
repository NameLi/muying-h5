import http from '@/http/index'

// 影视相关接口
export const getMovies = (params) => http.get(`/movies`, params);                               // 影视列表
export const getMovie = (id) => http.get(`/movies/${id}`);                                      // 影视详情
export const getMovieCast = (id) => http.get(`/movies/${id}/cast`);                             // 影视演员
export const getMovieRoles = (id, params) => http.get(`/movies/${id}/roles`, params);           // 影视角色
export const getMoviePhotos = (id, params) => http.get(`/movies/${id}/photos`, params);         // 影视相册
export const getMovieVideos = (id, params) => http.get(`/movies/${id}/videos`, params);         // 影视视频
export const getMovieComments = (id, params) => http.get(`/movies/${id}/comments`, params);     // 影视评分
export const getMovieReviews = (id, params) => http.get(`/movies/${id}/reviews`, params);       // 影视长评
export const getMovieLevels = (id, params) => http.get(`/movies/${id}/levels`, params);         // 引导等级
export const getMoviePubdates = (id, params) => http.get(`/movies/${id}/pubdates`, params);     // 上映日期
export const getMovieAwards = (id) => http.get(`/movies/${id}/awards`);                         // 获得奖项
export const getMovieKnowledges = (id, params) => http.get(`/movies/${id}/knowledges`, params); // 幕后知识
export const getMovieDialogues = (id, params) => http.get(`/movies/${id}/dialogues`, params);   // 经典台词
export const getMovieCompanies = (id) => http.get(`/movies/${id}/companies`);                   // 关联公司
export const getMovieArticles = (id, params) => http.get(`/movies/${id}/articles`, params);     // 文章资讯
export const getMovieSerials = (id, params) => http.get(`/movies/${id}/serials`, params);       // 所属系列
export const getMovieRatings = (id) => http.get(`/movies/${id}/ratings`);                       // 评分详情