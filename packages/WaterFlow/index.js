import { getRect } from '../common/utils';

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    '../WaterFlowItem/index': {
      type: 'descendant',
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        this.renderWaterFlow();
      },
      unlinked(child) {
        this.children = (this.children || []).filter((it) => it !== child);
        this.renderWaterFlow();
      },
    },
  },
  externalClasses: ['custom-class'],
  properties: {
    watchData: {
      type: Array,
      value: [],
      observer: 'renderWaterFlow',
    },
    verticalMargin: {
      type: Number,
      value: 20,
      observer: 'renderWaterFlow',
    },
    horizontalMargin: {
      type: Number,
      value: 10,
      observer: 'renderWaterFlow',
    },
  },
  data: {
    height: 0,
  },
  methods: {
    renderWaterFlow() {
      getRect(this, '.lin-water-flow').then((rect) => {
        this.setChildWidth(rect);
        this.setChildrenPosition();
      });
    },
    setChildWidth(parentContainer) {
      const { horizontalMargin } = this.properties;
      const width = parentContainer.width / 2 - horizontalMargin;
      (this.children || []).forEach((child) => {
        child.setWidth(width);
      });
    },
    setChildrenPosition() {
      wx.nextTick(() => {
        const { verticalMargin, horizontalMargin } = this.properties;
        let leftHeight = 0;
        let rightHeight = 0;
        const tasks = [];
        (this.children || []).forEach((child) => {
          tasks.push(child.getRect());
        });
        Promise.all(tasks).then((result) => {
          result.forEach((res, index) => {
            const child = this.children[index];
            if (leftHeight <= rightHeight) {
              child.setPosition(
                `left:${horizontalMargin / 2}px;top:${leftHeight}px;`
              );
              leftHeight += res.height + verticalMargin * 1;
            } else {
              child.setPosition(
                `right:${horizontalMargin / 2}px;top:${rightHeight}px;`
              );
              rightHeight += res.height + verticalMargin * 1;
            }
          });
          this.setData({
            height:
              Math.ceil(Math.max(leftHeight, rightHeight)) - verticalMargin * 1,
          });
        });
      });
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
