import { LinComponent } from "../common/component";
LinComponent({
  classes: ["header-class", "content-class", "footer-class"],
  props: {
    // 标题
    title: String,
    // 描述
    desc: String,
    // 状态
    status: String,
    // 是否使用 footer slot
    useFooterSlot: Boolean
  }
});
