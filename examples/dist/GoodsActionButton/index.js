import { Link } from "../behaviors/link";
import { openType } from "../behaviors/open-type";
import { button } from "../behaviors/button";

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    "../GoodsAction/index": {
      type: "ancestor",
      linked(parent) {
        this.parent = parent;
      },
      unlinked() {
        this.parent = null;
      },
    },
  },
  externalClasses: ["custom-class"],
  behaviors: [Link, openType, button],
  properties: {
    text: String,
    color: String,
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    type: {
      type: String,
      value: "danger",
    },
    url: String,
  },
  data: {
    index: 0,
    totalLen: -1,
  },
  methods: {
    update(index, len) {
      this.setData({
        index,
        totalLen: len,
      });
    },
    onClick() {
      this.triggerEvent("click");
      const { url } = this.properties;
      this.jump(url);
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});
