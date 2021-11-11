---
pageClass: component-page-class
---

# Grid 宫格

---

<demo-image src='/componentImage/navigation/grid.png' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start.html)

```json
"usingComponents": {
  "lin-grid": "/dist/grid/index",
  "lin-grid-item": "/dist/grid-item/index"
}
```

## 基础用法

通过`icon`属性设置格子内的图标，`text`属性设置文字内容

::: details 代码示例

```html
<lin-grid>
  <lin-grid-item icon="pic" text="文字" />
  <lin-grid-item icon="pic" text="文字" />
  <lin-grid-item icon="pic" text="文字" />
  <lin-grid-item icon="pic" text="文字" />
</lin-grid>
```

:::

## 自定义列数

默认一行展示四个格子，可以通过`column-num`自定义列数

::: details 代码示例

```html
<lin-grid column-num="3">
  <lin-grid-item icon="pic" text="文字" wx:for="{ { 6 }}" wx:key="index" />
</lin-grid>
```

:::

## 自定义内容

通过插槽可以自定义格子展示的内容

::: details 代码示例

```html
<lin-grid column-num="3" border="{ { false }}">
  <lin-grid-item useSlot wx:for="{ { 3 }}" wx:key="index">
    <view>我是自定义内容---{ {index}}</view>
  </lin-grid-item>
</lin-grid>
```

:::

## 正方形格子

设置`square`属性后，格子的高度会和宽度保持一致

::: details 代码示例

```html
<lin-grid square>
  <lin-grid-item wx:key="index" icon="pic" text="文字" wx:for="{ { 8 }}" />
</lin-grid>
```

:::

## 格子间距

通过`gutter`属性设置格子之间的距离

::: details 代码示例

```html
<lin-grid gutter="{ { 10 }}">
  <lin-grid-item wx:key="index" icon="pic" text="文字" wx:for="{ { 8 }}" />
</lin-grid>
```

:::

## 内容横排

将`direction`属性设置为`horizontal`，可以让宫格的内容呈横向排列

::: details 代码示例

```html
<lin-grid direction="horizontal" column-num="3">
  <lin-grid-item icon="pic" text="文字" />
  <lin-grid-item icon="pic" text="文字" />
  <lin-grid-item icon="pic" text="文字" />
</lin-grid>
```

:::

## 页面跳转

可以通过`url`属性进行页面跳转，通过`link-type`属性控制跳转类型

::: details 代码示例

```html
<lin-grid clickable column-num="2">
  <lin-grid-item
    icon="pic"
    link-type="navigateTo"
    url="/pages/navigator/index/index"
    text="Navigate 跳转"
  />
  <lin-grid-item
    icon="search"
    link-type="reLaunch"
    url="/pages/navigator/index/index"
    text="ReLaunch 跳转"
  />
</lin-grid>
```

:::

## 提示信息

设置`dot`属性后，会在图标右上角展示一个小红点。设置`badge`属性后，会在图标右上角展示相应的徽标

::: details 代码示例

```html
<lin-grid column-num="2">
  <lin-grid-item icon="pic" text="文字" dot />
  <lin-grid-item icon="search" text="文字" badge="99+" />
</lin-grid>
```

:::

## Grid 属性

| 参数      | 说明                          | 类型           | 可选值                   | 默认值   |
| --------- | ----------------------------- | -------------- | ------------------------ | -------- |
| columnNum | 列数                          | Number         | —                        | 4        |
| iconSize  | 图标大小，默认单位为 px       | String, Number | —                        | 56rpx    |
| gutter    | 格子之间的间距，默认单位为 px | String, Number | —                        | 0        |
| border    | 是否显示边框                  | Boolean        | —                        | true     |
| center    | 是否将格子内容居中显示        | Boolean        | —                        | true     |
| square    | 是否将格子固定为正方形        | Boolean        | —                        | false    |
| direction | 格子内容排列的方向            | String         | `vertical`, `horizontal` | vertical |

## Grid 外部样式类

| 类名         | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |

## GridItem 属性

| 参数      | 说明                     | 类型    | 可选值                                              | 默认值     |
| --------- | ------------------------ | ------- | --------------------------------------------------- | ---------- |
| text      | 文字                     | String  | —                                                   | —          |
| icon      | 图标名称                 | String  | —                                                   | —          |
| iconColor | 图标颜色                 | String  | —                                                   | —          |
| dot       | 是否显示图标右上角小红点 | Boolean | —                                                   | false      |
| badge     | 图标右上角徽标的内容     | String  | —                                                   | —          |
| url       | 点击后跳转的链接地址     | String  | —                                                   | —          |
| useSlot   | 是否使用默认插槽         | Boolean | —                                                   | false      |
| linkType  | 链接跳转类型             | String  | `navigateTo`, `redirectTo`, `switchTab`, `reLaunch` | navigateTo |

## GridItem 事件

| 事件名     | 说明           | 参数 |
| ---------- | -------------- | ---- |
| bind:click | 点击格子时触发 | —    |

## GridItem 插槽

| 插槽名称 | 说明                                                   |
| -------- | ------------------------------------------------------ |
| —        | 自定义宫格的所有内容，需要设置`use-slot`属性           |
| icon     | 自定义图标，如果设置了`use-slot`或者`icon`属性则不生效 |
| text     | 自定义文字，如果设置了`use-slot`或者`text`属性则不生效 |

## GridItem 外部样式类

| 类名          | 说明         |
| ------------- | ------------ |
| custom-class  | 根节点样式类 |
| content-class | 内容样式类   |
| icon-class    | 图标样式类   |
| text-class    | 文本样式类   |
