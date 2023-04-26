import request from "@/utils/request";
let baseUrl = "http://localhost:3090";
export function getFromApi01(data) {
  return request({
    url: "api/getFrom",
    method: "post",
    data,
  });
}
