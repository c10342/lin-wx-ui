---
pageClass: component-page-class
---

# SwipeCell 滑动单元格

---

<demo-image src='/componentImage/feedback/swipe-cell.gif' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start.html)

```json
"usingComponents": {
  "lin-swipe-cell": "/dist/swipe-cell/index"
}
```

## 基础用法

::: details 代码示例

```html
<lin-swipe-cell showLeft showRight>
  <view slot="left" class="select-button common-button">选择</view>
  <lin-cell-group>
    <lin-cell title="单元格" value="内容" />
  </lin-cell-group>
  <view slot="right" class="del-button common-button">删除</view>
</lin-swipe-cell>
```

```css
.common-button {
  height: 76rpx;
  padding: 0 15px;
  font-size: 14px;
  line-height: 76rpx;
  text-align: center;
}

.select-button {
  color: #fff;
  background-color: #07c160;
  border: 1px solid #07c160;
}

.del-button {
  color: #fff;
  background-color: #ee0a24;
  border: 1px solid #ee0a24;
}
```

:::

## 异步关闭

当开启`async-close`时， 通过绑定`before-close`事件，可以自定义两侧滑动内容点击时的关闭行为

::: details 代码示例

```html
<lin-swipe-cell
  showLeft
  showRight
  async-close
  bind:before-close="onBeforeClose"
>
  <view slot="left" class="select-button common-button">选择</view>
  <lin-cell-group>
    <lin-cell title="单元格" value="内容" />
  </lin-cell-group>
  <view slot="right" class="del-button common-button">删除</view>
</lin-swipe-cell>

<lin-dialog id="lin-dialog" />
```

```javascript
import Dialog from "/dist/Dialog/dialog.js";
Page({
  onBeforeClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case "left":
      case "cell":
        instance.close();
        break;
      case "right":
        Dialog.confirm({
          message: "确定删除吗？",
        })
          .then(() => {
            instance.close();
          })
          .catch(() => {});
        break;
    }
  },
});
```

```css
.common-button {
  height: 76rpx;
  padding: 0 15px;
  font-size: 14px;
  line-height: 76rpx;
  text-align: center;
}

.select-button {
  color: #fff;
  background-color: #07c160;
  border: 1px solid #07c160;
}

.del-button {
  color: #fff;
  background-color: #ee0a24;
  border: 1px solid #ee0a24;
}
```

:::

## 主动打开和关闭

::: details 代码示例

```html
<view style="margin-bottom: 10px;">
  <lin-button bind:click="openLeft" style="margin-right: 10px;"
    >打开左侧</lin-button
  >
  <lin-button bind:click="openRight" style="margin-right: 10px;"
    >打开右侧</lin-button
  >
  <lin-button bind:click="close">关闭</lin-button>
</view>
<lin-swipe-cell
  name="示例"
  showLeft
  showRight
  id="swipe-cell"
  bind:open="onOpen"
  bind:close="onClose"
>
  <view slot="left" class="select-button common-button">选择</view>
  <lin-cell-group>
    <lin-cell title="单元格" value="内容" />
  </lin-cell-group>
  <view slot="right" class="del-button common-button">删除</view>
</lin-swipe-cell>

<lin-notify id="lin-notify" />
```

```javascript
import Notify from "/dist/Notify/notify";
Page({
  onOpen(event) {
    const { position, name } = event.detail;
    switch (position) {
      case "left":
        Notify({
          type: "primary",
          message: `${name}${position}部分展示open事件被触发`,
        });
        break;
      case "right":
        Notify({
          type: "primary",
          message: `${name}${position}部分展示open事件被触发`,
        });
        break;
    }
  },

  onClose(event) {
    const { position, name } = event.detail;

    Notify({
      type: "danger",
      message: `${name}${position}部分关闭close事件被触发`,
    });
  },

  openLeft() {
    const comp = this.selectComponent("#swipe-cell");
    comp.open("left");
  },
  openRight() {
    const comp = this.selectComponent("#swipe-cell");
    comp.open("right");
  },
  close() {
    const comp = this.selectComponent("#swipe-cell");
    comp.close();
  },
});
```

```css
.common-button {
  height: 76rpx;
  padding: 0 15px;
  font-size: 14px;
  line-height: 76rpx;
  text-align: center;
}

.select-button {
  color: #fff;
  background-color: #07c160;
  border: 1px solid #07c160;
}

.del-button {
  color: #fff;
  background-color: #ee0a24;
  border: 1px solid #ee0a24;
}
```

:::

## 属性

| 参数          | 说明             | 类型    | 可选值 | 默认值 |
| ------------- | ---------------- | ------- | ------ | ------ |
| showLeft      | 是否显示左侧     | Boolean | —      | false  |
| showRight     | 是否显示右侧     | Boolean | —      | false  |
| leftWidth     | 左侧滑动区域宽度 | Number  | —      | —      |
| rightWidth    | 右侧滑动区域宽度 | Number  | —      | —      |
| disabled      | 是否禁用滑动     | Boolean | —      | false  |
| disabledLeft  | 是否禁用左滑动   | Boolean | —      | false  |
| disabledRight | 是否禁用右滑动   | Boolean | —      | false  |
| asyncClose    | 是否异步关闭     | Boolean | —      | false  |
| name          | 标识符           | String  | —      | —      |

## 事件

| 事件名            | 说明                                         | 参数                                                                                        |
| ----------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| bind:click        | 点击时触发                                   | 关闭时的点击位置 (`left` `right` `cell` `outside`)                                          |
| bind:before-close | 关闭前触发，需要`asyncClose`为`true`才能触发 | { position: 'left' &#124; 'right' &#124; 'cell' &#124; 'outside', instance , name: string } |
| bind:close        | 关闭时触发                                   | { position: 'left' &#124; 'right' &#124; 'cell' &#124; 'outside', instance , name: string } |
| bind:open         | 打开时触发                                   | { position: 'left' &#124; 'right' &#124; 'cell' &#124; 'outside', instance , name: string } |

## 外部样式类

| 类名     | 说明         |
| ------------ | ------------ |
| custom-class | 根节点样式类 |
| left-class   | 左侧样式类   |
| right-class  | 右侧样式类   |

## 方法

通过 selectComponent 可以获取到 SwipeCell 实例并调用实例方法

| 方法名 | 参数                        | 返回值 | 介绍             |
| ------ | --------------------------- | ------ | ---------------- |
| open   | position: left &#124; right | —      | 打开单元格侧边栏 |
| close  | —                           | —      | 收起单元格侧边栏 |
