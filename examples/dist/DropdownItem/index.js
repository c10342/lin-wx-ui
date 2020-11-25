//Component Object
Component({
  relations: {
    "../DropdownMenu/index": {
      type: "ancestor",
      linked(parent) {
        this.parent = parent;
        this.updateDataFromParent();
        this.setWrapperStyle();
      },
      unlinked() {
        this.parent = null;
      },
    },
  },
  properties: {
    value: {
      type: null,
      observer: "rerender",
    },
    title: {
      type: String,
      observer: "rerender",
    },
    options: {
      type: Array,
      value: [],
      observer: "rerender",
    },
    disabled: Boolean,
    titleClass: {
      type: String,
      observer: "rerender",
    },
    popupStyle: String,
  },
  data: {
    wrapperStyle: "",
  },
  methods: {
    updateDataFromParent() {},
    setWrapperStyle() {
      if (this.parent) {
        this.parent.getChildWrapperStyle().then((res) => {
          // console.log(res);
          this.setData({
            wrapperStyle: res,
          });
        });
      }
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {},
});
