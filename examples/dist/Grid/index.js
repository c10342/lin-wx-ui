Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    "../GridItem/index": {
      type: "descendant",
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
  externalClasses: ["custom-class"],
  properties: {
    // 1
    columnNum: {
      type: Number,
      value: 4,
      observer: "updateChildren",
    },
    // 1
    iconSize: {
      type: [String, Number],
      value: "56rpx",
      observer: "updateChildren",
    },
    // 1
    gutter: {
      type: [String, Number],
      value: 0,
      observer: "updateChildren",
    },
    // 1
    border: {
      type: Boolean,
      value: true,
      observer: "updateChildren",
    },
    // 1
    center: {
      type: Boolean,
      value: true,
      observer: "updateChildren",
    },
    // 1
    square: {
      type: Boolean,
      observer: "updateChildren",
    },
    // clickable: {
    //   type: Boolean,
    //   observer: "updateChildren",
    // },
    // 1
    direction: {
      type: String,
      value: "vertical",
      options: ["vertical", "horizontal"],
      observer: "updateChildren",
    },
  },
  data: {},
  methods: {
    updateChildren() {
      (this.children || []).forEach((child) => {
        child.updateStyle();
      });
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});
