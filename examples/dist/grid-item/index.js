import { LinComponent } from "../common/component";
import { addUnit } from "../common/utils";
import LinkBehavior from "../behaviors/link";
LinComponent({
  mixins: [LinkBehavior],
  classes: ["content-class", "icon-class", "text-class"],
  relation: {
    type: "ancestor",
    name: "grid"
  },
  props: {
    // 文字
    text: String,
    // 图标名称
    icon: String,
    // 图标颜色
    iconColor: String,
    // 是否显示图标右上角小红点
    dot: Boolean,
    // 图标右上角徽标的内容
    badge: String,
    // 点击后跳转的链接地址
    url: String,
    // 是否使用默认插槽
    useSlot: {
      type: Boolean
    }
  },
  data: {
    // 根元素样式
    wrapperStyle: "",
    // 是否居中显示
    center: true,
    // 图标大小，默认单位为 px
    iconSize: "56rpx",
    // 格子内容排列的方向
    direction: "vertical",
    // 是否显示边框
    border: true,
    // 是否将格子固定为正方形
    square: false,
    // 内容容器样式
    contentStyle: ""
  },
  methods: {
    // 更新样式
    updateStyle() {
      if (!this.parent) {
        return;
      }
      const { data, children } = this.parent;
      const {
        columnNum,
        center,
        iconSize,
        direction,
        border,
        square,
        gutter
      } = data;
      const wrapperStyle = [];
      // 根据列数算出宽度
      const width = `${100 / columnNum}%`;
      wrapperStyle.push(`width:${width}`);
      if (square) {
        // 如果是固定为正方形
        // 利用padding，百分比是按照宽度来算的
        wrapperStyle.push(`padding-top:${width}`);
      }
      if (gutter) {
        // 设置格子之间间距
        wrapperStyle.push(`padding-right:${addUnit(gutter)}`);
        const index = children.findIndex((child) => child === this);
        if (index >= columnNum && !square) {
          // 如果一行3个，第四个开始需要设置上边距，不然全都挤在一起
          wrapperStyle.push(`margin-top:${addUnit(gutter)}`);
        }
      }
      const contentStyle = [];
      if (gutter && square) {
        // 如果是正方形，并且需要设置格子之间的边距
        // 转化单位
        const gutterValue = addUnit(gutter);
        // 设置右边和下边的位置
        contentStyle.push(`right:${gutterValue}`);
        contentStyle.push(`bottom:${gutterValue}`);
        contentStyle.push("height:auto");
      }
      this.setData({
        wrapperStyle: wrapperStyle.join(";"),
        contentStyle: contentStyle.join(";"),
        center,
        iconSize,
        direction,
        border,
        square
      });
    },
    // 点击组件
    onClick() {
      this.triggerEvent("click");
      // 存在url则跳转页面
      const { url } = this.data;
      this.jump(url);
    }
  },
  mounted() {
    // 更新样式
    this.updateStyle();
  }
});
