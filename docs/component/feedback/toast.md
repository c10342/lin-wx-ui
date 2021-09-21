---
pageClass: component-page-class
---

# Toast 轻提示

---

<demo-image src='/componentImage/feedback/toast.gif' />


## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
  "lin-toast": "/dist/toast/index"
}
```

## 基础用法

::: details 代码示例

```html
<lin-cell-group>
  <lin-cell title="文字提示" is-link bind:click="onClick1" />
  <lin-cell title="加载提示" is-link bind:click="onClick2" />
  <lin-cell title="成功提示" is-link bind:click="onClick3" />
  <lin-cell
    title="失败提示"
    is-link
    bind:click="onClick4"
    border="{ { false }}"
  />
</lin-cell-group>

<lin-toast id="lin-toast" />
```

```javascript
import Toast from "/dist/Toast/toast";
Page({
  onClick1() {
    Toast("提示内容");
  },

  onClick2() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
  },

  onClick3() {
    Toast.success("成功文案");
  },

  onClick4() {
    Toast.fail("失败文案");
  },
});
```

:::

## 动态更新提示

::: details 代码示例

```html
<lin-cell-group>
  <lin-cell
    title="动态更新提示"
    is-link
    bind:click="onClick5"
    border="{ { false }}"
  />
</lin-cell-group>

<lin-toast id="lin-toast" />
```

```javascript
import Toast from "/dist/Toast/toast";
Page({
  onClick5() {
    const toast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "倒计时 3 秒",
    });

    let second = 3;
    const timer = setInterval(() => {
      second--;
      if (second) {
        toast.setData({
          message: `倒计时 ${second} 秒`,
        });
      } else {
        clearInterval(timer);
        Toast.clear();
      }
    }, 1000);
  },
});
```

:::

## 方法

| 方法名                    | 参数                   | 返回值     | 介绍                            |
| ------------------------- | ---------------------- | ---------- | ------------------------------- |
| Toast                     | options &#124; message | toast 实例 | 展示提示                        |
| Toast.loading             | options &#124; message | toast 实例 | 展示加载提示                    |
| Toast.success             | options &#124; message | toast 实例 | 展示成功提示                    |
| Toast.fail                | options &#124; message | toast 实例 | 展示失败提示                    |
| Toast.clear               | —                      | void       | 关闭提示                        |
| Toast.setDefaultOptions   | options                | void       | 修改默认配置，对所有 Toast 生效 |
| Toast.resetDefaultOptions | —                      | void       | 重置默认配置，对所有 Toast 生效 |

## Options

| 参数        | 说明                                                   | 类型     | 可选值                            | 默认值     |
| ----------- | ------------------------------------------------------ | -------- | --------------------------------- | ---------- |
| type        | 提示类型                                               | String   | `text`,`loading`,`success`,`fail` | text       |
| mask        | 是否显示遮罩层                                         | Boolean  | —                                 | false      |
| show        | 是否显示                                               | Boolean  | —                                 | true       |
| zIndex      | z-index 层级                                           | Number   | —                                 | 1000       |
| duration    | 展示时长(ms)，值为 0 时，toast 不会消失                | Number   | —                                 | 2000       |
| position    | 位置                                                   | String   | `top`, `bottom`, `middle`         | middle     |
| forbidClick | 是否禁止背景点击                                       | Boolean  | —                                 | false      |
| selector    | 自定义选择器                                           | String   | —                                 | #lin-toast |
| onClose     | 关闭时的回调函数                                       | Function | —                                 | —          |
| message     | 内容                                                   | String   | —                                 | —          |
| context     | 选择器的选择范围，可以传入自定义组件的 this 作为上下文 | Object   | —                                 | 当前页面   |

## 外部样式类

| 类名      | 说明                              |
| ------------- | --------------------------------- |
| custom-class  | 根节点样式类                      |
| icon-class    | 图标样式类                        |
| loading-class | 加载图标样式类                    |
| message-class | 消息样式类，type 为 text 时生效   |
| text-class    | 文本样式类，type 不为 text 时生效 |
