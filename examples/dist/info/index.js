import { LinComponent } from "../common/component";
LinComponent({
  props: {
    // 是否在右上角显示小红点
    dot: Boolean,
    // 是否在右上角显示徽标
    info: {
      type: [String, Number]
    },
    // 根节点样式
    customStyle: String
  }
});
