Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ["custom-class", "content-class"],
  relations: {
    "../Collapse/index": {
      type: "ancestor",
      linked(parent) {
        this.parent = parent;
      },
      unlinked() {
        this.parent = null;
      },
    },
  },
  properties: {
    name: null,
    title: null,
    value: null,
    icon: String,
    label: String,
    disabled: Boolean,
    border: {
      type: Boolean,
      value: true,
    },
    isLink: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    expanded: false,
    index: -1,
    animation: null,
  },
  methods: {
    updateExpanded() {
      if (!this.parent) {
        return Promise.resolve();
      }
      const { value, accordion } = this.parent.properties;
      const { children = [] } = this.parent;
      const { name } = this.properties;

      const index = children.indexOf(this);
      const currentName = name == null ? index : name;

      let expanded = false;
      if (accordion) {
        expanded = value == currentName;
      } else {
        expanded = (value || []).some((name) => name == currentName);
      }
      if (expanded !== this.data.expanded) {
        this.updateStyle(expanded);
      }
      this.setData({ index, expanded });
    },
    updateStyle(expanded) {
      const { inited } = this;
      const query = this.createSelectorQuery();
      query.select(".lin-collapse-item-content").boundingClientRect();
      query.exec((rect) => {
        this.leftWidth = rect[0].width;
        const { height } = rect[0];
        const { myAnimation } = this;
        if (expanded) {
          if (height === 0) {
            myAnimation.height("auto").step();
          } else {
            myAnimation.height(height).step({
              duration: inited ? 300 : 1,
            });
          }
          this.setData({ animation: myAnimation.export() });
          return;
        }
        myAnimation.height(0).step({ duration: 300 });
        this.setData({ animation: myAnimation.export() });
      });
    },
    onClick() {
      const { expanded } = this.data;
      const { name, disabled } = this.properties;
      if (disabled) {
        return;
      }
      const index = this.parent.children.indexOf(this);
      const currentName = name == null ? index : name;
      this.parent.switch(currentName, !expanded);
    },
  },
  created: function() {},
  attached: function() {
    this.myAnimation = wx.createAnimation({
      duration: 0,
      timingFunction: "ease-in-out",
    });
  },
  ready: function() {
    this.updateExpanded();
    this.inited = true;
  },
  moved: function() {},
  detached: function() {},
});
