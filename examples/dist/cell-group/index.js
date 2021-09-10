import { LinComponent } from "../common/component";
LinComponent({
  classes: ["title-class"],
  relation: {
    type: "descendant",
    name: "cell"
  },
  props: {
    // 分组标题
    title: String,
    // 是否显示外边框
    border: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    // 设置LinCell组件底部边框
    setCellBorder() {
      const nodes = this.getRelationNodes("../Cell/index");
      // 不是最后一个LinCell组件才需要设置底部边框
      nodes.forEach((cell, index) => {
        if (index + 1 === nodes.length) {
          cell.setBorder(false);
        } else {
          cell.setBorder(true);
        }
      });
    }
  },
  mounted() {
    this.setCellBorder();
  }
});
