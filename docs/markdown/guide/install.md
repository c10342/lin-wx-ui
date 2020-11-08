# 安装

---

## 使用 npm 安装

- 步骤一 通过 npm 安装
需要注意的是 package.json 和 node_modules 必须在 miniprogram 目录下

\# 通过 npm 安装
```bash
npm i lin-wx-ui -S --production
```

\# 通过 yarn 安装
```bash
yarn add lin-wx-ui --production
```

- 步骤二 构建 npm 包
打开微信开发者工具，点击 工具 -> 构建 npm，并勾选 使用 npm 模块 选项，构建完成后，即可引入组件
![npm构建](../../assets/img/usenpm.png)

- 步骤三 修改 app.json
将 app.json 中的 `"style": "v2"` 去除，小程序的新版基础组件强行加上了许多样式，难以去除，不关闭将造成部分组件样式混乱。



## 克隆项目

- 步骤一 将项目克隆到本地
```bash
git clone https://github.com/c10342/lin-wx-ui.git
```

- 步骤二 安装项目依赖
```bash
cd lin-wx-ui && npm install
```

- 步骤三 执行组件编译
```bash
npm run build
```

- 步骤四 拷贝项目下dist目录到小程序项目中即可使用
