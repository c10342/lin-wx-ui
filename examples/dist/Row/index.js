//Component Object
Component({
  options: {
    addGlobalClass: true,
  },
  relations: {
    "../Col/index": {
      type: "descendant",
      linked(target) {
        if (this.properties.gutter) {
          target.setGutter(this.properties.gutter);
        }
      },
    },
  },
  properties: {
    gutter: {
      type: Number,
      observer: "setGutter",
    },
  },
  data: {
    viewStyle: "",
  },
  methods: {
    setGutter() {
      const { gutter } = this.properties;
      const margin = `-${Number(gutter) / 2}px`;
      if (gutter) {
        const viewStyle = `margin-right: ${margin}; margin-left: ${margin};`;
        this.setData({ viewStyle });
      }
      this.getRelationNodes("../Col/index").forEach((col) => {
        col.setGutter(gutter);
      });
    },
  },
  created: function () {},
  attached: function () {},
  ready: function () {
    if (this.properties.gutter) {
      this.setGutter();
    }
  },
  moved: function () {},
  detached: function () {},
});