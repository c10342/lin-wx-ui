import { getRect } from '../common/utils';

Component({
  name: 'Progress',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class', 'portion-class', 'pivot-class'],
  properties: {
    // 是否置灰
    inactive: {
      type: Boolean,
      value: false
    },
    // 进度百分比
    percentage: {
      type: Number,
      value: 0,
      observer: 'setProgressWidth'
    },
    // 进度条粗细，默认单位为 px
    strokeWidth: {
      type: [String, Number]
    },
    // 是否显示进度文字
    showPivot: {
      type: Boolean,
      value: true
    },
    // 进度条颜色
    color: String,
    // 进度文字颜色
    textColor: String,
    // 轨道颜色
    trackColor: String,
    // 文字显示
    pivotText: {
      type: String,
      value: '',
      observer: 'setProgressWidth'
    },
    // 文字背景色
    pivotColor: String
  },
  data: {
    // 进度条长度
    progressWidth: '0px',
    // 进度条文字位置
    pivotRight: '0px',
    // 置灰后的颜色
    grayColor: 'rgb(202, 202, 202)'
  },
  methods: {
    // 设置进度条长度
    setProgressWidth() {
      let { percentage } = this.properties;
      // 处理临界值
      if (percentage <= 0) {
        percentage = 0;
      } else if (percentage >= 100) {
        percentage = 100;
      }
      // 计算进度条长度
      const offsetWidth = this.progressWidth * (percentage / 100);
      this.setData({ progressWidth: `${offsetWidth}px` });
      wx.nextTick(async () => {
        // 获取文字宽度
        const { width: pivotWidth } = await getRect(
          this,
          '.lin-progress-pivot'
        );
        let pivotRight = 0;
        // 调整文字的位置
        if (offsetWidth + pivotWidth / 2 >= this.progressWidth) {
          // 超过进度条最长长度
          // 靠右放
          pivotRight = 0;
        } else if (offsetWidth <= pivotWidth / 2) {
          // 在开始的位置
          // 靠左显示
          pivotRight = offsetWidth - pivotWidth;
        } else {
          // 居中显示
          pivotRight = -(pivotWidth / 2);
        }
        this.setData({
          pivotRight: `${pivotRight}px`
        });
      });
    }
  },
  created() {
    this.progressWidth = 0;
  },
  attached() {},
  ready() {
    getRect(this, '.lin-progress').then((res) => {
      // 获取进度条整体宽度
      this.progressWidth = res.width;
      // 设置进度条宽度
      this.setProgressWidth();
    });
  },
  moved() {},
  detached() {}
});
