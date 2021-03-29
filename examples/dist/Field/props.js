// input和textarea组件的通用属性
export const commonProps = {
  // 当前输入的值
  value: {
    type: String,
    observer(value) {
      if (value !== this.value) {
        // 设置内部维护的输入值
        this.setData({ inputValue: value });
        this.value = value;
      }
    },
  },
  // 输入框为空时占位符
  placeholder: String,
  // 指定 placeholder 的样式
  placeholderStyle: String,
  // 指定 placeholder 的样式类
  placeholderClass: String,
  // 是否禁用输入框
  disabled: Boolean,
  // 最大输入长度，设置为 -1 的时候不限制最大长度
  maxlength: {
    type: Number,
    value: -1,
  },
  // 输入框聚焦时底部与键盘的距离
  cursorSpacing: {
    type: Number,
    value: 50,
  },
  // 自动聚焦，拉起键盘
  autoFocus: Boolean,
  // 获取焦点
  focus: Boolean,
  // 指定 focus 时的光标位置
  cursor: {
    type: Number,
    value: -1,
  },
  // 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用
  selectionStart: {
    type: Number,
    value: -1,
  },
  // 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用
  selectionEnd: {
    type: Number,
    value: -1,
  },
  // 键盘弹起时，是否自动上推页面
  adjustPosition: {
    type: Boolean,
    value: true,
  },
  // focus 时，点击页面的时候不收起键盘
  holdKeyboard: Boolean,
};

// input属性
export const inputProps = {
  // 可设置为任意原生类型
  type: {
    type: String,
    value: 'text',
  },
  // 是否是密码类型
  password: Boolean,
  // 设置键盘右下角按钮的文字，仅在 type='text' 时生效
  confirmType: String,
  // 点击键盘右下角按钮时是否保持键盘不收起，在 type='textarea' 时无效
  confirmHold: Boolean,
};

// textarea属性
export const textareaProps = {
  // 是否自动增高，设置 auto-height 时，style.height 不生效
  autoHeight: Boolean,
  // 如果 type 为 `textarea` 且在一个 `position:fixed` 的区域，需要显示指定属性 fixed 为 true
  fixed: Boolean,
  // 是否显示键盘上方带有”完成“按钮那一栏，只对 textarea 有效
  showConfirmBar: {
    type: Boolean,
    value: true,
  },
  // 是否去掉 iOS 下的默认内边距，只对 textarea 有效
  disableDefaultPadding: {
    type: Boolean,
    value: true,
  },
};
