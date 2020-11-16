#!/usr/bin/env node

const fs = require("fs");

const path = require("path");

const appJson = require("../example/app.json");

const argv = process.argv;

const componentName = argv[2];

const componentNameLine = componentName
  .replace(/([A-Z])/g, "-$1")
  .toLowerCase()
  .substring(1);

const packagesPath = path.resolve(__dirname, "../packages");

const examplePath = path.resolve(__dirname, "../examples");

const compJsTemplate = `
Component({
    options: {
      addGlobalClass: true,
      multipleSlots: true,
    },
    externalClasses: ["custom-class"],
    properties: {},
    data: {},
    methods: {},
    created: function () {},
    attached: function () {},
    ready: function () {},
    moved: function () {},
    detached: function () {},
});
`;

const compJsonTemplate = `
{
    "component": true
}
`;

const compScssTemplate = `
.lin-${componentNameLine}{

}
`;

const compWxmlTemplate = `
<view class='custom-class lin-${componentNameLine}'>

</view>
`;

const pageJsTemplate = `
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
  
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    },
  })
`;

const pageJsonTemplate = `
{
    "usingComponents": {},
    "navigationBarTitleText": "${componentName}"
}
`;

const pageWxmlTemplate = `
<view class='container'>
	<demo-block title='基础用法'>
		
	</demo-block>
</view>
`;

function createDir(pathSrc) {
  try {
    fs.statSync(pathSrc);
    console.log(`${componentName} 文件夹已经存在`);
    return false;
  } catch (error) {
    fs.mkdirSync(pathSrc);
    return true;
  }
}

function createPackagesFile(pathSrc) {
  try {
    const wxml = path.resolve(pathSrc, "./index.wxml");
    const json = path.resolve(pathSrc, "./index.json");
    const js = path.resolve(pathSrc, "./index.js");
    const scss = path.resolve(pathSrc, "./index.scss");
    fs.writeFileSync(wxml, compWxmlTemplate);
    fs.writeFileSync(json, compJsonTemplate);
    fs.writeFileSync(js, compJsTemplate);
    fs.writeFileSync(scss, compScssTemplate);
    return true;
  } catch (error) {
    console.log("创建文件失败");
    return false;
  }
}
function createExampleFile(pathSrc) {
  try {
    const wxml = path.resolve(pathSrc, "./index.wxml");
    const json = path.resolve(pathSrc, "./index.json");
    const js = path.resolve(pathSrc, "./index.js");
    const wxss = path.resolve(pathSrc, "./index.wxss");
    fs.writeFileSync(wxml, pageWxmlTemplate);
    fs.writeFileSync(json, pageJsonTemplate);
    fs.writeFileSync(js, pageJsTemplate);
    fs.writeFileSync(wxss, "");
    return true;
  } catch (error) {
    console.log("创建文件失败");
    return false;
  }
}

function createPackageComponent() {
  const pathSrc = path.resolve(packagesPath, componentName);
  const result = createDir(pathSrc);
  if (result) {
    const flag = createPackagesFile(pathSrc);
    if (flag) {
      createExampleComponent();
    }
  }
}

function createExampleComponent() {
  const pathSrc = path.resolve(
    examplePath,
    "./pages/components",
    componentNameLine
  );
  const result = createDir(pathSrc);
  if (result) {
    const flag = createExampleFile(pathSrc);
    if (flag) {
      appJson.pages.push(`pages/component/${componentNameLine}/index`);
      appJson.usingComponents[
        `lin-${componentNameLine}`
      ] = `/dist/${componentName}/index`;
      fs.writeFileSync(
        path.resolve(examplePath, "./app.json"),
        JSON.stringify(appJson, null, 2)
      );
      console.log(`${componentName}组件创建成功`);
    }
  }
}

createPackageComponent();
