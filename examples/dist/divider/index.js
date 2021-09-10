import { LinComponent } from "../common/component";
LinComponent({
  props: {
    // 虚线
    dashed: {
      type: Boolean,
      value: false
    },
    // 细线
    hairline: {
      type: Boolean,
      value: false
    },
    // 文本位置
    contentPosition: {
      type: String,
      options: ["left", "center", "right"]
    },
    // 字体大小
    fontSize: {
      type: [String, Number]
    },
    // 线条颜色
    borderColor: {
      type: String
    },
    // 文本颜色
    textColor: {
      type: String
    },
    // 根节点样式
    customStyle: {
      type: String
    }
  }
});
