Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    "../TabbarItem/index": {
      type: "descendant",
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        child.index = this.children.length - 1;
        this.updateChildren();
      },
      unlinked(child) {
        this.children = (this.children || [])
          .filter((it) => it !== child)
          .map((child, index) => {
            child.index = index;
            return child;
          });
        this.updateChildren();
      },
    },
  },
  externalClasses: ["custom-class"],
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
    },
    placeholder: Boolean,
    border: {
      type: Boolean,
      value: true,
    },
    zIndex: {
      type: Number,
      value: 1,
    },
    activeColor: String,
    inactiveColor: String,
  },
  data: {
    currentIndex: 0,
  },
  methods: {
    updateChildren() {
      (this.children || []).forEach((child) => {
        child.updateFromParent();
      });
    },
    updateCurrentIndex() {
      const { active } = this.properties(this.children || []).forEach(
        (child, index) => {
          if (active === child.getComponentName()) {
            this.setData({
              currentIndex: index,
            });
          }
          child.setActive(active === child.getComponentName());
        }
      );
    },
    emitChange(name) {
      this.triggerEvent("change", name);
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});
