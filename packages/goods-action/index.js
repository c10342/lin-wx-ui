Component({
  name: 'GoodsAction',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class'],
  relations: {
    '../goods-action-button/index': {
      type: 'descendant',
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        // console.log(child.name);
        // 更新GoodsActionButton组件数据
        this.updateChildren();
      },
      unlinked(child) {
        this.children = (this.children || []).filter((it) => it !== child);
        this.updateChildren();
      }
    }
  },
  properties: {
    // 是否为 iPhoneX 留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  data: {},
  methods: {
    // 更新GoodsActionButton组件数据
    updateChildren() {
      const children = this.children || [];
      const len = children.length;
      children.forEach((child, index) => {
        child.update(index, len);
      });
    }
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {}
});
