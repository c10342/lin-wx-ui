---
pageClass: component-page-class
---

# TreeSelect 分类选择

---

<demo-image src='/componentImage/view/tree-select.gif' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
  "lin-tree-select": "/dist/TreeSelect/index"
}
```

## 基础用法

可以在任意位置上使用 `lin-tree-select` 标签。传入对应的数据即可。此组件支持单选或多选，具体行为完全基于事件 `item-click` 的实现逻辑如何为属性 `active-id` 赋值，当 `active-id` 为数组时即为多选状态。

::: details 代码示例

```html
<lin-tree-select
  data-index="mainActiveIndex1"
  data-key="activeId1"
  bind:item-click="onClickItem1"
  bind:nav-click="onClickNav1"
  activeId="{ {activeId1}}"
  items="{ {items1}}"
  mainActiveIndex="{ {mainActiveIndex1}}"
/>
```

```javascript
Page({
  data: {
    items1: [
      {
        text: "浙江",
        children: [
          {
            text: "杭州",
            id: 1,
          },
          {
            text: "温州",
            id: 2,
          },
          {
            text: "宁波",
            id: 3,
            disabled: true,
          },
          {
            text: "义乌",
            id: 4,
          },
        ],
      },
      {
        text: "江苏",
        children: [
          {
            text: "南京",
            id: 5,
          },
          {
            text: "无锡",
            id: 6,
          },
          {
            text: "徐州",
            id: 7,
          },
          {
            text: "苏州",
            id: 8,
          },
        ],
      },
      {
        text: "福建",
        disabled: true,
        children: [
          {
            text: "泉州",
            id: 9,
          },
          {
            text: "厦门",
            id: 10,
          },
        ],
      },
    ],
    mainActiveIndex1: 0,
    activeId1: null,
  },
  onClickNav1({ detail = {}, currentTarget }) {
    const { index } = currentTarget.dataset;
    this.setData({
      [index]: detail.index || 0,
    });
  },

  onClickItem1({ detail = {}, currentTarget }) {
    const { key } = currentTarget.dataset;
    const activeId = this.data[key] === detail.id ? null : detail.id;
    this.setData({
      [key]: activeId,
    });
  },
});
```

:::

## 多选模式

::: details 代码示例

```html
<lin-tree-select
  max="{ {max}}"
  bind:item-click="onClickItem2"
  bind:nav-click="onClickNav2"
  activeId="{ {activeId2}}"
  items="{ {items1}}"
  mainActiveIndex="{ {mainActiveIndex2}}"
/>
```

```javascript
Page({
  data: {
    items1: [
      {
        text: "浙江",
        children: [
          {
            text: "杭州",
            id: 1,
          },
          {
            text: "温州",
            id: 2,
          },
          {
            text: "宁波",
            id: 3,
            disabled: true,
          },
          {
            text: "义乌",
            id: 4,
          },
        ],
      },
      {
        text: "江苏",
        children: [
          {
            text: "南京",
            id: 5,
          },
          {
            text: "无锡",
            id: 6,
          },
          {
            text: "徐州",
            id: 7,
          },
          {
            text: "苏州",
            id: 8,
          },
        ],
      },
      {
        text: "福建",
        disabled: true,
        children: [
          {
            text: "泉州",
            id: 9,
          },
          {
            text: "厦门",
            id: 10,
          },
        ],
      },
    ],
    mainActiveIndex2: 1,
    activeId2: [],
    max: 2,
  },
  onClickNav2({ detail = {} }) {
    this.setData({
      mainActiveIndex2: detail.index || 0,
    });
  },

  onClickItem2({ detail = {} }) {
    const { activeId2 } = this.data;

    const index = activeId2.indexOf(detail.id);
    if (index > -1) {
      activeId2.splice(index, 1);
    } else {
      activeId2.push(detail.id);
    }

    this.setData({
      activeId2,
    });
  },
});
```

:::

## 自定义内容

通过 `content`插槽自定义内容

::: details 代码示例

```html
<lin-tree-select
  data-index="mainActiveIndex3"
  data-key="activeId3"
  bind:item-click="onClickItem1"
  bind:nav-click="onClickNav1"
  activeId="{ {activeId3}}"
  items="{ {items3}}"
  mainActiveIndex="{ {mainActiveIndex3}}"
>
  <view slot="content">
    我是分组-{ {mainActiveIndex3 +1}}
  </view>
</lin-tree-select>
```

```javascript
Page({
  data: {
    mainActiveIndex3: 0,
    activeId3: null,
    items3: [
      {
        text: "分组1",
      },
      {
        text: "分组2",
      },
    ],
  },
  onClickNav1({ detail = {}, currentTarget }) {
    const { index } = currentTarget.dataset;
    this.setData({
      [index]: detail.index || 0,
    });
  },

  onClickItem1({ detail = {}, currentTarget }) {
    const { key } = currentTarget.dataset;
    const activeId = this.data[key] === detail.id ? null : detail.id;
    this.setData({
      [key]: activeId,
    });
  },
});
```

:::

## 徽标提示

通过 `items`属性每一项的`badge`字段设置徽标

::: details 代码示例

```html
<lin-tree-select
  data-index="mainActiveIndex4"
  data-key="activeId4"
  bind:item-click="onClickItem1"
  bind:nav-click="onClickNav1"
  activeId="{ {activeId4}}"
  items="{ {items4}}"
  mainActiveIndex="{ {mainActiveIndex4}}"
/>
```

```javascript
Page({
  data: {
    mainActiveIndex4: 0,
    activeId4: null,
    items4: [
      {
        text: "浙江",
        badge: 3,
        children: [
          {
            text: "杭州",
            id: 1,
          },
          {
            text: "温州",
            id: 2,
          },
          {
            text: "宁波",
            id: 3,
          },
          {
            text: "义乌",
            id: 4,
          },
        ],
      },
      {
        text: "江苏",
        dot: true,
        children: [
          {
            text: "南京",
            id: 5,
          },
          {
            text: "无锡",
            id: 6,
          },
          {
            text: "徐州",
            id: 7,
          },
          {
            text: "苏州",
            id: 8,
          },
        ],
      },
      {
        text: "福建",
        children: [
          {
            text: "泉州",
            id: 9,
          },
          {
            text: "厦门",
            id: 10,
          },
        ],
      },
    ],
  },
  onClickNav1({ detail = {}, currentTarget }) {
    const { index } = currentTarget.dataset;
    this.setData({
      [index]: detail.index || 0,
    });
  },

  onClickItem1({ detail = {}, currentTarget }) {
    const { key } = currentTarget.dataset;
    const activeId = this.data[key] === detail.id ? null : detail.id;
    this.setData({
      [key]: activeId,
    });
  },
});
```

:::

## 属性

| 参数            | 说明                       | 类型                  | 可选值 | 默认值   |
| --------------- | -------------------------- | --------------------- | ------ | -------- |
| items           | 分类显示所需的数据         | Array                 | —      | —        |
| mainActiveIndex | 左侧选中项的索引           | Number                | —      | 0        |
| navLabelKey     | 左侧显示文字的字段         | String                | —      | text     |
| contentLabelKey | 右侧显示文字的字段         | String                | —      | text     |
| contentValueKey | 右侧值的字段               | String                | —      | id       |
| activeId        | 右侧选中项的值             | String，Number，Array | —      | —        |
| max             | 右侧项最大选中个数         | Number                | —      | Infinity |
| selectedIcon    | 自定义右侧栏选中状态的图标 | String                | —      | —        |
| height          | 高度，默认单位为 px        | String, Number        | —      | —        |

## 事件

| 事件名          | 说明                             | 参数               |
| --------------- | -------------------------------- | ------------------ |
| bind:nav-click  | 左侧导航点击时，触发的事件       | 被点击的导航的索引 |
| bind:item-click | 右侧选择项被点击时，会触发的事件 | 该点击项的数据     |

## 插槽

| 插槽名称 | 说明                                             |
| -------- | ------------------------------------------------ |
| content  | 自定义右侧区域内容，如果存在 items，则插入在顶部 |

## items 数据结构

`items` 整体为一个数组，数组内包含一系列描述分类的对象

::: details 代码示例

```javascript
[
  {
    // 导航名称
    text: "所有城市",
    // 导航名称右上角徽标，1.5.0 版本开始支持
    badge: 3,
    // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
    dot: true,
    // 禁用选项
    disabled: false,
    // 该导航下所有的可选项
    children: [
      {
        // 名称
        text: "温州",
        // id，作为匹配选中状态的标识
        id: 1,
        // 禁用选项
        disabled: true,
      },
      {
        text: "杭州",
        id: 2,
      },
    ],
  },
];
```

:::

## 外部样式类

| 类名           | 说明           |
| ------------------ | -------------- |
| custom-class       | 根节点样式类   |
| nav-class          | 左侧容器样式类 |
| nav-item-class     | 左侧选项样式类 |
| content-class      | 右侧容器样式类 |
| content-item-class | 右侧选项样式类 |
