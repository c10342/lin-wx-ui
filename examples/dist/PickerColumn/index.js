import { isObj } from '../common/utils';

Component({
  name: 'PickerColumn',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class', 'active-class'],
  properties: {
    // 一开始的数据数组，初始化用的
    initialOptions: {
      type: Array,
      value: [],
      observer: 'updateOptionsList'
    },
    // 选项高度
    itemHeight: {
      type: Number,
      value: 44,
      observer: 'updateTranslateY'
    },
    // 选项对象中，显示文字对应的 key
    textKey: {
      type: String,
      value: 'text'
    },
    // 单列选择器的默认选中项索引
    defaultIndex: {
      type: Number,
      value: 0,
      observer: 'updateIndex'
    },
    // 可见的选项个数
    visibleItemCount: {
      type: Number,
      value: 6
    },
    // 顶部可见个数
    topVisible: {
      type: Number,
      value: 2
    }
  },
  data: {
    // y轴位移距离
    translateY: 110,
    // 过渡动画样式
    transitionStyle: 'transition: all 300ms',
    // 当前选中的索引
    currentIndex: 0,
    // 数据项
    optionsList: []
  },
  methods: {
    // 获取当前选中的值
    getValue () {
      const { currentIndex, optionsList } = this.data;
      return optionsList[currentIndex];
    },
    // 更新列表项
    updateOptionsList () {
      this.setData({
        optionsList: this.properties.initialOptions
      });
      // 更新y轴位移距离
      this.updateTranslateY();
      // 更新索引
      this.updateIndex();
    },
    // 更新当前选中的索引
    updateIndex () {
      let { defaultIndex } = this.properties;
      // 判断是否越界
      defaultIndex = this.adjustIndex(defaultIndex);
      // 判断选中的选项是否被禁用了，禁用了就往后找，后面找不到了在返回来往前找
      const index = this.findNotDisabled(defaultIndex);
      if (index != null) {
        defaultIndex = index;
      }
      this.setData({
        currentIndex: defaultIndex
      });
      // 根据索引找出对应的选项，计算出y轴位移距离，并更新
      this.setTransYByIndex(defaultIndex);
    },
    // 相关数据发生变化之后，需要更新y轴位移距离
    updateTranslateY () {
      const { itemHeight, topVisible } = this.properties;
      const { optionsList } = this.data;
      // 默认第一个选项，itemHeight / 2 是因为垂直方向要居中
      const translateY = itemHeight * topVisible + itemHeight / 2;
      // 向下，最小的y轴的位移距离
      this.startTranslateY = translateY;
      // 向上，最大的y轴的位移距离
      this.endTranslateY = translateY - optionsList.length * itemHeight;
      this.setData({
        translateY
      });
    },
    // 手指在屏幕上的移动事件
    onTouchMove (event) {
      let { translateY } = this.data;
      const { itemHeight } = this.properties;
      // 终点位置
      const endY = event.touches[0].clientY;
      // 计算出位移差
      const offsetY = this.startY - endY;
      // 计算出y轴的位移距离
      translateY -= offsetY;
      this.startY = endY;
      // 检查是否越界
      if (translateY >= this.startTranslateY + itemHeight) {
        translateY = this.startTranslateY + itemHeight;
      } else if (translateY <= this.endTranslateY) {
        translateY = this.endTranslateY;
      }
      this.setData({
        translateY
      });
    },
    // 手指刚触碰到屏幕
    onTouchStart (event) {
      // 取消过渡动画
      this.setData({
        transitionStyle: 'transition: none'
      });
      // 记录起始位置
      this.startY = event.touches[0].clientY;
    },
    // 手指抬起，触摸事件结束
    onTouchEnd () {
      // 恢复过渡动画
      this.setData({
        transitionStyle: 'transition: all 300ms'
      });
      const { translateY } = this.data;
      const len = this.data.optionsList.length;
      // 根据y轴的位移距离算出是那个索引
      let index = this.getIndex(translateY);
      // 判断是否越界
      index = index < 0 ? 0 : index;
      index = index > len - 1 ? len - 1 : index;
      // 找出没有被禁用的数据项
      index = this.findNotDisabled(index);
      if (index != null) {
        // 根据索引，计算出y轴的位移距离
        this.setTransYByIndex(index);
        // 发射change事件
        this.emitChange(index);
      }
    },
    // 点击某一个选项
    onClick (event) {
      // 点击的选项索引
      const index = event.currentTarget.dataset.index;
      const { optionsList } = this.data;
      if (optionsList[index] && optionsList[index].disabled) {
        // 被禁用了则不做处理
        return;
      }
      // 根据索引，计算出y轴的位移距离
      this.setTransYByIndex(index * 1);
      // 发射change事件
      this.emitChange(index * 1);
    },
    // 根据y轴的位移距离计算出index索引
    getIndex (transY) {
      const { itemHeight, topVisible } = this.properties;
      // 因为垂直方向已经是居中了，所以要恢复没有居中的时候
      transY -= itemHeight / 2;
      // 比如，itemHeight为50，topVisible为2，中间距离顶部距离（itemHeight * topVisible）是100，若当前选中的是索引的1，即transY为50,(100-50)/50=1,即得出索引为1
      let result = (itemHeight * topVisible - transY) / itemHeight;
      const half = itemHeight / 2;
      // 取余数，即距离选中的索引偏离了多少，比如，当前索引为1，transY应该是50，但是不是百分百准确，特别是手指移动改变的时候，transY可能是51,52等数值。假设transY为56，则偏移了6px
      // 如果偏移量超过选项高度的一半，则需要选中下一个选项，index索引加一，假设transY为80，则偏移了30px，此时索引应该改变为2
      const yu = transY % itemHeight;
      if (yu >= 0) {
        // 余数大于0
        if (yu <= half) {
          // 小于选项高度的一半，向下取整
          result = Math.ceil(result);
        } else {
          result = Math.floor(result);
        }
      } else if (-yu < half) {
        // 余数小于0
        result = Math.floor(result);
      } else {
        result = Math.ceil(result);
      }
      return result;
    },
    // 根据索引设置y轴的位移距离
    setTransYByIndex (index) {
      const { itemHeight } = this.properties;
      this.setData({ translateY: this.startTranslateY - index * itemHeight });
    },
    // 发射change事件
    emitChange (index) {
      const { currentIndex, optionsList } = this.data;
      if (index !== currentIndex) {
        this.triggerEvent('change', {
          index,
          data: optionsList[index]
        });
        this.setData({
          currentIndex: index
        });
      }
    },
    // 调整index索引，防止越界
    adjustIndex (index) {
      const { optionsList } = this.data;
      index = index < 0 ? 0 : index;
      index = index > optionsList.length - 1 ? optionsList.length - 1 : index;
      return index;
    },
    // 根据传入的索引，找出没有被禁用选项
    findNotDisabled (index) {
      const { optionsList } = this.data;
      // 先往后找
      for (let i = index; i < optionsList.length; i++) {
        if (!this.isDisabled(optionsList[i])) return i;
      }
      // 再往前找
      for (let i = index - 1; i >= 0; i--) {
        if (!this.isDisabled(optionsList[i])) return i;
      }
      return null;
    },
    // 判断是否被禁用
    isDisabled (option) {
      return isObj(option) && option.disabled;
    },
    // 设置当前索引
    setIndex (index) {
      this.setData({
        currentIndex: index
      });
      this.setTransYByIndex(index);
    },
    // 获取文本值
    getOptionText (option) {
      const { textKey } = this.properties;
      return isObj(option) && textKey in option ? option[textKey] : option;
    },
    // 设置选中的值
    setValue (value) {
      const { optionsList } = this.data;
      for (let i = 0; i < optionsList.length; i++) {
        // 查找是否有选中的
        if (this.getOptionText(optionsList[i]) === value) {
          return this.setIndex(i);
        }
      }
      return Promise.resolve();
    }
  },
  created () {
    // 手指触摸的起始位置
    this.startY = 0;
    // 向下，最小的y轴的位移距离
    this.startTranslateY = 0;
    // 向上，最大的y轴的位移距离
    this.endTranslateY = 0;
  },
  attached () {},
  ready () {
    this.updateTranslateY();
    this.updateIndex();
    this.updateOptionsList();
  },
  moved () {},
  detached () {}
});
