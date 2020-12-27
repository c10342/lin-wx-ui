import { Link } from "../behaviors/link";
import { openType } from "../behaviors/open-type";
import { button } from "../behaviors/button";

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ["custom-class", "icon-class", "text-class"],
  behaviors: [Link, openType, button],
  properties: {
    text: String,
    icon: String,
    info: {
      type: [String, Number],
    },
    dot: Boolean,
    url: String,
    loading: Boolean,
    disabled: Boolean,
  },
  data: {},
  methods: {
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
