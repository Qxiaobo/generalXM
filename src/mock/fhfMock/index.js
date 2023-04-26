import Mock from "mockjs";

let template = (option) => {
  return {
    code: "000000",
    mesg: "success",
    data: {
        // "records | 10"";[{name:"名称")]数组的内容重复10遍
      [`left|10`]: [
        {
          "id|+1": 1,
          // mock单位名称怎么写？
          name: "@cname",//表示中文名称
        //areaCode: "@province()",
          code: "@integer(10000, 100000)",
        //   address: "@county(true)",//地址
          type:'@cname',
        //   buyTime: `@date()~@date()`,
          power: "@integer(100, 1000)",
        },
      ],
      [`right|3`]: [
        {
          "id|+1": 1,
          // mock单位名称怎么写？
          name: "@cname",//表示中文名称
        //areaCode: "@province()",
          code: "@integer(10000, 100000)",
        //   address: "@county(true)",//地址
          type:'@cname',
        //   buyTime: `@date()~@date()`,
          power: "@integer(100, 1000)",
        },
      ],
    },
  };
};

export const data = Mock.mock(
  `http://localhost:3090/api/getTabelTransfer`,
  "post",
  (options) => {
    let option = JSON.parse(options.body);
    return Mock.mock(template(option));
  }
);
