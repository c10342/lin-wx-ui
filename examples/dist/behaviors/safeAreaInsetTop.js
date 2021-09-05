import { getSystemInfoSync } from "../common/utils";
const SafeAreaInsetTopBehavior = Behavior({
  properties: {
    // 是否留出顶部安全距离（状态栏高度）
    safeAreaInsetTop: {
      type: Boolean,
      value: false
    }
  },
  data: {
    // 状态栏高度
    statusBarHeight: "0px"
  },
  ready() {
    // 获取状态栏高度
    const { statusBarHeight } = getSystemInfoSync();
    this.setData({
      statusBarHeight: `${statusBarHeight}px`
    });
  }
});
export default SafeAreaInsetTopBehavior;
