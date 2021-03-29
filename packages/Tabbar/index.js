import { getRect } from '../common/utils';

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    '../TabbarItem/index': {
      type: 'descendant',
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        child.index = this.children.length - 1;
        this.updateChildren();
      },
      unlinked(child) {
        this.children = (this.children || [])
          .filter((it) => it !== child)
          .map((childData, index) => {
            childData.index = index;
            return childData;
          });
        this.updateChildren();
      },
    },
  },
  externalClasses: ['custom-class', 'placeholder-class'],
  properties: {
    active: {
      type: [String, Number],
      value: 0,
      observer() {
        this.updateCurrentIndex();
      },
    },
    fixed: {
      type: Boolean,
      value: true,
      observer: 'initPlaceholderView',
    },
    placeholder: {
      type: Boolean,
      observer: 'initPlaceholderView',
    },
    border: {
      type: Boolean,
      value: true,
    },
    zIndex: Number,
    activeColor: {
      type: String,
      observer: 'updateChildren',
    },
    inactiveColor: {
      type: String,
      observer: 'updateChildren',
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    currentIndex: 0,
    height: 0,
  },
  methods: {
    updateChildren() {
      (this.children || []).forEach((child) => {
        child.updateFromParent();
      });
    },
    updateCurrentIndex() {
      const { active } = this.properties;
      (this.children || []).forEach((child, index) => {
        if (active === child.getComponentName()) {
          this.setData({
            currentIndex: index,
          });
        }
        child.setActive(active === child.getComponentName());
      });
    },
    emitChange(name) {
      this.triggerEvent('change', name);
    },
    initPlaceholderView() {
      const { placeholder, fixed } = this.properties;
      if (placeholder && fixed) {
        getRect(this, '.lin-tabbar').then((res) => {
          this.setData({ height: res.height });
        });
      }
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
