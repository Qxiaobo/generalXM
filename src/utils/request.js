import axios from "axios";
// import { MessageBox, Message, Loading } from "element-ui";
// let loadingInstance = false; //蒙版实例
// const isDev = process.env.NODE_ENV === 'development'
// const baseURL = isDev ? '/api' : 'http://backend.example.com/api'
const service = axios.create({
  baseURL : '',

  timeout: 15000,
});

service.interceptors.request.use(
  (config) => {
    // let token = window.localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = token;
    // }
    return config;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // console.log(res, '兰拦截')
    // loadingInstance.close()
    // if (res && res.code !== "000000") {
    //   Message({
    //     message: res.message || "Error",
    //     type: "error",
    //     duration: 5 * 1000,
    //   });
    //   // console.log(res, '222')
    //   return Promise.reject(new Error(res.message || "Error"));
    // } else {
    //   return res;
    // }
    // console.log(res,'res1111');
    return res
  },
  (error) => {
    console.log("err" + error);
    // Message({
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000,
    // });
    return Promise.reject(error);
  }
);

export default service;
