Component({
  name: 'NoticeBar',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: [
    'custom-class',
    'left-icon-class',
    'wrapper-class',
    'content-class',
    'close-icon-class',
    'navigator-class'
  ],
  properties: {
    // 通告栏模式
    mode: {
      type: String,
      options: ['closeable', 'link']
    },
    // 通知文本内容
    text: {
      type: String,
      observer () {
        wx.nextTick(() => {
          this.updateStyle();
        });
      }
    },
    // 通知文本颜色
    color: String,
    // 滚动条背景
    background: String,
    // 左侧图标名称
    leftIcon: String,
    // 动画延迟时间 (s)
    delay: {
      type: Number,
      value: 0,
      observer () {
        wx.nextTick(() => {
          this.updateStyle();
        });
      }
    },
    // 滚动速率 (px/s)
    speed: {
      type: Number,
      value: 50,
      observer () {
        wx.nextTick(() => {
          this.updateStyle();
        });
      }
    },
    // 是否开启滚动播放，内容长度溢出时默认开启
    scrollable: {
      type: Boolean,
      value: true
    },
    // 是否开启文本换行，只在禁用滚动时生效
    wrapable: Boolean,
    // 跳转方式
    openType: {
      type: String,
      value: 'navigate'
    },
    // 跳转地址,`mode=link`时有效
    url: String
  },
  data: {
    // 内容区域样式
    contentStyle: '',
    // 控制是否显示
    show: true
  },
  methods: {
    // 更新样式
    updateStyle () {
      const { scrollable, speed, delay } = this.properties;
      if (scrollable) {
        // 滚动播放
        const query = this.createSelectorQuery();
        query.select('#bar-content').boundingClientRect();
        query.select('#bar-wrapper').boundingClientRect();
        query.exec((rect) => {
          // 内容区域宽度
          const contentWidth = rect[0].width || 0;
          // 整个容器的宽度
          const wrapperWidth = rect[1].width || 0;
          // 持续时间
          const duration = Math.floor(contentWidth / speed);
          // 设置动画
          const contentStyle = `transform: translateX(${Math.ceil(
            wrapperWidth
          )}px);animation-duration:${duration}s;animation-delay:${delay}s;`;
          if (contentStyle !== this.data.contentStyle) {
            this.setData({ contentStyle });
          }
        });
      } else {
        // 清除动画
        const contentStyle = 'animation: none;';
        if (contentStyle !== this.data.contentStyle) {
          this.setData({ contentStyle });
        }
      }
    },
    // 点击根节点
    onClick (event) {
      this.triggerEvent('click', event);
    },
    // 点击关闭按钮
    onClickIcon (event) {
      if (this.properties.mode === 'closeable') {
        this.setData({ show: false });
        this.triggerEvent('close', event);
      }
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
