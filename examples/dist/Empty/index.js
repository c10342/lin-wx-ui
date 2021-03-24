import { emptyCompImages } from '../common/config';

const typeOpt = ['error', 'network', 'search', 'default'];

Component({
  name: 'Empty',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: [
    'custom-class',
    'image-wrapper-class',
    'image-class',
    'description-class',
    'bottom-class'
  ],
  properties: {
    // 状态类型
    type: {
      type: String,
      value: 'default',
      options: typeOpt,
      observer: 'updateImage'
    },
    // 自定义图片地址，优先级比type高
    image: {
      type: String,
      observer: 'updateImage'
    },
    // 图片下方的描述文字
    description: String,
    // 是否使用图片插槽
    useImageSlot: Boolean,
    // 是否使用描述文字插槽
    useDescSlot: Boolean
  },
  data: {
    // 图片地址
    imageUrl: ''
  },
  methods: {
    // 更新图片地址
    updateImage () {
      const { image, type } = this.properties;
      let imageUrl;
      if (image) {
        imageUrl = image;
      } else {
        // 找出type对应的图片地址
        const index = typeOpt.findIndex((item) => item === type);
        if (index > -1) {
          imageUrl = emptyCompImages[type];
        }
      }
      if (imageUrl) {
        this.setData({
          imageUrl
        });
      }
    }
  },
  created () {},
  attached () {},
  ready () {
    this.updateImage();
  },
  moved () {},
  detached () {}
});
