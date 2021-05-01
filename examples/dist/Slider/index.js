import { getRect } from '../common/utils';

Component({
  name: 'Slider',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class', 'bar-class', 'button-class'],
  properties: {
    // 当前进度百分比，取值范围为 0-100
    value: {
      type: Number,
      value: 0,
      observer: 'setBarWidth'
    },
    // 是否禁用滑块
    disabled: Boolean,
    // 最大值
    max: {
      type: Number,
      value: 100
    },
    // 最小值
    min: {
      type: Number,
      value: 0
    },
    // 步长
    step: {
      type: Number,
      value: 1
    },
    // 进度条高度，默认单位为 px
    barHeight: {
      type: [String, Number],
      value: '2px'
    },
    // 进度条激活态颜色
    activeColor: String,
    // 进度条默认颜色
    inactiveColor: String,
    // 是否使用 button 插槽
    useButtonSlot: Boolean
  },
  data: {
    // 进度条激活态的长度
    width: 0,
    // 进度条那个圆球的位置
    left: 0,
    // 过度动画
    transition: 'transition: all 300ms'
  },
  methods: {
    // 设置进度条激活态的长度
    setBarWidth() {
      // 通过value值计算出激活状态进度条的长度
      const offsetWidth = this.getOffsetWidthByValue(this.properties.value);
      // 设置激活状态的长度
      this.setStyleWidth(offsetWidth);
    },
    // 通过value值计算出激活状态进度条的长度
    getOffsetWidthByValue(value) {
      // 最大最小值
      const { max, min } = this.properties;
      // 差值
      const offsetNum = max - min;
      let percent = 0;
      // 临界值处理
      if (value >= max) {
        percent = 1;
      } else if (value < min) {
        percent = 0;
      } else {
        // 计算出百分比
        const leftNum = value - min;
        percent = leftNum / offsetNum;
      }
      return this.containerWidth * percent;
    },
    // 设置激活状态的长度
    setStyleWidth(offsetWidth) {
      offsetWidth = parseInt(offsetWidth, 10);
      // 计算小球所在的位置
      let left = offsetWidth - this.barWidth / 2;
      // 临界值
      if (left <= 0) {
        left = 0;
      }
      // 临界值
      if (left >= this.containerWidth - this.barWidth) {
        left = this.containerWidth - this.barWidth;
      }
      // 设置小球位置和激活状态的长度
      this.setData({
        left,
        width: offsetWidth
      });
    },
    // 点击进度条
    onClick(event) {
      if (this.properties.disabled) {
        return;
      }
      // 获取步长
      const { step } = this.properties;
      // 获取手指点击的位置
      const x = event.detail.x;
      // 计算点击的位置距离
      let offsetWidth = x - this.containerLeft;
      // 根据距离计算出value的值
      let value = this.getValue(offsetWidth);
      // 取余数
      const remainder = value % step;
      if (remainder !== 0) {
        if (remainder >= step / 2) {
          // 余数大于等于步长一半，向上取整
          // 比如，步长是4，值是7，7%4余数就是3，3>=4/2,则value取8
          value += step - remainder;
        } else {
          // 向下取整
          value -= remainder;
        }
        // 根据value值计算出长度
        offsetWidth = Math.ceil(this.getOffsetWidthByValue(value));
      }
      // 设置长度
      this.setStyleWidth(offsetWidth);

      this.emitChange();
    },
    // 手指触摸事件
    onTouchStart() {
      if (this.properties.disabled) {
        return;
      }
      // 取消过渡动画，不然移动的时候会卡顿
      this.setData({
        transition: 'transition: none'
      });
      this.triggerEvent('drag-start');
    },
    // 手指移动事件
    onTouchMove(event) {
      if (this.properties.disabled) {
        return;
      }
      // 获取移动的位置
      const clientX = event.touches[0].clientX;
      // 计算差值
      let offsetWidth = clientX - this.containerLeft;
      // 处理临界值
      if (offsetWidth <= 0) {
        offsetWidth = 0;
      }
      if (offsetWidth >= this.containerWidth) {
        offsetWidth = this.containerWidth;
      }

      const { step } = this.properties;
      // 根据长度计算出value值
      const value = this.getValue(offsetWidth);
      const remainder = value % step;
      if (remainder !== 0) {
        // 没有达到步长，不移动
        return;
      }

      this.setStyleWidth(offsetWidth);
      this.emitDrag();
    },
    // 手指抬起事件
    onTouchEnd() {
      if (this.properties.disabled) {
        return;
      }
      // 恢复过渡动画
      this.setData({
        transition: 'transition: all 300ms'
      });
      this.emitChange();
      this.triggerEvent('drag-end');
    },
    // 根据长度计算出value值
    getValue(offsetWidth) {
      // 计算百分比
      const percent = offsetWidth / this.containerWidth;
      const { max, min } = this.properties;
      const offsetNum = max - min;
      // 计算差值
      const leftNum = offsetNum * percent;
      // 最终的值需要加上min
      return parseInt(min + leftNum, 10);
    },
    // change事件
    emitChange() {
      this.triggerEvent('change', this.getValue(this.data.width));
    },
    // 拖拽事件
    emitDrag() {
      this.triggerEvent('drag', this.getValue(this.data.width));
    }
  },
  created() {},
  attached() {},
  ready() {
    // 容器距离屏幕左边的距离
    this.containerLeft = 0;
    // 容器的宽度
    this.containerWidth = 0;
    // 圆球的宽度
    this.barWidth = 0;
    const containerRect = getRect(this, '#linsliderContainer');
    const barRect = getRect(this, '#linSliderBar');
    Promise.all([containerRect, barRect]).then((rect) => {
      this.containerLeft = rect[0].left;
      this.containerWidth = rect[0].width;
      this.barWidth = rect[1].width;
      // 设置进度条激活态的长度
      this.setBarWidth();
    });
  },
  moved() {},
  detached() {}
});
