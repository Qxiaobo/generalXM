import axios from "axios";
import { MessageBox, Message, Loading } from "element-ui";
// let loadingInstance = false; //蒙版实例
let baseURL = "http://localhost:3090";

const service = axios.create({
  baseURL,
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
    if(res=="[object Blob]"){
      // console.log(Object.prototype.toString.call(res));
      return res
    }
    if (res && res.code !== "000000") {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });
      // console.log(res, '222')
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
    // console.log(res,'res1111');
    return res
  },
  (error) => {
    console.log("err" + error);
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
