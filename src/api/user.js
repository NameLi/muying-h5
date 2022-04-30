import http from '@/http/index'

// 账号
export const register = (params) => http.post(`/register`, params);     // 注册
export const getUserToken = (params) => http.post(`/login`, params);    // 登录获取token
export const getUserInfo = (params) => http.get(`/user`, params);       // 登录用户信息
export const updateUserInfo = (params) => http.put(`/user`, params);    // 更新用户信息
export const checkAccount = (params) => http.post(`/account`, params);  // 校验手机号是否存在
export const updateUserPassword = (params) => http.put(`/user/password`, params);    // 更新用户密码



// 影视收藏
export const getUserFavorites = (params) => http.get(`/user/favorites`, params);                // 收藏夹列表 
export const getUserFavorite = (id, params) => http.get(`/user/favorites/${id}`, params);       // 收藏夹详情
export const createUserFavorite = (params) => http.post(`/user/favorites`, params);             // 新建收藏夹
export const updateUserFavorite = (id, params) => http.put(`/user/favorites/${id}`, params);    // 更新收藏夹
export const deleteUserFavorite = (id) => http.delete(`/user/favorites/${id}`);                 // 删除收藏夹
export const deleteUserFavoriteMovies = (id, union_id) => http.delete(`/user/favorites/${id}/movies/${union_id}`);  // 删除收藏夹下影视

export const getUserFavoriteMovies = (id, params) => http.get(`/user/favorites/${id}/movies`, params);  // 收藏夹下影视
export const updateUserMovieFavorite = (id, params) => http.put(`/user/movies/${id}/favorites`, params);     // 更新影视所属收藏夹


// 用户评分
export const createUserMovieRating = (id, params) => http.post(`/user/movies/${id}/rating`, params)   // 用户评分
export const userMovieWish = (id, params) => http.post(`/user/movies/${id}/wish`, params)         // 用户想看

// 用户反馈
export const createFeedback = (params) => http.post(`/feedback`, params)


/**
 * @desc 用户收藏
 * */

// 收藏统计
export const getUserCollectionCount = () => http.get(`/user/collections/count`);


/**
 * @desc 收藏
 * type 被收藏资源 可选值为 actors reviews roles videos
 * @return array
*/
export const getUserCollection = (type) => http.get(`/user/collections/${type}`);
export const createCollection = (type, id) => http.post(`/user/${type}/${id}/collections`);
export const deleteCollection = (type, id) => http.delete(`/user/${type}/${id}/collections`);

// 投票，赞同与反对
export const createReviewVote = (id, params) => http.post(`/reviews/${id}/voters`, params);

// 评论喜欢
export const createCommentLike = (id) => http.post(`/comments/${id}/like`);
export const deleteCommentLike = (id) => http.delete(`/comments/${id}/like`);


/**
 * @desc 点赞
 * type 被点赞的资源 可选值为 videos photos 
 * @return array
*/
// 喜欢
export const createLike = (type, id) => http.post(`/${type}/${id}/like`);
export const deleteLike = (type, id) => http.delete(`/${type}/${id}/like`);
