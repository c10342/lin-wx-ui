
import { addUnit } from '../common/utils';
Component({
  options: {
    addGlobalClass: true
  },
  externalClasses: ['custom-class', 'image-class', 'error-class', 'loading-class'],
  properties: {
    imageUrl: {
      type: Array,
      value: [],
      observer () {
        this.getImageSrc();
      }
    },
    width: {
      type: [String, Number],
      value: '320px',
      observer: 'setStyle'
    },
    height: {
      type: [String, Number],
      value: '240px',
      observer: 'setStyle'
    },
    useErrorSlot: {
      type: Boolean,
      value: false
    },
    errorTip: {
      type: String,
      value: ''
    },
    radius: {
      type: [String, Number],
      observer: 'setStyle'
    },
    round: {
      type: Boolean,
      value: false,
      observer: 'setStyle'
    },
    mode: {
      type: String,
      value: 'scaleToFill'
    },
    webp: {
      type: Boolean,
      value: false
    },
    lazyLoad: {
      type: Boolean,
      value: false
    },
    showMenuByLongpress: {
      type: Boolean,
      value: false
    },
    showLoading: {
      type: Boolean,
      value: true
    },
    loadingSize: {
      type: [String, Number]
    },
    loadingColor: {
      type: [String, Number]
    },
    useLoadingSlot: {
      type: Boolean,
      value: false
    }
  },
  data: {
    src: '',
    index: -1,
    errorMessage: [],
    isError: false,
    viewStyle: '',
    isLoading: true
  },
  methods: {
    setStyle () {
      let style = '';
      const {
        width, height, round, radius
      } = this.properties;
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
    getImageSrc () {
      const val = this.properties.imageUrl;
      if (val.length > 0) {
        let index = this.data.index;
        while (index < val.length - 1) {
          index++;
          const src = val[index];
          this.setData({ index });
          if (src) {
            this.setData({ src: val[index], isLoading: true });
            break;
          }
        }
      } else {
        this.setData({ isError: true, isLoading: false });
      }
    },
    onError (event) {
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
        this.setData({ isError: true, isLoading: false });
        this.triggerEvent('error', errorMessage);
      } else {
        this.getImageSrc();
      }
    },
    onLoad (event) {
      this.triggerEvent('success', {
        index: this.data.index,
        src: this.data.src,
        event
      });
      this.setData({
        isLoading: false
      });
    },
    onClick (event) {
      this.triggerEvent('click', event);
    }
  }
});
