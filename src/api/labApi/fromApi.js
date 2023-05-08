import request from "@/utils/request";
let baseUrl = "http://localhost:3090";
export function getFromApi01(data) {
  return request({
    url: "api/getFrom",
    method: "post",
    data,
  });
}
export function download(data) {
  return request({
    url: "https://jsgsn.cevmp.cn/gateway/subsidy/excel/download",
    method: "get",
    responseType: "blob",
    headers: {
      'Authorization':
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlVHlwZSI6NSwidXNlcl9uYW1lIjoiempidGdseSIsInJvbGVJZCI6IjE2NDU2NDc1NDYxMTc5MTg3MjIiLCJhdXRob3JpdGllcyI6WyJiODM3NWRhNC0zZGYzLTQ2NTQtOWY4NS01YzUwOTBjOTk1YmQiXSwib3JnSWQiOiIxNTgzMjk2MjgwOTkyNzQzNDI2IiwiY2xpZW50X2lkIjoidGVzdF9jbGllbnQiLCJhcHBSb2xlSWQiOm51bGwsInNjb3BlIjpbInJlYWQiXSwib3JnYW5pemF0aW9uIjoiempidGdseSIsIm5hbWUiOiJnbHkiLCJpZCI6IjE2NTA0MDk5NzAyMjQ5Nzk5NjkiLCJzdGF0ZSI6MSwiZXhwIjoxNjgzMTk3Njg3LCJqdGkiOiIyc2VzRGlsZE1KS3dKX1pJTXE2bEg5MkFDQnciLCJ1c2VybmFtZSI6InpqYnRnbHkifQ.dVdskYiluUoKHVutyhEPavWq-1a_tiTii4A3fjMK1dc",
    },
    data,
  });
}
export function getQueryAllApply(data) {
  return request({
    url: "https://jsgsn.cevmp.cn/gateway/subsidy/buildApply/queryAllApply",
    method: "post",
    data,
  });
}
