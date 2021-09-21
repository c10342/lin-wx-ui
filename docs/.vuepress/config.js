const path = require("path");
const fs = require("fs");

function getPath(basePath, arr) {
  return arr.map((item) => {
    return `${basePath}/${item}`;
  });
}

module.exports = {
  title: "lin-wx-ui",
  description: "微信小程序组件库文档",
  plugins: {
    "@vuepress/back-to-top": true,
    "@vuepress/pwa": {
      serviceWorker: true,
      updatePopup: {
        "/": {
          message: "发现新内容可用",
          buttonText: "刷新"
        }
      }
    }
  },
  head: [["link", { rel: "icon", href: `/images/wxlogo.png` }]],
  themeConfig: {
    repo: "c10342/lin-wx-ui",
    editLinks: true,
    docsDir: "docs",
    editLinkText: "帮助我们改善此页面！",
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/guide" },
      {
        text: "组件",
        link: "/component/basic/button"
      },
      {
        text: "扩展",
        link: "/extends/request"
      },
      {
        text: "其他",
        items: [
          { text: "vue2组件库", link: "http://ui.linjiafu.top/" },
          { text: "视频播放器", link: "http://player.linjiafu.top/" }
        ]
      }
    ],
    sidebarDepth: 0,
    sidebar: {
      "/guide/": [
        {
          title: "指南",
          collapsable: false,
          children: ["guide", "install", "load", "start", "explain", "logs"]
        }
      ],
      "/component/": [
        {
          title: "基础组件",
          collapsable: false,
          children: getPath("basic", [
            "button",
            "icon",
            "image",
            "loading",
            "layout",
            "cell",
            "transition",
            "popup"
          ])
        },
        {
          title: "表单组件",
          collapsable: false,
          children: getPath("form", [
            "calendar",
            "checkbox",
            "field",
            "radio",
            "rate",
            "search",
            "slider",
            "stepper",
            "switch",
            "picker",
            "uploader",
            "form"
          ])
        },
        {
          title: "反馈组件",
          collapsable: false,
          children: getPath("feedback", [
            "mask",
            "action-sheet",
            "dialog",
            "dropdown-menu",
            "notify",
            "share-sheet",
            "toast",
            "swipe-cell"
          ])
        },
        {
          title: "展示组件",
          collapsable: false,
          children: getPath("view", [
            "collapse",
            "count-down",
            "divider",
            "empty",
            "notice-bar",
            "panel",
            "progress",
            "skeleton",
            "steps",
            "sticky",
            "tag",
            "tree-select",
            "water-flow",
            "password-keyboard",
            "float-button"
          ])
        },
        {
          title: "导航组件",
          collapsable: false,
          children: getPath("navigation", [
            "grid",
            "index-bar",
            "sidebar",
            "nav-bar",
            "tab",
            "tabbar",
            "backtop"
          ])
        },
        {
          title: "业务组件",
          collapsable: false,
          children: getPath("business", [
            "area",
            "card",
            "submit-bar",
            "goods-action"
          ])
        }
      ],
      "/extends/": [
        {
          title: "扩展",
          collapsable: false,
          children: ["request", "storage", "api-cache"]
        }
      ]
    }
  }
};
