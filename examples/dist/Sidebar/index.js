Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    '../SidebarItem/index': {
      type: 'descendant',
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        this.updateChildren();
      },
      unlinked(child) {
        this.children = (this.children || []).filter((it) => it !== child);
        this.updateChildren();
      },
    },
  },
  externalClasses: ['custom-class'],
  properties: {
    activeKey: {
      type: [String, Number],
      value: 0,
      observer: 'updateChildren',
    },
  },
  data: {},
  methods: {
    updateChildren() {
      (this.children || []).forEach((child, index) => {
        child.updateFromParent();
        child.setIndex(index);
      });
    },
    emitChange(index) {
      this.triggerEvent('change', index);
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
