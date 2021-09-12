import list from "./logs.js";

import { logsType } from "../../../config/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: list,
    addComponent: logsType.ADDCOMPONENT
  }
});
