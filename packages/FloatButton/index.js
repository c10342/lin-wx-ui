import { BLUE, WHITE } from '../common/color';
import { addUnit } from '../common/utils';
const defaultStyle = {
  bgColor: BLUE,
  iconSize: '60rpx',
  fontSize: '34rpx',
  color: WHITE
};

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class'],
  properties: {
    btnList: {
      type: Array,
      default: [],
      observer: 'onListChange'
    },
    // 是否在点击选项后关闭
    closeOnClickMask: {
      type: Boolean,
      value: false
    },
    // 是否显示遮罩层
    mask: {
      type: Boolean,
      value: true
    },
    bottom: {
      type: [String, Number],
      value: '80rpx'
    },
    right: {
      type: [String, Number],
      value: '80rpx'
    },
    zIndex: {
      type: Number,
      value: 100
    },
    bgColor: {
      type: String
    },
    useSlot: {
      type: Boolean,
      default: false
    }
  },
  data: {
    list: [],
    show: false
  },
  methods: {
    onListChange() {
      const { btnList = [] } = this.properties;
      const list = [];
      btnList.forEach((item) => {
        const obj = {
          ...defaultStyle,
          ...item
        };
        obj.iconSize = addUnit(obj.iconSize);
        obj.fontSize = addUnit(obj.fontSize);
        list.push(obj);
      });
      this.setData({ list });
    },
    switchStatus() {
      const { show } = this.data;
      this.setData({ show: !show });
      if (show) {
        this.triggerEvent('hide');
      } else {
        this.triggerEvent('show');
      }
    },
    onItemClick(event) {
      const { item } = event.currentTarget.dataset;
      this.triggerEvent('click', item);
      this.switchStatus();
    },
    onMaskClick() {
      const { closeOnClickMask } = this.properties;
      if (closeOnClickMask) {
        this.switchStatus();
      }
    }
  },
  created: function () {},
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {}
});
