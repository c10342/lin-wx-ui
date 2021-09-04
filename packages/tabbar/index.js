import { getRect } from '../common/utils';

Component({
  name: 'Tabbar',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class', 'placeholder-class'],
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
      }
    }
  },
  properties: {
    // 当前选中标签的索引
    active: {
      type: [String, Number],
      value: 0,
      observer() {
        this.updateCurrentIndex();
      }
    },
    // 是否固定在底部
    fixed: {
      type: Boolean,
      value: true,
      observer: 'initPlaceholderView'
    },
    // 固定在底部时，是否在标签位置生成一个等高的占位元素
    placeholder: {
      type: Boolean,
      observer: 'initPlaceholderView'
    },
    // 是否展示外边框
    border: {
      type: Boolean,
      value: true
    },
    // 元素 z-index
    zIndex: Number,
    // 选中标签的颜色
    activeColor: {
      type: String,
      observer: 'updateChildren'
    },
    // 未选中标签的颜色
    inactiveColor: {
      type: String,
      observer: 'updateChildren'
    },
    // 是否为 iPhoneX 留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  data: {
    // 当前激活的索引
    currentIndex: 0,
    // 组件高度，用于生成等高的占位元素
    height: 0
  },
  methods: {
    // 更新TabbarItem子组件
    updateChildren() {
      (this.children || []).forEach((child) => {
        child.updateFromParent();
      });
    },
    // 更新选中的索引号
    updateCurrentIndex() {
      const { active } = this.properties;
      (this.children || []).forEach((child, index) => {
        if (active === child.getComponentName()) {
          this.setData({
            currentIndex: index
          });
        }
        // 设置组件状态（是否选中状态）
        child.setActive(active === child.getComponentName());
      });
    },
    emitChange(name) {
      this.triggerEvent('change', name);
    },
    // 生成等高占位元素
    initPlaceholderView() {
      const { placeholder, fixed } = this.properties;
      if (placeholder && fixed) {
        getRect(this, '.lin-tabbar').then((res) => {
          this.setData({ height: res.height });
        });
      }
    }
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {}
});
