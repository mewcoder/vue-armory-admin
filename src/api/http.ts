import axios from 'axios';
const http = axios.create({
  baseURL: '/',
  timeout: 180000,
  withCredentials: true
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    return Promise.resolve(config);
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (res) => {
    return Promise.resolve(res.data);
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default http;
