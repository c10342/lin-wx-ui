const ButtonBehavior = Behavior({
  properties: {
    // 标识符
    id: String,
    // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
    lang: String,
    // 客服消息子商户
    businessId: Number,
    // 会话来源
    sessionFrom: String,
    // 会话内消息卡片标题
    sendMessageTitle: String,
    // 会话内消息卡片点击跳转小程序路径
    sendMessagePath: String,
    // 当前分享路径
    sendMessageImg: String,
    // 显示会话内消息卡片
    showMessageCard: Boolean,
    // 打开 APP 时，向 APP 传递的参数
    appParameter: String,
    // 无障碍访问
    ariaLabel: String
  }
});

export default ButtonBehavior;
