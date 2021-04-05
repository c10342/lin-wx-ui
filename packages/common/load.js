#!/usr/bin/env node

const fs = require('fs');

const path = require('path');

const root = process.cwd();

// lin-wx-ui配置文件
const config = require(path.join(root, './lin-wx-ui.config.json'));

// 项目配置文件
const projectConfigSrc = path.join(root, './project.config.json');

// 组件库路径
const lib = path.join(root, config.lib);

const appJson = require(path.join(root, './app.json'));

// 获取注册的页面
const pages = appJson.pages || [];

// 获取全局注册的页面
const globalComponents = appJson.usingComponents || {};

// 记录被使用到的lin-wx-ui组件
const components = {};

// 记录已经扫描过的组件，防止循环引用
const scaleComponent = [];

// 处理全局注册的组件
function handleGlobalComponent() {
  Object.keys(globalComponents).forEach((key) => {
    // // 获取全局组件的完整路径
    const compSrc = path.join(root, globalComponents[key]);
    if (scaleComponent.findIndex((item) => item === compSrc) === -1) {
      // 判断该组件是否属于lin-wx-ui的
      if (compSrc.startsWith(lib)) {
        // 以key-value的形式存储
        const objKey = compSrc.replace(lib, '');
        if (!(objKey in components)) {
          // 记录相对路径
          components[objKey] = path.relative(root, path.dirname(compSrc));
          handlePageComponent(root, globalComponents[key]);
        }
      } else {
        handlePageComponent(root, globalComponents[key]);
      }
      scaleComponent.push(compSrc);
    }
  });
}

/**
 *
 * @param {*} currentDirname 当前路径
 * @param {*} page 相对路径
 */
function handlePageComponent(currentDirname, page) {
  page = path.normalize(page);
  // 获取页面/组件的完整路径
  const pageSrc = path.join(currentDirname, page);
  // 获取页面/组件所在的目录
  const pageDirname = path.dirname(pageSrc);
  // 获取文件名
  const name = path.basename(pageSrc);
  // 获取目录下的json的文件路径
  const pageJsonSrc = path.join(pageDirname, `${name}.json`);
  // 判断json文件是否存在
  const status = fs.existsSync(pageJsonSrc);
  if (status) {
    // 获取json文件的内容
    const pageJsonStr = fs.readFileSync(pageJsonSrc, 'utf-8');
    // 获取json文件使用的组件
    const usingComponents = JSON.parse(pageJsonStr).usingComponents || {};
    Object.keys(usingComponents).forEach((key) => {
      const compVal = usingComponents[key];
      // 判断是否为绝对路径
      const isAbsolute = path.isAbsolute(compVal);
      let compSrc = '';
      if (isAbsolute) {
        compSrc = path.join(currentDirname, compVal);
      } else {
        compSrc = path.join(pageDirname, compVal);
      }
      if (scaleComponent.findIndex((item) => item === compSrc) === -1) {
        if (compSrc.startsWith(lib)) {
          // 判断该组件是否属于lin-wx-ui的
          const objKey = compSrc.replace(lib, '');
          if (!(objKey in components)) {
            // 组件还没收集
            components[objKey] = path.relative(root, path.dirname(compSrc));
            handlePageComponent(path.dirname(compSrc), `..${objKey}`);
          }
        } else {
          handlePageComponent(path.dirname(compSrc), compSrc);
        }
        scaleComponent.push(compSrc);
      }
    });
  }
}

handleGlobalComponent();

pages.forEach((page) => {
  handlePageComponent(root, page);
});

// 求交集，就是找出那些是没有使用的组件
const ignoreArr = [];

const dirs = fs.readdirSync(lib);

const componentsKeys = Object.keys(components);

const ignoreComponent = [];

const reg = /^[A-Z]/;
dirs.forEach((dir) => {
  const index = componentsKeys.findIndex((key) => key.includes(dir));
  if (index === -1 && reg.test(dir)) {
    // 没有使用到的组件
    const ps = path.relative(root, path.join(lib, dir));
    ignoreComponent.push(ps);
  }
});

ignoreComponent.forEach((key) => {
  ignoreArr.push({
    type: 'folder',
    value: key.replace(/\\/g, '/'),
  });
});

const projectConfig = JSON.parse(fs.readFileSync(projectConfigSrc)) || {};

const relativeLib = path.relative(root, lib);

if (!projectConfig.packOptions) {
  projectConfig.packOptions = {};
}

let ignore = projectConfig.packOptions.ignore || [];

// 先过滤掉上次写入进去的
ignore = ignore.filter((src) => {
  const value = path.normalize(src.value);
  return !value.startsWith(relativeLib);
});

ignore.push(...ignoreArr);

if (ignore.findIndex((item) => item.value === 'lin-wx-ui.config.json') === -1) {
  ignore.push({
    type: 'file',
    value: 'lin-wx-ui.config.json',
  });
}

projectConfig.packOptions.ignore = ignore;

fs.writeFileSync(projectConfigSrc, JSON.stringify(projectConfig, null, 2));

/* eslint-disable-next-line */
console.log('执行完毕');
