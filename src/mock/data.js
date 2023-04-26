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
// let baseURL = "http://localhost:8080";
let template = (option) => {
  let a = {...option}
  if (option == null) {
    a.size = 10;
    a.current = 1;
  }
  // let size =  a.size ? a.size : '10'
  // let current = a.current ?a.current : '1'
 return  {
    code: '000000',
    mesg: "success",
    data:{
      total:100,
      size:a.size,
      current:a.current,
      [`records|${a.size}`]: [
        {
          "id|+1": 1,
          // mock单位名称怎么写？
          batchName: "@cname",
          areaCode: "@province()",
          unitCode: "@county(true)",
          validTime: `@date()~@date()`,
          buyTime: `@date()~@date()`,
          subsidyEstimate: "@integer(100, 1000)",
          month1: "@integer(100, 1000)",
          month2: "@integer(100, 1000)",
          month3: "@integer(100, 1000)",
          month4: "@integer(100, 1000)",
          month5: "@integer(100, 1000)",
          month6: "@integer(100, 1000)",
          month7: "@integer(100, 1000)",
          month8: "@integer(100, 1000)",
          // "age|18-60": 1,
          // "gender|1": ["男", "女"],
          // email: "@email",
          // phone: /^1[34578]\d{9}$/,
          // avatar: '@image("200x200", "#50B347", "#FFF", "Mock.js")',
        },
      ],
    }
   
  }
} 

export const data = Mock.mock(`http://localhost:8080/buildManage/page`, "post",(options) =>{
  let option = JSON.parse(options.body)
  // console.log(JSON.parse(options.body))
return Mock.mock(template(option))
});



