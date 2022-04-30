import http from '@/http/index'

export const getVersion = () => http.get("/version")				          // 获取版本号
export const getQiniuUpToken = params => http.get("/qiniu/uptoken", params)				// 七牛文件上传token

export const getCaptcha = () => http.get("/captcha")			            // 获取图片验证码
export const createPhoneCode = (params) => http.get("/code", params)	// 获取手机验证码
export const checkPhoneCode = (params) => http.post("/code", params)	// 校验手机验证码

export const search = (params) => http.get("/search", params);        // 搜索

// 获取评论
export const getComments = (type, id, params) => http.get(`/${type}/${id}/comments`, params);
export const createComment = (type, id, params) => http.post(`/${type}/${id}/comments`, params);
export const deleteComment = (id) => http.delete(`/comments/${id}`);



// 举报
export const getReport = (params) => http.get(`/reports`, params);
export const createReport = (params) => http.post(`/reports`, params);