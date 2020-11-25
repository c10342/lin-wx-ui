import { RED } from "../common/color";

let ARRAY = [];

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    "../DropdownItem/index": {
      type: "descendant",
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        this.updateItemListData();
      },
      unlinked(child) {
        this.children = (this.children || []).filter((it) => it !== child);
        this.updateItemListData();
      },
    },
  },
  externalClasses: ["custom-class"],
  properties: {
    activeColor: {
      type: String,
      value: RED,
    },
    zIndex: {
      type: Number,
      value: 10,
    },
    duration: {
      type: Number,
      value: 200,
    },
    direction: {
      type: String,
      value: "down",
      options: ["down", "up"],
    },
    mask: {
      type: Boolean,
      value: true,
    },
    closeOnClickMask: {
      type: Boolean,
      value: true,
    },
    closeOnClickOutside: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    itemListData: [],
  },
  methods: {
    updateItemListData() {
      this.setData({
        itemListData: this.children.map((child) => child.data),
      });
    },
    getChildWrapperStyle() {
      const { zIndex, direction } = this.properties;
      return new Promise((resolve, reject) => {
        const query = this.createSelectorQuery();
        query.select(".lin-dropdown-menu-bar-wrapper").boundingClientRect();
        query.exec((rect) => {
          const { top = 0, bottom = 0 } = rect[0];
          let wrapperStyle = `z-index:${zIndex};`;
          if (direction === "down") {
            wrapperStyle += `top:${bottom}px;`;
          }

          resolve(wrapperStyle);
        });
      });
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {
    ARRAY.push(this);
  },
  moved: function() {},
  detached: function() {
    ARRAY = ARRAY.filter((item) => item !== this);
  },
});
