import { LinComponent } from "../common/component";
import { commonProps, inputProps, textareaProps } from "./props";
import { canIUseModel } from "../common/version";
import FormControls from "../behaviors/form-controls";

LinComponent({
  field: true,
  mixins: [FormControls],
  relation: {
    type: "ancestor", // 关联的目标节点应为祖先节点
    name: "form-item"
  },
  classes: [
    "label-class",
    "input-class",
    "right-icon-class",
    "value-class",
    "header-class"
  ],
  props: {
    ...commonProps,
    ...inputProps,
    ...textareaProps,
    // 单元格大小
    size: {
      type: String,
      options: ["large"]
    },
    // 是否展示右侧箭头并开启点击反馈
    isLink: Boolean,
    // 是否显示内边框
    border: { type: Boolean, value: true },
    // 是否显示表单必填星号
    required: Boolean,
    // 左侧图标
    leftIcon: String,
    // 输入框左侧文本
    label: String,
    // 标题宽度
    titleWidth: {
      type: [String, Number],
      value: "6.2em"
    },
    // 箭头方向
    arrowDirection: {
      type: String,
      value: "right",
      options: ["up", "down", "right", "left"]
    },
    // 是否只读
    readonly: {
      type: Boolean,
      observer: "setShowClear"
    },
    // 输入框内容对齐方式
    inputAlign: {
      type: String,
      options: ["left", "center", "right"]
    },
    // 右侧图标
    rightIcon: String,
    // 是否启用清除控件
    clearable: { type: Boolean, observer: "setShowClear" },
    // 底部错误提示文案，为空时不展示
    errorMessage: String,
    // 是否使用按钮插槽
    useButtonSlot: Boolean,
    // 自定义样式
    customStyle: String
  },
  data: {
    // 输入框绑定值
    inputValue: "",
    // 是否显示清空按钮
    showClear: false
  },
  methods: {
    // 发射change事件
    emitChange() {
      // 双向数据绑定
      if (canIUseModel()) {
        this.setData({ value: this.value });
      }
      wx.nextTick(() => {
        this.triggerEvent("change", this.value);
      });
    },
    // input组件输入事件
    onInput(event: WechatMiniprogram.Input | WechatMiniprogram.TextareaInput) {
      const { value = "" } = event.detail || {};
      // 记录当前值
      this.value = value;
      // 设置清空按钮是否需要显示
      this.setShowClear();
      // 发射change事件
      this.emitChange();
    },
    // 失去焦点事件
    onBlur(
      event: WechatMiniprogram.InputBlur | WechatMiniprogram.TextareaBlur
    ) {
      // 标志位，是否在聚焦
      this.focused = false;
      this.setShowClear();
      this.triggerEvent("blur", event.detail);
      // 触发FormItem表单的方法，用来做表单校验
      this.triggerParentBlur(event.detail);
    },
    // 获得焦点事件
    onFocus(
      event: WechatMiniprogram.InputFocus | WechatMiniprogram.TextareaFocus
    ) {
      // 标志位，获得焦点
      this.focused = true;
      // 设置清空按钮是否需要显示
      this.setShowClear();
      this.triggerEvent("focus", event.detail);
    },
    // 点击清空按钮
    onClear() {
      // 清空值
      this.setData({ inputValue: "" });
      this.value = "";
      this.setShowClear();
      wx.nextTick(() => {
        // 发射事件
        this.emitChange();
        this.triggerEvent("clear", "");
      });
    },
    // 点击键盘的确定
    onConfirm(
      event: WechatMiniprogram.InputConfirm | WechatMiniprogram.TextareaConfirm
    ) {
      const { value = "" } = event.detail || {};
      this.value = value;
      this.setShowClear();
      this.triggerEvent("confirm", value);
    },
    // 行高发生改变
    onLineChange(event: WechatMiniprogram.TextareaLineChange) {
      this.triggerEvent("linechange", event.detail);
    },
    // 键盘高度发生变化
    onKeyboardHeightChange(
      event:
        | WechatMiniprogram.InputKeyboardHeightChange
        | WechatMiniprogram.TextareaKeyboardHeightChange
    ) {
      this.triggerEvent("keyboardheightchange", event.detail);
    },
    // 点击右侧图标
    onRightIconClick() {
      this.triggerEvent("click-icon");
    },
    // 设置清空按钮是否需要显示
    setShowClear() {
      const { clearable, readonly } = this.data;
      const { focused, value } = this;
      this.setData({
        showClear: !!clearable && !!focused && !!value && !readonly
      });
    }
  },
  beforeCreate() {
    // 记录输入的值
    this.value = this.data.value;
    this.setData({ inputValue: this.value });
  }
});
