// import apiCache from "../../../dist/extends/apiCache/index";

import markdown from "./markdown";

// apiCache.setCacheConfig({ cache: 1, expire: 5000 });
Page({
  /**
   * 页面的初始数据
   */
  data: {
    markdown
  }

  // onClick() {
  //   apiCache
  //     .get('https://cnodejs.org/api/v1/topics', {
  //       data: {
  //         page: 1,
  //         limit: 4
  //       }
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // },
});
