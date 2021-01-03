import { addUnit } from '../common/utils';
import LinkBehavior from '../behaviors/link';

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  behaviors: [LinkBehavior],
  relations: {
    '../Grid/index': {
      type: 'ancestor',
      linked(parent) {
        this.parent = parent;
      },
      unlinked() {
        this.parent = null;
      },
    },
  },
  externalClasses: [
    'custom-class',
    'content-class',
    'icon-class',
    'text-class',
  ],
  properties: {
    text: String,
    icon: String,
    iconColor: String,
    dot: Boolean,
    badge: String,
    url: String,
    useSlot: {
      type: Boolean,
    },
  },
  data: {
    wrapperStyle: '',
    center: true,
    iconSize: '56rpx',
    direction: 'vertical',
    border: true,
    square: false,
    contentStyle: '',
  },
  methods: {
    updateStyle() {
      if (!this.parent) {
        return;
      }

      const { properties, children } = this.parent;
      const {
        columnNum,
        center,
        iconSize,
        direction,
        border,
        square,
        gutter,
      } = properties;
      const wrapperStyle = [];
      const width = `${100 / columnNum}%`;
      wrapperStyle.push(`width:${width}`);
      if (square) {
        wrapperStyle.push(`padding-top:${width}`);
      }
      if (gutter) {
        wrapperStyle.push(`padding-right:${addUnit(gutter)}`);
        const index = children.findIndex((child) => child === this);
        if (index >= columnNum && !square) {
          wrapperStyle.push(`margin-top:${addUnit(gutter)}`);
        }
      }
      const contentStyle = [];
      if (gutter && square) {
        const gutterValue = addUnit(gutter);

        contentStyle.push(`right:${gutterValue}`);
        contentStyle.push(`bottom:${gutterValue}`);
        contentStyle.push('height:auto');
      }
      this.setData({
        wrapperStyle: wrapperStyle.join(';'),
        contentStyle: contentStyle.join(';'),
        center,
        iconSize,
        direction,
        border,
        square,
      });
    },
    onClick() {
      this.triggerEvent('click');
      const { url } = this.properties;
      this.jump(url);
    },
  },
  created() {},
  attached() {},
  ready() {
    this.updateStyle();
  },
  moved() {},
  detached() {},
});
