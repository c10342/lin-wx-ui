const typeOpt = ["error", "network", "search", "default"];

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ["custom-class",'image-wrapper-class','image-class','description-class','bottom-class'],
  properties: {
    type: {
      type: String,
      value: "default",
      options: typeOpt,
      observer: "updateImage",
    },
    image: {
      type: String,
      observer: "updateImage",
    },
    description: String,
    useImageSlot: Boolean,
    useDescSlot: Boolean,
  },
  data: {
    imageUrl: "",
  },
  methods: {
    updateImage() {
      const { image, type } = this.properties;
      let imageUrl;
      if (image) {
        imageUrl = image;
      } else {
        const index = typeOpt.findIndex((item) => item === type);
        if (index > -1) {
          imageUrl = `./images/${type}.png`;
        }
      }
      if (imageUrl) {
        this.setData({
          imageUrl,
        });
      }
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {
    this.updateImage()
  },
  moved: function() {},
  detached: function() {},
});
