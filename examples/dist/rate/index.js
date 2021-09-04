import { RED, GRAY5, DISABLEDCOLOR } from '../common/color';
import { getRect } from '../common/utils';

Component({
  name: 'Rate',
  options: {
    addGlobalClass: true
  },
  behaviors: ['wx://form-field'],
  externalClasses: ['custom-class', 'icon-class', 'void-icon-class'],
  properties: {
    // 图标间距，默认单位为 px
    gutter: {
      type: [String, Number],
      value: '4px'
    },
    // 选中时的颜色
    color: {
      type: String,
      value: RED
    },
    // 未选中时的颜色
    voidColor: {
      type: String,
      value: GRAY5
    },
    // 是否允许半选
    allowHalf: Boolean,
    // 图标大小，默认单位为 px
    iconSize: {
      type: [String, Number],
      value: '50rpx'
    },
    // 当前分值
    value: {
      type: Number,
      observer: 'setWidth'
    },
    // 图标总数
    count: {
      type: Number,
      value: 5,
      observer: 'setCount'
    },
    // 选中时的图标名称
    icon: {
      type: String,
      value: 'star1'
    },
    // 未选中时的图标名称
    voidIcon: {
      type: String,
      value: 'star1-o'
    },
    // 是否为只读状态
    readonly: Boolean,
    // 是否禁用评分
    disabled: Boolean,
    // 禁用时的颜色
    disabledColor: {
      type: String,
      value: DISABLEDCOLOR
    }
  },
  data: {
    // 图标总数
    innerCountArray: Array.from({ length: 5 }),
    // 激活的宽度
    width: '0'
  },
  methods: {
    // 设置图标总数
    setCount() {
      this.setData({
        innerCountArray: Array.from({ length: this.properties.count })
      });
    },
    // 设置激活的宽度
    setWidth() {
      let { value, gutter } = this.properties;
      gutter = parseFloat(gutter);
      const { innerCountArray } = this.data;
      if (!this.rateWidth || !this.containerLeft) {
        // 查询不到组件总宽度，或者单个图标的宽度，则什么都不做
        return;
      }
      let width = 0;
      // 处理临界值
      if (value > innerCountArray.length) {
        value = innerCountArray.length;
      }
      // 处理临界值
      if (value < 0) {
        value = 0;
      }
      // 值向下取整（整星）
      const inNum = Math.floor(value);
      // 总的间距
      let gutterWidth = Math.ceil(value - 1) * gutter;
      // 处理临界值
      gutterWidth = gutterWidth < 0 ? 0 : gutterWidth;
      // 整星宽度+边距宽度+半星宽度
      width =
        inNum * this.rateWidth + gutterWidth + (value - inNum) * this.rateWidth;

      this.setData({
        width: `${width}px`
      });
    },
    // 点击图标
    onClick(event) {
      const { allowHalf, readonly, disabled } = this.properties;

      if (readonly || disabled) {
        return;
      }
      // 找出点的是第几个图标
      let index = event.currentTarget.dataset.index;
      if (allowHalf) {
        // 允许出现半星
        // 点击的图标距离容器最左边的距离
        const offsetLeft = event.currentTarget.offsetLeft;
        // 点击的位置距离容器最左边的距离
        const x = event.detail.x - this.containerLeft;
        // 计算出点击的位置在图标容器中的偏移量
        const diffx = x - offsetLeft;

        if (diffx > this.rateWidth / 2) {
          // 大于图标容器宽度的一半,就是整星
          index += 1;
        } else {
          // 小于图标容器宽度的一半,就是半星
          index += 0.5;
        }
      } else {
        // 不允许是半星
        // 点击直接是整星
        index += 1;
      }

      this.triggerEvent('change', index);
    }
  },
  created() {},
  attached() {},
  ready() {
    this.setCount();
    // // 整体容器
    // const rate0Rect = getRect(this, '#lin-rate-0');
    // // 第一颗星
    // // const rateoRect = getRect(this, '#lin-rate-o');
    // Promise.all([rate0Rect, rateoRect])
    //   .then(res => {
    //     // 整体宽度
    //     this.rateWidth = res[0].width;
    //     // 容器距离屏幕左边的距离
    //     this.containerLeft = res[0].left;
    //     // this.containerLeft = res[1].left;
    //     // 设置激活状态的宽度
    //     this.setWidth();
    //   });

    getRect(this, '#lin-rate-0').then((rect) => {
      // 整体宽度
      this.rateWidth = rect.width;
      // 容器距离屏幕左边的距离
      this.containerLeft = rect.left;
      // 设置激活状态的宽度
      this.setWidth();
    });
  },
  moved() {},
  detached() {}
});
