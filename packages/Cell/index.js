//Component Object
Component({
  relations: {
    "../CellGroup/index": {
      type: "ancestor",
    },
  },
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    title: String,
    value: String,
    label: String,
    border: {
      type: Boolean,
      value: true,
    },
    size: { type: String, options: ["large"] },
    icon: String,
    isLink: Boolean,
    required: Boolean,
    arrowDirection: {
      type: String,
      value: "right",
    },
    url: String,
    linkType: {
      type: String,
      value: "navigateTo",
      options: [
        "navigateTo",
        "redirectTo",
        "switchTab",
        "switchTab",
        "reLaunch",
      ],
    },
    titleWidth: String,
  },
  data: {
    borderBottom: true,
  },
  methods: {
    onClick(event) {
      this.triggerEvent("click", event);
      this.jumpLink();
    },
    jumpLink() {
      const { url, linkType } = this.properties;
      if (url) {
        wx[linkType]({ url });
      }
    },
    setBorder(value) {
      this.setData({ borderBottom: value });
    },
  },
  created: function () {},
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {},
});
