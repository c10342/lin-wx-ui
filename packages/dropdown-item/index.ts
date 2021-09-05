import { LinComponent } from "../common/component";

import defaultProps from "../dropdown-menu/props";

LinComponent({
  classes: ["item-class"],
  relation: {
    type: "ancestor",
    name: "dropdown-menu",
    linked() {
      // 插入到父组件时，更新数据
      this.updateDataFromParent();
    }
  },
  props: {
    // 当前选中项对应的 value
    value: {
      type: null,
      observer: "rerender"
    },
    // 菜单项标题
    title: {
      type: String,
      observer: "rerender"
    },
    // 选项数组
    options: {
      type: Array,
      value: [],
      observer: "rerender"
    },
    // 是否禁用菜单
    disabled: Boolean,
    // 标题额外类名
    titleClass: {
      type: String,
      observer: "rerender"
    },
    // 自定义弹出层样式
    popupStyle: String
  },
  data: {
    // 根节点样式
    wrapperStyle: "",
    // 是否显示弹出层
    showPopup: false,
    // 是否显示该组件
    showWrapper: false,
    // 是否使用过渡动画
    transition: false,
    // 选中状态的颜色
    activeColor: defaultProps.activeColor,
    // 过渡动画时长
    duration: defaultProps.duration,
    // 弹出层出现位置
    direction: defaultProps.direction,
    // 是否显示遮罩层
    mask: defaultProps.mask,
    // 是否可以点击遮罩层
    closeOnClickMask: defaultProps.closeOnClickMask
  },
  methods: {
    // 点击选项
    onOptionTap(event: WechatMiniprogram.TouchEvent) {
      // 获取选项数据
      const option = event.currentTarget.dataset.option;
      const { value, disabled } = option;
      if (disabled) {
        return;
      }
      // 判断是否点击的是否为选中状态的选项
      const shouldEmitChange = this.data.value !== value;
      // 关闭
      this.triggerEvent("close");
      // 关闭该组件
      this.setData({
        transition: true,
        showPopup: false
      });
      // 更新DropdownMenu父组件
      this.rerender();
      if (shouldEmitChange) {
        // 选中的选项发生变化才触发change事件
        this.triggerEvent("change", value);
      }
    },
    // 打开弹出层
    onOpen() {
      this.triggerEvent("open");
    },
    // 关闭弹出层
    onClose() {
      this.triggerEvent("close");
    },
    // 完全打开弹出层,过渡动画结束后
    onOpened() {
      this.triggerEvent("opended");
    },
    // 完全关闭弹出层,过渡动画结束后
    onClosed() {
      this.triggerEvent("closed");
      this.setData({ showWrapper: false, showPopup: false });
    },
    // 更新DropdownMenu父组件
    rerender() {
      wx.nextTick(() => {
        if (this.parent) {
          this.parent.updateItemListData();
        }
      });
    },
    // 点击遮罩层
    onMaskClose() {
      this.toggle();
    },
    // 切换显示/隐藏
    toggle(immediate = false) {
      const { showPopup } = this.data;
      if (showPopup) {
        // 隐藏
        this.hide(immediate);
      } else {
        // 显示
        this.show(immediate);
      }
    },
    hide(immediate = false) {
      // immediate 是否需要过渡动画
      const { showPopup } = this.data;
      if (showPopup === false) {
        return;
      }
      this.setData({
        transition: !immediate,
        showPopup: false
      });
      this.rerender();
    },
    show(immediate = false) {
      const { showPopup } = this.data;
      if (showPopup === true) {
        return;
      }
      this.setData({
        showPopup: true,
        transition: !immediate
      });
      if (this.parent) {
        // 获取组件固定定位的样式数据
        this.parent.getChildWrapperStyle().then((wrapperStyle) => {
          this.setData({
            wrapperStyle,
            showWrapper: true
          });
          this.rerender();
        });
      }
    },
    // 从父组件DropdownMenu获取数据更新
    updateDataFromParent() {
      if (this.parent) {
        const {
          // 菜单标题和选项的选中态颜色
          activeColor,
          // 动画时长，单位毫秒
          duration,
          // 菜单展开方向
          direction,
          // 是否显示遮罩层
          mask,
          // 是否在点击遮罩层后关闭菜单
          closeOnClickMask
        } = this.parent.data;
        this.setData({
          activeColor,
          duration,
          direction,
          mask,
          closeOnClickMask
        });
      }
    }
  }
});
