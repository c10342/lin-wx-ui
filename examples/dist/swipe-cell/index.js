import { LinComponent } from "../common/component";
import { getRect } from "../common/utils";
const TRANSITIONAll = "transition: all 500ms";
const TRANSITIONNONE = "transition: none";
LinComponent({
  classes: ["left-class", "right-class"],
  props: {
    // 是否显示左侧
    showLeft: {
      type: Boolean,
      value: false
    },
    // 是否显示右侧
    showRight: {
      type: Boolean,
      value: false
    },
    // 左侧滑动区域宽度
    leftWidth: {
      type: Number,
      observer: "getLeftWidth"
    },
    // 右侧滑动区域宽度
    rightWidth: {
      type: Number,
      observer: "getRightWidth"
    },
    // 是否禁用滑动
    disabled: Boolean,
    // 是否禁用左滑动
    disabledLeft: Boolean,
    // 是否禁用右滑动
    disabledRight: Boolean,
    // 是否异步关闭
    asyncClose: Boolean,
    // 标识符
    name: {
      type: String,
      value: ""
    }
  },
  data: {
    // 过渡动画
    transitionStyle: TRANSITIONAll,
    // x轴位移
    translateX: 0
  },
  methods: {
    // 点击左右2侧，或者中间，点击左右2侧要自动关闭
    onClick(event) {
      // 获取点击的位置
      const { key: position = "outside" } = event.currentTarget.dataset;
      this.triggerEvent("click", position);
      const { translateX, name } = this.data;
      if (translateX === 0) {
        // x轴位移为0，说明左侧或者右侧没有显示出来，就不用处理了
        return;
      }
      this.position = position;
      if (this.data.asyncClose) {
        // 异步关闭，需要手动关闭
        this.triggerEvent("before-close", {
          position,
          instance: this,
          name
        });
      } else {
        this.close();
      }
    },
    // 设置x轴位移
    setTranslateX(translateX) {
      this.setData({
        // 设置过度动画
        transitionStyle: TRANSITIONAll,
        translateX
      });
    },
    // 关闭左右2侧
    close() {
      if (this.data.translateX === 0) {
        // x轴位移说明已经是关闭状态了
        return;
      }
      this.setData({
        transitionStyle: TRANSITIONAll,
        translateX: 0
      });
      this.emitClose();
    },
    // 发射关闭事件
    emitClose(position) {
      this.triggerEvent("close", {
        position: position || this.position,
        name: this.data.name,
        instance: this
      });
    },
    // 打开左侧或者右侧
    open(position) {
      const { disabled, disabledLeft, disabledRight } = this.data;
      if (!position || disabled) {
        return;
      }
      if (position === "left" && !disabledLeft) {
        // 打开左侧
        this.setTranslateX(this.leftWidth);
        this.emitOpen(position);
      } else if (position === "right" && !disabledRight) {
        // 打开右侧
        this.setTranslateX(-this.rightWidth);
        this.emitOpen(position);
      }
    },
    // 发射open事件
    emitOpen(position) {
      const { name } = this.data;
      this.triggerEvent("open", {
        position,
        name,
        instance: this
      });
      this.position = position;
    },
    // 手指移动事件
    onTouchmove(event) {
      const {
        showLeft,
        showRight,
        disabled,
        disabledLeft,
        disabledRight
      } = this.data;
      if (disabled) {
        return;
      }
      let { translateX } = this.data;
      // 获取移动点
      const clientX = event.touches[0].clientX;
      // 计算位移差
      const offsetTranslateX = clientX - this.startX;
      translateX += offsetTranslateX;
      if (showLeft && translateX > 0 && !disabledLeft) {
        // translateX > 0说明手指是往右边移动，这个时候要打开左侧
        if (translateX >= this.leftWidth) {
          // 越界处理
          translateX = this.leftWidth;
        }
        this.setData({ translateX });
      } else if (showRight && translateX < 0 && !disabledRight) {
        // translateX < 0说明手指往左边移动，这个时候要打开右侧
        if (-translateX >= this.rightWidth) {
          // 越界处理
          translateX = -this.rightWidth;
        }
        this.setData({ translateX });
      }
      this.startX = clientX;
    },
    // 手指触摸结束事件
    onTouchend() {
      const {
        showLeft,
        showRight,
        disabled,
        disabledLeft,
        disabledRight
      } = this.data;
      if (disabled) {
        return;
      }
      let { translateX } = this.data;
      if (translateX > 0 && showLeft && !disabledLeft) {
        // 此时是打开左边的情况
        if (translateX > this.leftWidth / 2) {
          // x轴位移的距离大于左侧宽度的一半，则直接打开左侧
          translateX = this.leftWidth;
          this.emitOpen("left");
        } else {
          // 否则关闭左侧
          translateX = 0;
          this.emitClose("left");
        }
        this.setTranslateX(translateX);
      } else if (translateX < 0 && showRight && !disabledRight) {
        // 此时是打开右侧的情况
        if (-translateX > this.rightWidth / 2) {
          // x轴位移的距离大于右侧宽度的一半，则直接打开右侧
          translateX = -this.rightWidth;
          this.emitOpen("right");
        } else {
          // 否则关闭右侧
          translateX = 0;
          this.emitClose("right");
        }
        this.setTranslateX(translateX);
      }
    },
    // 手指刚触摸屏幕
    onTouchstart(event) {
      const { disabled } = this.data;
      if (disabled) {
        return;
      }
      // 记录起始位置
      const clientX = event.touches[0].clientX;
      this.startX = clientX;
      this.setData({
        // 取消过度动画，否则在手指移动过程中会出现卡顿
        transitionStyle: TRANSITIONNONE
      });
    },
    // 获取左右2侧的宽度
    getLeftAndRightWidth() {
      this.getLeftWidth();
      this.getRightWidth();
    },
    // 获取左侧宽度
    getLeftWidth() {
      const { showLeft, leftWidth } = this.data;
      if (showLeft) {
        // 需要显示左侧的时候才获取宽度
        if (leftWidth) {
          // 用户给了左侧宽度就使用用户传的
          this.leftWidth = leftWidth;
        } else {
          // 否则就要自己去获取
          getRect(this, "#left").then((rect) => {
            this.leftWidth = rect.width;
          });
        }
      } else {
        this.leftWidth = 0;
      }
    },
    // 获取右侧宽度
    getRightWidth() {
      const { showRight, rightWidth } = this.data;
      if (showRight) {
        // 需要显示右侧的时候才获取宽度
        if (rightWidth) {
          // 用户给了右侧宽度就使用用户传的
          this.rightWidth = rightWidth;
        } else {
          // 否则就要自己去获取
          getRect(this, "#right").then((rect) => {
            this.rightWidth = rect.width;
          });
        }
      } else {
        this.rightWidth = 0;
      }
    }
  },
  beforeCreate() {
    // 手指点击的起始位置
    this.startX = 0;
    // 左侧宽度
    this.leftWidth = 0;
    // 右侧宽度
    this.rightWidth = 0;
    // 默认点击的位置
    this.position = "cell";
  },
  mounted() {
    // 获取左右2侧宽度
    this.getLeftAndRightWidth();
  }
});
