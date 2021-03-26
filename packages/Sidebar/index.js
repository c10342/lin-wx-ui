Component({
  name: 'Sidebar',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class'],
  relations: {
    '../SidebarItem/index': {
      type: 'descendant',
      linked (child) {
        this.children = this.children || [];
        this.children.push(child);
        this.updateChildren();
      },
      unlinked (child) {
        this.children = (this.children || []).filter((it) => it !== child);
        this.updateChildren();
      }
    }
  },
  properties: {
    // 选中项的索引
    activeKey: {
      type: [String, Number],
      value: 0,
      observer: 'updateChildren'
    }
  },
  data: {},
  methods: {
    updateChildren () {
      (this.children || []).forEach((child, index) => {
        // 更新子组件数据
        child.updateFromParent();
        // 设置子组件的索引
        child.setIndex(index);
      });
    },
    emitChange (index) {
      this.triggerEvent('change', index);
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
