# Skeleton 骨架屏

---

 <div class="demo-outer-container">
     <div class="demo-inner-container">
        <div class="demo-content">
            <img class="demo-image" src='../../componentImage/skeleton.png' />
        </div>
     </div>
 </div>

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/#/start)

```json
"usingComponents": {
  "lin-skeleton": "/dist/Skeleton/index"
}
```

## 基础用法

通过`title`属性显示标题占位图，通过`row`属性配置占位段落行数

:::demo

```html
<lin-skeleton title row="3" />
```

:::

## 显示头像

通过`avatar`属性显示头像占位图

:::demo

```html
<lin-skeleton title avatar row="3" />
```

:::

## 展示子组件

将`loading`属性设置成`false`表示内容加载完成，此时会隐藏占位图，并显示`Skeleton`的子组件

:::demo

```html
<view class="lin-switch-item">
  <lin-switch checked="{ {loading}}" bind:change="onChange" />
</view>
<lin-skeleton title avatar row="3" loading="{ { !loading }}">
  <view>实际内容</view>
</lin-skeleton>
```

```javascript
Page({
  data: {
    loading: false,
  },
  onChange(event) {
    this.setData({ loading: event.detail });
  },
});
```

```css
.lin-switch-item {
  margin-bottom: 40rpx;
}
```

:::

## 属性

| 参数        | 说明                                        | 类型           | 可选值            | 默认值 |
| ----------- | ------------------------------------------- | -------------- | ----------------- | ------ |
| row         | 段落占位图行数                              | Number         | —                 | 0      |
| rowWidth    | 段落占位图宽度，可传数组来设置每一行的宽度  | String, Array  | —                 | —      |
| title       | 是否显示标题占位图                          | Boolean        | —                 | false  |
| titleWidth  | 标题占位图宽度                              | String, Number | —                 | —      |
| avatar      | 是否显示头像占位图                          | Boolean        | —                 | false  |
| avatarSize  | 头像占位图大小                              | String, Number | —                 | —      |
| avatarShape | 头像占位图形状                              | String         | `round`, `square` | round  |
| loading     | 是否显示占位图，传`false`时会展示子组件内容 | Boolean        | —                 | true   |
| animate     | 是否开启动画                                | Boolean        | —                 | true   |

## 外部样式类

| 插槽名称     | 说明           |
| ------------ | -------------- |
| custom-class | 根节点样式类   |
| avatar-class | 头像样式类     |
| title-class  | 标题样式类     |
| row-class    | 段落样式类     |
| slot-class   | 插槽容器样式类 |
