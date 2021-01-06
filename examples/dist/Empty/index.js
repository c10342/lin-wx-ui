import { emptyCompImages } from '../common/config';

const typeOpt = ['error', 'network', 'search', 'default'];

Component({
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
    type: {
      type: String,
      value: 'default',
      options: typeOpt,
      observer: 'updateImage'
    },
    image: {
      type: String,
      observer: 'updateImage'
    },
    description: String,
    useImageSlot: Boolean,
    useDescSlot: Boolean
  },
  data: {
    imageUrl: ''
  },
  methods: {
    updateImage () {
      const { image, type } = this.properties;
      let imageUrl;
      if (image) {
        imageUrl = image;
      } else {
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
