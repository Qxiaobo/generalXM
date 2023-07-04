import Mock from "mockjs";

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
        total:a.size,
        size:a.size,
        current:a.current,
        [`records|${a.size}`]: [
          {
            // "id|+1": 1,
            // mock单位名称怎么写？
            sheng:'江苏',
            "gender|1": ["男", "女"],
            "age|18-60": 1,
            batchName: "@cname",
            areaCode: "@province()",
            unitCode: "@county(true)",     
            // email: "@email",
            // phone: /^1[34578]\d{9}$/,
            // avatar: '@image("200x200", "#50B347", "#FFF", "Mock.js")',
          },
        ],
      }
     
    }
  } 
export const data = Mock.mock(
    `http://localhost:3090/api/getTabelMerge`,
    "post",
    (options) => {
      let option = JSON.parse(options.body);
      return Mock.mock(template(option));
    }
  );