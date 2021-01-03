import { isObj } from '../common/utils';

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  externalClasses: ['custom-class', 'active-class'],
  properties: {
    initialOptions: {
      type: Array,
      value: [],
      observer: 'updateOptionsList',
    },
    itemHeight: {
      type: Number,
      value: 44,
      observer: 'updateTranslateY',
    },
    valueKey: {
      type: String,
      value: 'text',
    },
    defaultIndex: {
      type: Number,
      value: 0,
      observer: 'updateIndex',
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
    transitionStyle: 'transition: all 300ms',
    currentIndex: 0,
    optionsList: [],
  },
  methods: {
    getValue() {
      const { currentIndex, optionsList } = this.data;
      return optionsList[currentIndex];
    },
    updateOptionsList() {
      this.setData({
        optionsList: this.properties.initialOptions,
      });
      this.updateTranslateY();
      this.updateIndex();
    },
    updateIndex() {
      let { defaultIndex } = this.properties;

      defaultIndex = this.adjustIndex(defaultIndex);
      const index = this.findNotDisabled(defaultIndex);
      if (index != null) {
        defaultIndex = index;
      }
      this.setData({
        currentIndex: defaultIndex,
      });
      this.setTransYByIndex(defaultIndex);
    },
    updateTranslateY() {
      const { itemHeight, topVisible } = this.properties;
      const { optionsList } = this.data;
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
      translateY -= offsetY;
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
        transitionStyle: 'transition: none',
      });
      this.startY = event.touches[0].clientY;
    },
    onTouchEnd() {
      this.setData({
        transitionStyle: 'transition: all 300ms',
      });
      const { translateY } = this.data;
      const len = this.data.optionsList.length;
      let index = this.getIndex(translateY);
      index = index < 0 ? 0 : index;
      index = index > len - 1 ? len - 1 : index;
      index = this.findNotDisabled(index);
      if (index != null) {
        this.setTransYByIndex(index);
        this.emitChange(index);
      }
    },
    onClick(event) {
      const index = event.currentTarget.dataset.index;
      const { optionsList } = this.data;
      if (optionsList[index] && optionsList[index].disabled) {
        return;
      }
      this.setTransYByIndex(index * 1);
      this.emitChange(index * 1);
    },
    getIndex(transY) {
      const { itemHeight, topVisible } = this.properties;
      transY -= itemHeight / 2;
      let result = (itemHeight * topVisible - transY) / itemHeight;
      const half = itemHeight / 2;
      const yu = transY % itemHeight;
      if (yu >= 0) {
        if (yu <= half) {
          result = Math.ceil(result);
        } else {
          result = Math.floor(result);
        }
      } else if (-yu < half) {
        result = Math.floor(result);
      } else {
        result = Math.ceil(result);
      }
      return result;
    },
    setTransYByIndex(index) {
      const { itemHeight } = this.properties;
      this.setData({ translateY: this.startTranslateY - index * itemHeight });
    },
    emitChange(index) {
      const { currentIndex, optionsList } = this.data;
      if (index !== currentIndex) {
        this.triggerEvent('change', {
          index,
          data: optionsList[index],
        });
        this.setData({
          currentIndex: index,
        });
      }
    },
    adjustIndex(index) {
      const { optionsList } = this.data;
      index = index < 0 ? 0 : index;
      index = index > optionsList.length - 1 ? optionsList.length - 1 : index;
      return index;
    },
    findNotDisabled(index) {
      const { optionsList } = this.data;
      for (let i = index; i < optionsList.length; i++) {
        if (!this.isDisabled(optionsList[i])) return i;
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!this.isDisabled(optionsList[i])) return i;
      }
      return null;
    },
    isDisabled(option) {
      return isObj(option) && option.disabled;
    },
    setIndex(index) {
      this.setData({
        currentIndex: index,
      });
      this.setTransYByIndex(index);
    },
    getOptionText(option) {
      const { value } = this.properties;
      return isObj(option) && value in option ? option[value] : option;
    },
    setValue(value) {
      const { optionsList } = this.data;
      for (let i = 0; i < optionsList.length; i++) {
        if (this.getOptionText(optionsList[i]) === value) {
          return this.setIndex(i);
        }
      }
      return Promise.resolve();
    },
  },
  created() {
    this.startY = 0;
    this.startTranslateY = 0;
    this.endTranslateY = 0;
  },
  attached() {},
  ready() {
    this.updateTranslateY();
    this.updateIndex();
    this.updateOptionsList();
  },
  moved() {},
  detached() {},
});
