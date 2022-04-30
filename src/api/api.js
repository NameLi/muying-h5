import http from '@/http/index';

export const getCover = () => http.get('movie/cover');        // 今日封面
export const getIndex = () => http.get('index');              // 首页聚合接口

export const getCategories = () => http.get("/categories");                    // 影视分类
export const getMovieTheater = (params) => http.get('movie/theater', params);  // 正在热映
export const getMovieComing = (params) => http.get('movie/coming', params);    // 即将上映
export const getMovieTop = (params) => http.get('movie/top', params);          // TOP 100
export const getMovieToday = (params) => http.get('movie/today', params);      // 历史上的今日上映影片
