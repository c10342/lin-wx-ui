import ButtonBehavior from '../behaviors/button';
import OpenTypeBehavior from '../behaviors/open-type';

Component({
  name: 'Dialog',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: [
    'custom-class',
    'header-class',
    'content-class',
    'footer-class',
    'cancel-class',
    'confirm-class'
  ],
  behaviors: [ButtonBehavior, OpenTypeBehavior],
  properties: {
    // 是否显示
    show: {
      type: Boolean,
      observer(show) {
        if (!show) {
          this.stopLoading();
        }
      }
    },
    // 标题
    title: String,
    // 文本内容
    message: String,
    // 样式风格
    theme: {
      type: String,
      value: 'default',
      options: ['default', 'round-button']
    },
    // 是否使用自定义内容的插槽
    useSlot: Boolean,
    // 自定义类名
    className: String,
    // 自定义样式
    customStyle: String,
    // 是否异步关闭
    asyncClose: Boolean,
    // 内容对齐方式
    messageAlign: {
      type: String,
      value: 'center',
      options: ['center', 'left', 'right']
    },
    // 自定义遮罩层样式
    maskStyle: String,
    // 是否使用自定义标题的插槽
    useTitleSlot: Boolean,
    // 是否展示取消按钮
    showCancelButton: Boolean,
    // 点击遮罩层时是否关闭弹窗
    closeOnClickMask: Boolean,
    // 确认按钮的微信开放能力
    confirmButtonOpenType: String,
    // 弹窗宽度，默认单位为 px
    width: {
      type: [String, Number],
      value: '640rpx'
    },
    // z-index 层级
    zIndex: {
      type: Number,
      value: 2000
    },
    // 确认按钮的文案
    confirmButtonText: {
      type: String,
      value: '确认'
    },
    // 取消按钮的文案
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    // 确认按钮的字体颜色
    confirmButtonColor: String,
    // 取消按钮的字体颜色
    cancelButtonColor: String,
    // 是否展示确认按钮
    showConfirmButton: {
      type: Boolean,
      value: true
    },
    // 是否展示遮罩层
    mask: {
      type: Boolean,
      value: true
    },
    // 动画名称
    transition: {
      type: String,
      value: 'scale'
    }
  },
  data: {
    // 点击确定后的回调函数
    onConfirm: null,
    // 点击取消后的回调函数
    onCancel: null,
    // 是否加载中
    loading: {
      confirm: false,
      cancel: false
    }
  },
  methods: {
    // 点击遮罩层
    onMaskClick() {
      // 处理关闭行为
      this.onClose('mask');
    },
    // 点击确定按钮
    onConfirm() {
      if (this.data.loading.confirm) {
        return;
      }
      // 处理确定行为
      this.handleAction('confirm');
    },
    // 点击取消按钮
    onCancel() {
      if (this.data.loading.cancel) {
        return;
      }
      // 处理取消行为
      this.handleAction('cancel');
    },
    // 处理行为确定/取消
    handleAction(action) {
      if (this.data.asyncClose) {
        // 异步关闭的情况下
        // 按钮显示loading
        this.setData({
          [`loading.${action}`]: true
        });
      }
      // 处理关闭行为
      this.onClose(action);
    },
    // 关闭弹框
    close() {
      this.setData({
        show: false
      });
    },
    // 停止按钮的loading
    stopLoading() {
      this.setData({
        loading: {
          confirm: false,
          cancel: false
        }
      });
    },
    // 关闭行为
    onClose(action) {
      if (!this.properties.asyncClose) {
        // 不是异步关闭的情况下，可以直接关闭掉
        this.close();
      }
      // 触发关闭事件
      this.triggerEvent('close', action);
      // mask/cancel/confirm
      this.triggerEvent(action, {
        dialog: this
      });
      // 获取回调函数
      const callback = this.data[
        action === 'confirm' ? 'onConfirm' : 'onCancel'
      ];
      if (callback) {
        // 执行对应的回调函数
        callback(this);
      }
    }
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {}
});
