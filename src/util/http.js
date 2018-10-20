import axios from 'axios' //引用axios
import {delCookie,getCookie} from '@/util/util' //引用刚才我们创建的util.js文件，并使用getCookie方法
import qs from 'qs' //很重要！！过滤json格式化
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'https://quyou.l520.net/'; //这是调用数据接口
// const usertoken = getCookie('user_token');
// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
  config => {
    const token = getCookie('user_token'); // 获取Cookie
    // console.log("token:"+token);
    config.data = qs.stringify(config.data);//过滤成？&=格式
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',// 设置跨域头部
      'token': token
    };
    return config;
  },

  err => {
    return Promise.reject(err);
  }
);
 
 
// http response 拦截器
axios.interceptors.response.use(
  response => {
//response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
    if(response. error_code
== 10004) {
      router.push({
        path: '/login',
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error.response.data)
  });
 
export default axios;
 
/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
 
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}
 
/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}
 
/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}
 
/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}
