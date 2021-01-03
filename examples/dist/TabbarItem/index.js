Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    '../Tabbar/index': {
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
    name: {
      type: [String, Number],
    },
    icon: String,
    dot: Boolean,
    info: {
      type: [String, Number],
    },
  },
  data: {
    width: 0,
    active: false,
    activeColor: '',
    inactiveColor: '',
  },
  methods: {
    getComponentName() {
      const { name } = this.properties;
      if (name != null) {
        return name;
      }
      return this.index;
    },
    updateFromParent() {
      if (this.parent) {
        const params = {};
        const { children, properties } = this.parent;
        const width = `${100 / children.length}%`;
        params.width = width;
        params.active = properties.active === this.getComponentName();
        params.activeColor = properties.activeColor;
        params.inactiveColor = properties.inactiveColor;
        this.setDiffData(params);
      }
    },
    setDiffData(data) {
      const obj = Object.keys(data).reduce((prev, current) => {
        if (this.data[current] !== data[current]) {
          prev[current] = data[current];
        }
        return prev;
      }, {});

      this.setData(obj);
    },
    setActive(active) {
      this.setData({ active });
    },
    onClick() {
      if (this.data.active || !this.parent) {
        return;
      }
      this.parent.emitChange(this.getComponentName());
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
