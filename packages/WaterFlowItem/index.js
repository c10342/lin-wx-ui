import { getRect } from '../common/utils';

Component({
  name: 'WaterFlowItem',
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class'],
  relations: {
    '../WaterFlow/index': {
      type: 'ancestor',
      linked(parent) {
        this.parent = parent;
      },
      unlinked() {
        this.parent = null;
      },
    },
  },
  properties: {},
  data: {
    // 位置样式
    positionStyle: '',
    // 组件宽度
    width: '50%',
  },
  methods: {
    // 获取组件元素信息
    getRect() {
      return getRect(this, '.lin-water-flow-item');
    },
    // 设置组件位置
    setPosition(positionStyle) {
      this.setData({
        positionStyle,
      });
    },
    // 设置组件宽度
    setWidth(width) {
      this.setData({
        width: parseInt(width),
      });
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
