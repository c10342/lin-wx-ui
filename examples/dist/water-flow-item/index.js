import { LinComponent } from "../common/component";
import { getRect } from "../common/utils";
LinComponent({
  relation: {
    type: "ancestor",
    name: "water-flow"
  },
  data: {
    // 位置样式
    positionStyle: "",
    // 组件宽度
    width: "50%"
  },
  methods: {
    // 获取组件元素信息
    getRect() {
      return getRect(this, ".lin-water-flow-item");
    },
    // 设置组件位置
    setPosition(positionStyle) {
      this.setData({
        positionStyle
      });
    },
    // 设置组件宽度
    setWidth(width) {
      this.setData({
        width: parseInt(width)
      });
    }
  }
});
