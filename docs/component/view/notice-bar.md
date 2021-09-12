---
pageClass: component-page-class
---

# NoticeBar 通告栏

---

<demo-image src='/componentImage/view/notice-bar.png' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
  "lin-notice-bar": "/dist/NoticeBar/index"
}
```

## 基础用法

通过`left-icon`属性设置左侧图标，`text`属性设置公告文本

::: details 代码示例

```html
<lin-notice-bar
  left-icon="search"
  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
/>
```

:::

## 滚动播放

通知栏的内容长度溢出时会自动开启滚动播放，通过 `scrollable` 属性可以控制该行为。

::: details 代码示例

```html
<!-- 文字较短时，通过设置 scrollable 属性开启滚动播放 -->
<lin-notice-bar speed="20" scrollable text="技术是开发它的人的共同灵魂。" />
<view style="height:40rpx;"></view>
<!-- 文字较长时，通过禁用 scrollable 属性关闭滚动播放 -->
<lin-notice-bar
  scrollable="{ { false }}"
  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
/>
```

:::

## 多行展示

文字较长时，可以通过设置 `wrapable` 属性来开启多行展示。

::: details 代码示例

```html
<lin-notice-bar
  wrapable
  scrollable="{ { false }}"
  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
/>
```

:::

## 通知栏模式

通知栏支持 `closeable` 和 `link` 两种模式。

::: details 代码示例

```html
<!-- closeable 模式，在右侧显示关闭按钮 -->
<lin-notice-bar
  scrollable="{ { false }}"
  mode="closeable"
  text="技术是开发它的人的共同灵魂。"
/>
<view style="height:40rpx;"></view>
<!-- link 模式，在右侧显示链接箭头 -->
<lin-notice-bar
  scrollable="{ { false }}"
  mode="link"
  text="技术是开发它的人的共同灵魂。"
/>
```

:::

## 自定义样式

通过 `color` 属性设置文本颜色，通过 `background` 属性设置背景色。

::: details 代码示例

```html
<lin-notice-bar
  color="rgb(25, 137, 250)"
  background="rgb(236, 249, 255)"
  text="技术是开发它的人的共同灵魂。"
  speed="20"
  left-icon="success"
/>
```

:::

## 属性

| 参数       | 说明                                                                                                                    | 类型    | 可选值              | 默认值   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- | ------- | ------------------- | -------- |
| mode       | 通告栏模式                                                                                                              | String  | `closeable`, `link` | —        |
| text       | 通知文本内容                                                                                                            | String  | —                   | —        |
| color      | 通知文本颜色                                                                                                            | String  | —                   | —        |
| background | 滚动条背景                                                                                                              | String  | —                   | —        |
| leftIcon   | 左侧图标名称                                                                                                            | String  | —                   | —        |
| delay      | 动画延迟时间 (s)                                                                                                        | Number  | —                   | 0        |
| speed      | 滚动速率 (px/s)                                                                                                         | Number  | —                   | 50       |
| scrollable | 是否开启滚动播放，内容长度溢出时默认开启                                                                                | Boolean | —                   | true     |
| wrapable   | 是否开启文本换行，只在禁用滚动时生效                                                                                    | Boolean | —                   | false    |
| openType   | 跳转方式，参考[navigator](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)，`mode=link`时有效 | String  | —                   | navigate |
| url        | 跳转地址,`mode=link`时有效                                                                                              | String  | —                   | —        |

## 事件

| 事件名     | 说明             | 参数  |
| ---------- | ---------------- | ----- |
| bind:click | 点击通知栏时触发 | event |
| bind:close | 关闭通知栏时触发 | event |

## 外部样式类

| 类名         | 说明                 |
| ---------------- | -------------------- |
| custom-class     | 根节点样式类         |
| left-icon-class  | 左侧图标样式类       |
| wrapper-class    | 容器样式类           |
| content-class    | 文本内容样式类       |
| close-icon-class | 关闭按钮样式类       |
| navigator-class  | navigator 组件样式类 |
