Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ["custom-class", "image-class", "error-class"],
  properties: {
    imageUrl: {
      type: Array,
      value: [],
      observer() {
        this.getImageSrc();
      },
    },
    width: {
      type: String,
      value: "320px",
      observer: "setStyle",
    },
    height: {
      type: String,
      value: "240px",
      observer: "setStyle",
    },
    useErrorSlot: {
      type: Boolean,
      value: false,
    },
    errorTip: {
      type: String,
      value: "",
    },
    radius: {
      type: String,
      observer: "setStyle",
    },
    round: {
      type: String,
      value: false,
      observer: "setStyle",
    },
    mode: {
      type: String,
      value: "scaleToFill",
    },
    webp: {
      type: Boolean,
      value: false,
    },
    lazyLoad: {
      type: Boolean,
      value: false,
    },
    showMenuByLongpress: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    src: "",
    index: -1,
    errorMessage: [],
    isError: false,
    viewStyle: "",
  },
  methods: {
    setStyle() {
      'width:{{width}};height:{{height}};border-radius:{{round?"50%":radius}};';
      let style = "";
      const { width, height, round, radius } = this.properties;
      if (width) {
        style += `width:${width};`;
      }
      if (height) {
        style += `height:${height};`;
      }
      if (round) {
        style += `border-radius:50%;`;
      } else if (radius) {
        style += `border-radius:${radius};`;
      }
      this.setData({ viewStyle: style });
    },
    getImageSrc() {
      const val = this.properties.imageUrl;
      if (val.length > 0) {
        let index = this.data.index;
        while (index < val.length - 1) {
          index++;
          let src = val[index];
          this.setData({ index });
          if (src) {
            this.setData({ src: val[index] });
            break;
          }
        }
      } else {
        this.setData({ isError: true });
      }
    },
    onError(event) {
      const errorMessage = this.data.errorMessage;
      errorMessage.push({
        index: this.data.index,
        src: this.data.src,
        event,
      });
      this.setData({
        errorMessage,
      });
      if (this.data.index === this.properties.imageUrl.length - 1) {
        this.setData({ isError: true });
        this.triggerEvent("error", errorMessage);
      } else {
        this.getImageSrc();
      }
    },
    onLoad(event) {
      this.triggerEvent("success", {
        index: this.data.index,
        src: this.data.src,
        event,
      });
    },
  },
});
