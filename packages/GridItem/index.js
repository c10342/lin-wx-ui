import { addUnit } from "../common/utils";

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    "../Grid/index": {
      type: "ancestor",
      linked(parent) {
        this.parent = parent;
        // this.updateDataFromParent();
      },
      unlinked() {
        this.parent = null;
      },
    },
  },
  externalClasses: ["custom-class"],
  properties: {
    // 1
    text: String,
    // 1
    icon: String,
    // 1
    iconColor: String,
    // 1
    dot: Boolean,
    // 1
    badge: String,
    // 1
    url: String,
    // 1
    linkType: {
      type: String,
      value: "navigateTo",
      options: ["navigateTo", "redirectTo", "switchTab", "reLaunch"],
    },
    // 1
    useSlot: {
      type: Boolean,
    },
  },
  data: {
    wrapperStyle: "",
    center: true,
    iconSize: "56rpx",
    direction: "vertical",
    border: true,
    square: false,
    contentStyle: "",
  },
  methods: {
    updateStyle() {
      if (!this.parent) {
        return;
      }

      const { properties, children } = this.parent;
      const {
        columnNum,
        center,
        iconSize,
        direction,
        border,
        square,
        gutter,
      } = properties;
      const wrapperStyle = [];
      const width = `${100 / columnNum}%`;
      wrapperStyle.push(`width:${width}`);
      if (square) {
        wrapperStyle.push(`padding-top:${width}`);
      }
      if (gutter) {
        wrapperStyle.push(`padding-right:${addUnit(gutter)}`);
        const index = children.findIndex((child) => child === this);
        if (index >= columnNum && !square) {
          wrapperStyle.push(`margin-top:${addUnit(gutter)}`);
        }
      }
      let contentStyle = [];
      if (gutter && square) {
        const gutterValue = addUnit(gutter);

        contentStyle.push(`right:${gutterValue}`);
        contentStyle.push(`bottom:${gutterValue}`);
        contentStyle.push(`height:auto`);
      }
      this.setData({
        wrapperStyle: wrapperStyle.join(";"),
        contentStyle: contentStyle.join(";"),
        center,
        iconSize,
        direction,
        border,
        square,
      });
    },
    onClick() {
      this.triggerEvent("click");
      const { url, linkType } = this.properties;
      if (url) {
        wx[linkType]({ url });
      }
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {
    this.updateStyle();
  },
  moved: function() {},
  detached: function() {},
});
