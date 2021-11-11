---
pageClass: component-page-class
---

# Area 省市区选择

---

<demo-image src='/componentImage/business/area.png' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start.html)

```json
"usingComponents": {
   "lin-area": "/dist/area/index"
}
```

## 基础用法

要初始化一个`Area`组件，你需要传入一个`area-list`属性，数据格式具体可看下面数据格式章节

::: details 代码示例

```html
<lin-area loading="{ {loading}}" area-list="{ { areaList }}" title="标题" />
```

```javascript
import { areaJsonPath } from "/dist/common/config";
import Request from "/dist/common/request";
Page({
  data: {
    areaList: {},
    loading: false,
  },
  getAreaList() {
    this.setData({ loading: true });
    Request.get({ url: areaJsonPath })
      .then((res) => {
        this.setData({
          areaList: res,
          loading: false,
        });
      })
      .catch((err) => {
        wx.showToast({
          title: "请求失败",
          icon: "none",
        });
        this.setData({ loading: false });
      });
  },
  onLoad: function(options) {
    this.getAreaList();
  },
});
```

:::

## 选中省市区

如果想选中某个省市区，需要传入一个`value`属性，绑定对应的省市区`code`

::: details 代码示例

```html
<lin-area
  loading="{ {loading}}"
  area-list="{ { areaList }}"
  title="标题"
  value="440106"
/>
```

```javascript
import { areaJsonPath } from "/dist/common/config";
import Request from "/dist/common/request";
Page({
  data: {
    areaList: {},
    loading: false,
  },
  getAreaList() {
    this.setData({ loading: true });
    Request.get({ url: areaJsonPath })
      .then((res) => {
        this.setData({
          areaList: res,
          loading: false,
        });
      })
      .catch((err) => {
        wx.showToast({
          title: "请求失败",
          icon: "none",
        });
        this.setData({ loading: false });
      });
  },
  onLoad: function(options) {
    this.getAreaList();
  },
});
```

:::

## 配置显示列

可以通过`columns-num`属性配置省市区显示的列数，默认情况下会显示省市区，当你设置为 2，则只会显示省市选择

::: details 代码示例

```html
<lin-area
  loading="{ {loading}}"
  area-list="{ { areaList }}"
  title="标题"
  columns-num="{ { 2 }}"
/>
```

```javascript
import { areaJsonPath } from "/dist/common/config";
import Request from "/dist/common/request";
Page({
  data: {
    areaList: {},
    loading: false,
  },
  getAreaList() {
    this.setData({ loading: true });
    Request.get({ url: areaJsonPath })
      .then((res) => {
        this.setData({
          areaList: res,
          loading: false,
        });
      })
      .catch((err) => {
        wx.showToast({
          title: "请求失败",
          icon: "none",
        });
        this.setData({ loading: false });
      });
  },
  onLoad: function(options) {
    this.getAreaList();
  },
});
```

:::

## 配置列占位提示文字

可以通过`columns-placeholder`属性配置每一列的占位提示文字

::: details 代码示例

```html
<lin-area
  loading="{ {loading}}"
  area-list="{ { areaList }}"
  title="标题"
  columns-placeholder="{ { ['请选择', '请选择', '请选择'] }}"
/>
```

```javascript
import { areaJsonPath } from "/dist/common/config";
import Request from "/dist/common/request";
Page({
  data: {
    areaList: {},
    loading: false,
  },
  getAreaList() {
    this.setData({ loading: true });
    Request.get({ url: areaJsonPath })
      .then((res) => {
        this.setData({
          areaList: res,
          loading: false,
        });
      })
      .catch((err) => {
        wx.showToast({
          title: "请求失败",
          icon: "none",
        });
        this.setData({ loading: false });
      });
  },
  onLoad: function(options) {
    this.getAreaList();
  },
});
```

:::

## 属性

| 参数               | 说明                                   | 类型    | 可选值 | 默认值 |
| ------------------ | -------------------------------------- | ------- | ------ | ------ |
| areaList           | 省市区数据，格式见下方                 | Object  | —      | —      |
| value              | 当前选中的省市区 code                  | String  | —      | —      |
| title              | 顶部栏标题                             | String  | —      | —      |
| columnsNum         | 省市区显示列数，3-省市区，2-省市，1-省 | Number  | —      | 3      |
| columnsPlaceholder | 列占位提示文字                         | Array   | —      | —      |
| loading            | 是否显示加载状态                       | Boolean | —      | false  |
| itemHeight         | 选项高度                               | Number  | —      | 44     |
| visibleItemCount   | 可见的选项个数                         | Number  | —      | 6      |
| confirmButtonText  | 确认按钮文字                           | String  | —      | 确定   |
| cancelButtonText   | 取消按钮文字                           | String  | —      | 取消   |

## 事件

| 事件名       | 说明           | 参数                                        |
| ------------ | -------------- | ------------------------------------------- |
| bind:confirm | 点击确定按钮   | 一个数组参数                                |
| bind:cancel  | 点击取消按钮   | —                                           |
| bind:change  | 选项改变时触发 | Picker 实例，所有列选中值，当前列对应的索引 |

## 省市区列表数据格式

整体是一个 Object，包含 `province_list`, `city_list`, `county_list` 三个 key。

每项以省市区编码作为 key，省市区名字作为 value。编码为 6 位数字，前两位代表省份，中间两位代表城市，后两位代表区县，以 0 补足 6 位。如北京编码为 `11`，以零补足 6 位，为 `110000`。

`AreaList`具体格式如下：

::: details 代码示例

```javascript
{
  province_list: {
    110000: '北京市',
    120000: '天津市'
  },
  city_list: {
    110100: '北京市',
    110200: '县',
    120100: '天津市',
    120200: '县'
  },
  county_list: {
    110101: '东城区',
    110102: '西城区',
    110105: '朝阳区',
    110106: '丰台区'
    120101: '和平区',
    120102: '河东区',
    120103: '河西区',
    120104: '南开区',
    120105: '河北区',
    // ....
  }
}
```

:::
完整数据见 [area.js](https://github.com/c10342/lin-wx-ui/blob/master/docs/public/static/json/area.json)

## 点击完成时返回的数据格式

返回的数据整体为一个 Object，包含 values, indexs 两个 key

values 整体为一个数组，数组内包含 columnsNum 个数据， 每个数据对应一列选项中被选中的数据。

code 代表被选中的地区编码， name 代表被选中的地区名称

::: details 代码示例

```javascript
[
  {
    code: "110000",
    name: "北京市",
  },
  {
    code: "110100",
    name: "北京市",
  },
  {
    code: "110101",
    name: "东城区",
  },
];
```

:::

`indexs` 为一个数组，数组内包含 `columnsNum` 个数据， 每个数据对应一列选项中被选中项的序号。
