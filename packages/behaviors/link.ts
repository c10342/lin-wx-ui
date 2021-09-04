import { isUndef } from "../common/is";

const LinkBehavior = Behavior({
  properties: {
    // 链接跳转类型
    linkType: {
      type: String,
      value: "navigateTo",
      options: ["navigateTo", "redirectTo", "switchTab", "reLaunch"]
    }
  },
  methods: {
    // 跳转页面
    jump(url: string | null | undefined) {
      if (!isUndef(url)) {
        const { linkType } = this.properties;
        wx[linkType]({ url });
      }
    }
  }
});
export default LinkBehavior;
