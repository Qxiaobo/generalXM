import request from "@/utils/request";
// let baseUrl = "http://localhost:3090";
export function getTabelMerge(data) {
  return request({
    url: "api/getTabelMerge",
    method: "post",
    data,
  });
}