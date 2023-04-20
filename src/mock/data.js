// data.js

// const Mock = require('mockjs')
import Mock from "mockjs";

// 模拟数据
// Mock.mock('/api/data', {
//   'list|1-10': [{
//     'id|+1': 1,
//     'name': '@cname',
//     'age|20-30': 25
//   }]
// })

export const data = Mock.mock("api/data", "post", {
  code: 200,
  message: "success",
  "list|1-10": [
    {
      "id|+1": 1,
      name: "@cname",
      "age|18-60": 1,
      "gender|1": ["男", "女"],
      email: "@email",
      phone: /^1[34578]\d{9}$/,
      address: "@county(true)",
      avatar: '@image("200x200", "#50B347", "#FFF", "Mock.js")',
    },
  ],
});


