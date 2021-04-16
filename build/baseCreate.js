/* eslint no-console: "off" */

const fs = require('fs');

const path = require('path');

const template = require('./template.js');

const argv = process.argv;

const componentName = argv[2];

const componentNameLine = componentName
  .replace(/([A-Z])/g, '-$1')
  .toLowerCase()
  .substring(1);

const packagesPath = path.resolve(__dirname, '../packages');

const examplePath = path.resolve(__dirname, '../examples');

const compJsTemplate = template.compJsTemplate();

const compJsonTemplate = template.compJsonTemplate();

const compScssTemplate = template.compScssTemplate(componentNameLine);

const compWxmlTemplate = template.compWxmlTemplate(componentNameLine);

const pageJsTemplate = template.pageJsTemplate();

const pageJsonTemplate = template.pageJsonTemplate(componentName);

const pageWxmlTemplate = template.pageWxmlTemplate();

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
    const wxml = path.resolve(pathSrc, './index.wxml');
    const json = path.resolve(pathSrc, './index.json');
    const js = path.resolve(pathSrc, './index.js');
    const scss = path.resolve(pathSrc, './index.scss');
    fs.writeFileSync(wxml, compWxmlTemplate);
    fs.writeFileSync(json, compJsonTemplate);
    fs.writeFileSync(js, compJsTemplate);
    fs.writeFileSync(scss, compScssTemplate);
    return true;
  } catch (error) {
    console.log('创建文件失败');
    return false;
  }
}
function createExampleFile(pathSrc) {
  try {
    const wxml = path.resolve(pathSrc, './index.wxml');
    const json = path.resolve(pathSrc, './index.json');
    const js = path.resolve(pathSrc, './index.js');
    const wxss = path.resolve(pathSrc, './index.wxss');
    fs.writeFileSync(wxml, pageWxmlTemplate);
    fs.writeFileSync(json, pageJsonTemplate);
    fs.writeFileSync(js, pageJsTemplate);
    fs.writeFileSync(wxss, '');
    return true;
  } catch (error) {
    console.log('创建文件失败');
    return false;
  }
}

module.exports = {
  packagesPath,
  examplePath,
  createDir,
  createPackagesFile,
  createExampleFile,
  componentName,
  componentNameLine
};
