Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    '../Sidebar/index': {
      type: 'ancestor',
      linked(parent) {
        this.parent = parent;
        this.updateFromParent();
      },
      unlinked() {
        this.parent = null;
      },
    },
  },
  externalClasses: ['custom-class', 'content-class'],
  properties: {
    title: String,
    dot: Boolean,
    badge: {
      type: [String, Number],
      value: '',
    },
    disabled: Boolean,
  },
  data: {
    activeKey: 0,
    index: -1,
  },
  methods: {
    updateFromParent() {
      if (this.parent) {
        const { activeKey } = this.parent.properties;
        this.setData({
          activeKey,
        });
      }
    },
    setIndex(index) {
      this.setData({ index });
    },
    onItemClick() {
      const { disabled } = this.properties;
      if (this.parent && !disabled) {
        this.parent.emitChange(this.data.index);
      }
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
