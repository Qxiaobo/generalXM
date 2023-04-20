import request from "@/utils/request";

export function firstData(data) {
  return request({
    url: "api/data",
    method: "post",
    data
  });
}

// export function uplodeData(data) {
//   return request({
//     url: "/upload/applyFile",
//     method: "post",
//     data
//   });
// }

// 封装的上传请求
// uploadFile(params) {
//   return axios.post(`/shiro/swpe/permission/uploadOrStartProceBPS`, params,
//    { headers: { 'Content-Type': 'multipart/form-data', token: window.localStorage.getItem('token')}})
// },
