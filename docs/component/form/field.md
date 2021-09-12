---
pageClass: component-page-class
---

# Field 输入框

---

<demo-image src='/componentImage/form/input.png' />

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/guide/start)

```json
"usingComponents": {
  "lin-field": "/dist/Field/index"
}
```

## 基础用法

::: details 代码示例

```html
<lin-cell-group>
  <lin-field
    border="{ { false }}"
    label="文本"
    data-key="value1"
    value="{ { value1 }}"
    placeholder="请输入文本"
    bind:change="onChange"
  />
</lin-cell-group>
```

```javascript
Page({
  data: {
    value1: "",
  },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail,
    });
  },
});
```

:::

## 双向绑定

最低基础库版本在 2.9.3 以上时，可以使用[简易双向绑定](https://developers.weixin.qq.com/miniprogram/dev/framework/view/two-way-bindings.html)

::: details 代码示例

```html
<lin-cell-group>
  <lin-field
    titleWidth="0"
    model:value="{ { value2 }}"
    placeholder="请输入文本"
    border="{ { false }}"
  />
</lin-cell-group>
```

```javascript
Page({
  data: {
    value2: "",
  },
});
```

:::

## 自定义类型

根据`type`属性定义不同类型的输入框

::: details 代码示例

```html
<lin-cell-group>
  <lin-field label="文本" placeholder="请输入文本" />
  <lin-field type="number" label="整数" placeholder="请输入整数" />
  <lin-field type="idcard" label="身份证" placeholder="请输入身份证" />
  <lin-field type="digit" label="小数点" placeholder="请输入小数点" />
  <lin-field
    border="{ { false }}"
    type="password"
    label="密码"
    placeholder="请输入密码"
  />
</lin-cell-group>
```

:::

## 禁用输入框

通过`disabled`属性禁用输入框。通过`readonly`属性将输入框设置为只读状态

::: details 代码示例

```html
<lin-cell-group>
  <lin-field value="输入框已禁用" label="文本" disabled />
  <lin-field border="{ { false }}" value="输入框制只读" label="文本" readonly />
</lin-cell-group>
```

:::

## 显示图标

通过`rightIcon`和`leftIcon`属性可设置左右 2 边的图标

::: details 代码示例

```html
<lin-cell-group>
  <lin-field
    placeholder="显示图标"
    label="文本"
    rightIcon="user"
    leftIcon="user"
  />
  <lin-field
    border="{ { false }}"
    placeholder="显示清除图标"
    label="文本"
    leftIcon="user"
    clearable
  />
</lin-cell-group>
```

:::

## 错误提示

通过`error-message`属性增加对应的错误提示

::: details 代码示例

```html
<lin-cell-group>
  <lin-field
    border="{ { false }}"
    data-key="value3"
    value="{ { value3 }}"
    bind:change="onChange"
    required
    label="用户名"
    placeholder="请输入用户名"
    errorMessage="{ {value3?'':errorMessage}}"
  />
</lin-cell-group>
```

:::

## 内容对齐方式

可以通过`input-align`属性设置内容的对齐方式

::: details 代码示例

```html
<lin-cell-group>
  <lin-field
    border="{ { false }}"
    input-align="right"
    label="文本"
    placeholder="输入框内容右对齐"
  />
</lin-cell-group>
```

:::

## 高度自适应

对于 textarea，可以通过`autoHeight`属性设置高度自适应

::: details 代码示例

```html
<lin-cell-group>
  <lin-field
    label="留言"
    type="textarea"
    placeholder="请输入留言"
    autoHeight
    border="{ { false }}"
  />
</lin-cell-group>
```

:::

## 插入按钮

通过 button slot 可以在输入框尾部插入按钮

::: details 代码示例

```html
<lin-cell-group>
  <lin-field
    clearable
    label="短信验证码"
    placeholder="请输入短信验证码"
    border="{ { false }}"
    use-button-slot
  >
    <lin-button slot="button" size="small" type="success"
      >发送验证码</lin-button
    >
  </lin-field>
</lin-cell-group>
```

:::

## 属性

| 参数                  | 说明                                                                                     | 类型          | 可选值                                       | 默认值     |
| --------------------- | ---------------------------------------------------------------------------------------- | ------------- | -------------------------------------------- | ---------- |
| value                 | 当前输入的值                                                                             | String        | —                                            | —          |
| placeholder           | 输入框为空时占位符                                                                       | String        | —                                            | —          |
| placeholderStyle      | 指定 placeholder 的样式                                                                  | String        | —                                            | —          |
| placeholderClass      | 指定 placeholder 的样式类                                                                | String        | —                                            | —          |
| disabled              | 是否禁用输入框                                                                           | Boolean       | —                                            | false      |
| maxlength             | 最大输入长度，设置为 -1 的时候不限制最大长度                                             | Number        | —                                            | -1         |
| cursorSpacing         | 输入框聚焦时底部与键盘的距离                                                             | Number        | —                                            | 50         |
| autoFocus             | 自动聚焦，拉起键盘                                                                       | Boolean       | —                                            | false      |
| focus                 | 获取焦点                                                                                 | Boolean       | —                                            | false      |
| cursor                | 指定 focus 时的光标位置                                                                  | Number        | —                                            | -1         |
| selectionStart        | 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用                                | Number        | —                                            | -1         |
| selectionEnd          | 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用                              | Number        | -1                                           | —          |
| adjustPosition        | 键盘弹起时，是否自动上推页面                                                             | Boolean       | —                                            | true       |
| holdKeyboard          | focus 时，点击页面的时候不收起键盘                                                       | Boolean       | —                                            | false      |
| type                  | 可设置为任意原生类型                                                                     | String        | `number`,`idcard`,`textarea`, `digit`,`text` | text       |
| password              | 是否是密码类型                                                                           | Boolean       | —                                            | false      |
| confirmType           | 设置键盘右下角按钮的文字，仅在 type='text' 时生效                                        | String        | —                                            | done       |
| confirmHold           | 点击键盘右下角按钮时是否保持键盘不收起，在 type='textarea' 时无效                        | Boolean       | —                                            | false      |
| autoHeight            | 是否自动增高，设置 auto-height 时，style.height 不生效                                   | Boolean       | —                                            | false      |
| fixed                 | 如果 type 为 `textarea` 且在一个 `position:fixed` 的区域，需要显示指定属性 fixed 为 true | Boolean       | false                                        | navigateTo |
| showConfirmBar        | 是否显示键盘上方带有”完成“按钮那一栏，只对 textarea 有效                                 | Boolean       | true                                         | navigateTo |
| disableDefaultPadding | 是否去掉 iOS 下的默认内边距，只对 textarea 有效                                          | Boolean       | —                                            | true       |
| size                  | 单元格大小                                                                               | String        | `large`                                      | —          |
| isLink                | 是否展示右侧箭头并开启点击反馈                                                           | Boolean       | —                                            | false      |
| border                | 是否显示内边框                                                                           | Boolean       | —                                            | true       |
| required              | 是否显示表单必填星号                                                                     | Boolean       | —                                            | false      |
| leftIcon              | 左侧图标                                                                                 | String        | —                                            | —          |
| label                 | 输入框左侧文本                                                                           | String        | —                                            | —          |
| titleWidth            | 标题宽度                                                                                 | String,Number | —                                            | 6.2em      |
| arrowDirection        | 箭头方向                                                                                 | String        | —                                            | right      |
| readonly              | 是否只读                                                                                 | Boolean       | —                                            | false      |
| inputAlign            | 输入框内容对齐方式                                                                       | String        | `left`, `center`, `right`                    | —          |
| rightIcon             | 右侧图标                                                                                 | String        | —                                            | —          |
| clearable             | 是否启用清除控件                                                                         | Boolean       | —                                            | false      |
| errorMessage          | 底部错误提示文案，为空时不展示                                                           | String        | —                                            | —          |
| useButtonSlot         | 是否使用按钮插槽                                                                         | Boolean       | —                                            | false      |
| customStyle           | 自定义样式                                                                               | String        | —                                            | —          |

## 事件

| 事件名                    | 说明                                     | 参数                                      |
| ------------------------- | ---------------------------------------- | ----------------------------------------- |
| bind:change               | 输入内容时触发                           | 当前输入值                                |
| bind:blur                 | 输入框失焦时触发                         | 当前输入值                                |
| bind:focus                | 输入框聚焦时触发                         | 当前输入值                                |
| bind:clear                | 点击清空控件时触发                       | —                                         |
| bind:confirm              | 点击完成按钮时触发                       | 当前输入值                                |
| bind:linechange           | 输入框行数变化时调用，只对 textarea 有效 | { height: 0, heightRpx: 0, lineCount: 0 } |
| bind:keyboardheightchange | 键盘高度发生变化的时候触发此事件         | { height: height, duration: duration }    |
| bind:click-icon           | 点击尾部图标时触发                       | —                                         |

## 插槽

| 插槽名称   | 说明                 |
| ---------- | -------------------- |
| left-icon  | 自定义输入框头部图标 |
| right-icon | 自定义输入框尾部图标 |
| button     | 自定义输入框尾部按钮 |

## 外部样式类

| 类名         | 说明           |
| ---------------- | -------------- |
| custom-class     | 根节点样式类   |
| label-class      | 左侧文本样式类 |
| input-class      | 输入框样式类   |
| right-icon-class | 右侧图标样式类 |
| value-class      | 右侧内容样式类 |
| header-class     | 头部样式类     |
