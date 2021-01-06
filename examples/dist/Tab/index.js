Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  relations: {
    '../Tabs/index': {
      type: 'ancestor',
      linked (parent) {
        this.parent = parent;
        this.updateWidth();
      },
      unlinked () {
        this.parent = null;
      }
    }
  },
  externalClasses: ['custom-class'],
  properties: {
    name: {
      type: [String, Number]
    },
    title: {
      type: String,
      observer: 'update'
    },
    disabled: {
      type: Boolean,
      observer: 'update'
    },
    dot: {
      type: Boolean,
      observer: 'update'
    },
    info: {
      type: [String, Number],
      observer: 'update'
    },
    titleStyle: {
      type: String,
      observer: 'update'
    }
  },
  data: {
    active: false,
    shouldRender: false,
    shouldShow: false,
    width: 0
  },
  methods: {
    getComponentName () {
      const { name } = this.properties;
      if (name) {
        return name;
      }
      return this.index;
    },
    updateRender (active, parent) {
      const { data } = parent;
      this.inited = this.inited || active;
      this.setData({
        active,
        shouldRender: this.inited || !data.lazyRender,
        shouldShow: active || data.animated
      });
    },
    update () {
      if (this.parent) {
        this.parent.updateTabs();
      }
    },
    updateWidth () {
      if (this.parent) {
        this.parent.getTrackWidth().then((res) => {
          this.setData({
            width: res.width
          });
        });
      }
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
