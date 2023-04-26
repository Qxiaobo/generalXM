import request from "@/utils/request";
let baseUrl = "http://localhost:3090";
export function getTabelTransfer(data) {
  return request({
    url: "api/getTabelTransfer",
    method: "post",
    data,
  });
}