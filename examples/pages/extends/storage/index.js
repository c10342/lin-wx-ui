// import storage from '../../../dist/extends/storage/index.js';

import markdown from "./markdown";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    markdown
  }

  // onSet() {
  //   for (let i = 0; i < 100; i++) {
  //     storage.set(`test-${i}`, i);
  //   }
  // },

  // onGet() {
  //   console.log(storage.get('test'));
  // },

  // onHas() {
  //   console.log(storage.has('demo'));
  // },

  // onKeys() {
  //   console.log(storage.keys());
  // },

  // onValues() {
  //   console.log(storage.values());
  // },

  // onForEach() {
  //   storage.forEach((key, value, index) => {
  //     console.log(key, value, index);
  //   });
  // },

  // onLength() {
  //   console.log(storage.length);
  // },

  // onRemove() {
  //   storage.remove('test');
  // },

  // onClear() {
  //   storage.clear();
  // },

  // onInfo() {
  //   console.log(wx.getStorageInfoSync());
  // },
});
