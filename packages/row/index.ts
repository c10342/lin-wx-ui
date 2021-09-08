import { LinComponent } from "../common/component";

LinComponent({
  relation: {
    type: "descendant",
    name: "col",
    linked(target) {
      if (this.data.gutter) {
        target.setGutter(this.data.gutter);
      }
    }
  },
  props: {
    // 列元素之间的间距（单位为 px）
    gutter: {
      type: Number,
      observer: "setGutter"
    }
  },
  data: {
    // 根节点样式
    viewStyle: ""
  },
  methods: {
    setGutter() {
      const { gutter } = this.data;
      const margin = `-${Number(gutter) / 2}px`;
      if (gutter) {
        // 设置margin外边距
        const viewStyle = `margin-right: ${margin}; margin-left: ${margin};`;
        this.setData({ viewStyle });
      }
      // 设置Col组件的padding内边距
      this.getRelationNodes("../Col/index").forEach((col) => {
        col.setGutter(gutter);
      });
    }
  },
  mounted() {
    if (this.data.gutter) {
      this.setGutter();
    }
  }
});
