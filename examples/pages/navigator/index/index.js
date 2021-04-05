Page({
  data: {
    navList: [
      {
        name: '基础组件',
        iconName: 'icon-jichu',
        path: '/pages/navigator/basics/index',
      },
      {
        name: '表单组件',
        iconName: 'icon-biaodan',
        path: '/pages/navigator/form/index',
      },
      {
        name: '反馈组件',
        iconName: 'icon-caozuo',
        path: '/pages/navigator/operation/index',
      },
      {
        name: '展示组件',
        iconName: 'icon-shitu',
        path: '/pages/navigator/view/index',
      },
      {
        name: '导航组件',
        iconName: 'icon-daohang',
        path: '/pages/navigator/navigation/index',
      },
      {
        name: '业务组件',
        iconName: 'icon-yewu1',
        path: '/pages/navigator/business/index',
      },
      {
        name: '更新日志',
        iconName: 'icon-rizhi',
        path: '/pages/navigator/logs/index',
      },
      {
        name: '关于',
        iconName: 'icon-guanyu',
        path: '/pages/navigator/about/index',
      },
    ],
  },
  onLoad: function () {},

  onCardClick(data) {
    if (data.detail && data.detail.path) {
      wx.navigateTo({
        url: data.detail.path,
      });
    }
  },

  onShareAppMessage: function () {},
});
