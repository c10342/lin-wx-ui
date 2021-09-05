import { LinComponent } from "../common/component";
import LinkBehavior from "../behaviors/link";
import OpenTypeBehavior from "../behaviors/open-type";
import ButtonBehavior from "../behaviors/button";

LinComponent({
  mixins: [LinkBehavior, OpenTypeBehavior, ButtonBehavior],
  classes: ["icon-class", "text-class"],
  props: {
    // 按钮文字
    text: String,
    // 图标名称
    icon: String,
    // 图标右上角提示信息
    info: {
      type: [String, Number]
    },
    // 是否显示右上角小红点
    dot: Boolean,
    // 点击后跳转的链接地址
    url: String,
    // 是否显示为加载状态
    loading: Boolean,
    // 是否禁用按钮
    disabled: Boolean
  },
  methods: {
    // 点击组件
    onClick() {
      this.triggerEvent("click");
      // 跳转页面
      const { url } = this.data;
      this.jump(url);
    }
  }
});
