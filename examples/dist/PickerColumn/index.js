Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ["custom-class"],
  properties: {
    optionsList: {
      type: Array,
      value: [],
    },
    itemHeight: {
      type: Number,
      value: 44,
      observer: "updateTranslateY",
    },
    valueKey: {
      type: String,
      value: "text",
    },
    defaultIndex: {
      type: Number,
      value: 0,
      observer: "updateIndex",
    },
    visibleItemCount: {
      type: Number,
      value: 6,
    },
    topVisible: {
      type: Number,
      value: 2,
    },
  },
  data: {
    translateY: 110,
    transitionStyle: "transition: all 300ms",
    currentIndex: 0,
  },
  methods: {
    updateIndex() {
      let { defaultIndex, optionsList } = this.properties;
      defaultIndex = defaultIndex < 0 ? 0 : defaultIndex;
      defaultIndex =
        defaultIndex > optionsList.length - 1
          ? optionsList.length - 1
          : defaultIndex;
      this.setData({
        currentIndex: defaultIndex,
      });
      this.setTransYByIndex(defaultIndex);
    },
    updateTranslateY() {
      const { itemHeight, optionsList, topVisible } = this.properties;
      const translateY = itemHeight * topVisible + itemHeight / 2;
      this.startTranslateY = translateY;
      this.endTranslateY = translateY - optionsList.length * itemHeight;
      this.setData({
        translateY,
      });
    },
    onTouchMove(event) {
      let { translateY } = this.data;
      const { itemHeight } = this.properties;
      const endY = event.touches[0].clientY;
      const offsetY = this.startY - endY;
      translateY = translateY - offsetY;
      this.startY = endY;
      if (translateY >= this.startTranslateY + itemHeight) {
        translateY = this.startTranslateY + itemHeight;
      } else if (translateY <= this.endTranslateY) {
        translateY = this.endTranslateY;
      }
      this.setData({
        translateY,
      });
    },
    onTouchStart(event) {
      this.setData({
        transitionStyle: "transition: none",
      });
      this.startY = event.touches[0].clientY;
    },
    onTouchEnd() {
      this.setData({
        transitionStyle: "transition: all 300ms",
      });
      const { translateY } = this.data;
      const len = this.properties.optionsList.length;
      let index = this.getIndex(translateY);
      index = index < 0 ? 0 : index;
      index = index > len - 1 ? len - 1 : index;
      this.setTransYByIndex(index);
      this.emitChange(index);
    },
    onClick(event) {
      const index = event.currentTarget.dataset.index;
      this.setTransYByIndex(index * 1);
      this.emitChange(index * 1);
    },
    getIndex(transY) {
      const { itemHeight, topVisible } = this.properties;
      transY = transY - itemHeight / 2;
      let result = (itemHeight * topVisible - transY) / itemHeight;
      const half = itemHeight / 2;
      const yu = transY % itemHeight;
      if (yu >= 0) {
        if (yu <= half) {
          result = Math.ceil(result);
        } else {
          result = Math.floor(result);
        }
      } else {
        if (-yu < half) {
          result = Math.floor(result);
        } else {
          result = Math.ceil(result);
        }
      }
      return result;
    },
    setTransYByIndex(index) {
      const { itemHeight } = this.properties;
      this.setData({ translateY: this.startTranslateY - index * itemHeight });
    },
    emitChange(index) {
      const { currentIndex } = this.data;
      const { optionsList } = this.properties;
      if (index !== currentIndex) {
        this.triggerEvent("change", {
          index,
          data: optionsList[index],
        });
        this.setData({
          currentIndex: index,
        });
      }
    },
  },
  created: function() {},
  attached: function() {},
  ready: function() {
    this.startY = 0;
    this.startTranslateY = 0;
    this.endTranslateY = 0;
    this.updateTranslateY();
    this.updateIndex();
  },
  moved: function() {},
  detached: function() {},
});
