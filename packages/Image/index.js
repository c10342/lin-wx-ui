import { addUnit } from '../common/utils';
Component({
  name: 'Image',
  options: {
    addGlobalClass: true
  },
  externalClasses: [
    'custom-class',
    'image-class',
    'error-class',
    'loading-class'
  ],
  properties: {
    // 图片地址，传入一个数组，第一个图片加载失败就回去加载下一个，如此类推直到全部加载失败
    imageUrl: {
      type: Array,
      value: [],
      observer() {
        this.getImageSrc();
      }
    },
    // 宽度，默认单位 px
    width: {
      type: [String, Number],
      value: '320px',
      observer: 'setStyle'
    },
    // 高度，默认单位 px
    height: {
      type: [String, Number],
      value: '240px',
      observer: 'setStyle'
    },
    // 是否使用 error 插槽
    useErrorSlot: {
      type: Boolean,
      value: false
    },
    // 错误提示
    errorTip: {
      type: String,
      value: ''
    },
    // 圆角大小，默认单位为 px
    radius: {
      type: [String, Number],
      observer: 'setStyle'
    },
    // 是否显示为圆形
    round: {
      type: Boolean,
      value: false,
      observer: 'setStyle'
    },
    // 图片填充模式
    mode: {
      type: String,
      value: 'scaleToFill'
    },
    // 默认不解析 webP 格式，只支持网络资源
    webp: {
      type: Boolean,
      value: false
    },
    // 是否懒加载
    lazyLoad: {
      type: Boolean,
      value: false
    },
    // 是否开启长按图片显示识别小程序码菜单
    showMenuByLongpress: {
      type: Boolean,
      value: false
    },
    // 是否展示图片加载中提示
    showLoading: {
      type: Boolean,
      value: true
    },
    // 加载组件大小
    loadingSize: {
      type: [String, Number]
    },
    // 加载组件颜色
    loadingColor: {
      type: [String, Number]
    },
    // useLoadingSlot
    useLoadingSlot: {
      type: Boolean,
      value: false
    }
  },
  data: {
    // 图片地址
    src: '',
    // 正在加载第几张图片
    index: -1,
    // 存储加载失败的错误信息
    errorMessage: [],
    // 是否显示错误占位符
    isError: false,
    // 根节点样式
    viewStyle: '',
    // 是否正在加载中
    isLoading: true
  },
  methods: {
    // 设置样式
    setStyle() {
      let style = '';
      const { width, height, round, radius } = this.properties;
      if (width) {
        style += `width:${addUnit(width)};`;
      }
      if (height) {
        style += `height:${addUnit(height)};`;
      }
      if (round) {
        style += 'border-radius:50%;';
      } else if (radius) {
        style += `border-radius:${addUnit(radius)};`;
      }
      this.setData({ viewStyle: style });
    },
    // 获取图片地址
    getImageSrc() {
      const val = this.properties.imageUrl;
      if (val.length > 0) {
        // 当前是第几张图片
        let index = this.data.index;
        // 标志位，标志是否有找到不为空的图片地址
        let isNull = true;
        while (index < val.length - 1) {
          index++;
          const src = val[index];
          this.setData({ index });
          if (src) {
            isNull = false;
            // 存在图片地址
            this.setData({ src: val[index], isLoading: true });
            break;
          }
        }
        if (index === this.properties.imageUrl.length - 1 && isNull) {
          // 图片索引已经是最后的了并且找不到不为空的图片地址
          this.setErrorImageData(this.data.errorMessage);
        }
      } else {
        this.setData({ isError: true, isLoading: false });
      }
    },
    // 加载失败错误回调
    onError(event) {
      // 错误信息
      const errorMessage = this.data.errorMessage;
      errorMessage.push({
        index: this.data.index,
        src: this.data.src,
        event
      });
      this.setData({
        errorMessage
      });
      if (this.data.index === this.properties.imageUrl.length - 1) {
        // 最后一张图片加载失败
        this.setErrorImageData(errorMessage);
      } else {
        // 不是最后一张
        this.getImageSrc();
      }
    },
    // 设置图片加载失败相关内容
    setErrorImageData(errorMessage) {
      this.setData({ isError: true, isLoading: false });
      this.triggerEvent('error', errorMessage);
    },
    // 加载成功回调
    onLoad(event) {
      this.triggerEvent('success', {
        index: this.data.index,
        src: this.data.src,
        event
      });
      // 关闭loading
      this.setData({
        isLoading: false
      });
    },
    // 点击图片
    onClick(event) {
      this.triggerEvent('click', event);
    }
  }
});
