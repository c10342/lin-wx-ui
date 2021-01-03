import defaultProps from '../DropdownMenu/props';

Component({
  relations: {
    '../DropdownMenu/index': {
      type: 'ancestor',
      linked(parent) {
        this.parent = parent;
        this.updateDataFromParent();
      },
      unlinked() {
        this.parent = null;
      },
    },
  },
  externalClasses: ['custom-class', 'item-class'],
  properties: {
    value: {
      type: null,
      observer: 'rerender',
    },
    title: {
      type: String,
      observer: 'rerender',
    },
    options: {
      type: Array,
      value: [],
      observer: 'rerender',
    },
    disabled: Boolean,
    titleClass: {
      type: String,
      observer: 'rerender',
    },
    popupStyle: String,
  },
  data: {
    wrapperStyle: '',
    showPopup: false,
    showWrapper: false,
    transition: false,
    activeColor: defaultProps.activeColor,
    duration: defaultProps.duration,
    direction: defaultProps.direction,
    mask: defaultProps.mask,
    closeOnClickMask: defaultProps.closeOnClickMask,
  },
  methods: {
    onOptionTap(event) {
      const option = event.currentTarget.dataset.option;
      const { value } = option;
      const shouldEmitChange = this.properties.value !== value;
      this.triggerEvent('close');
      this.setData({
        transition: true,
        showPopup: false,
      });
      this.rerender();
      if (shouldEmitChange) {
        this.triggerEvent('change', value);
      }
    },
    onOpen() {
      this.triggerEvent('open');
    },
    onClose() {
      this.triggerEvent('close');
    },
    onOpened() {
      this.triggerEvent('opended');
    },
    onClosed() {
      this.triggerEvent('closed');
      this.setData({ showWrapper: false, showPopup: false });
    },
    rerender() {
      wx.nextTick(() => {
        if (this.parent) {
          this.parent.updateItemListData();
        }
      });
    },
    onMaskClose() {
      this.toggle();
    },
    toggle(immediate = false) {
      const { showPopup } = this.data;
      if (showPopup) {
        this.hide(immediate);
      } else {
        this.show(immediate);
      }
    },
    hide(immediate = false) {
      const { showPopup } = this.data;
      if (showPopup === false) {
        return;
      }
      this.setData({
        transition: !immediate,
        showPopup: false,
      });
      this.rerender();
    },
    show(immediate = false) {
      const { showPopup } = this.data;
      if (showPopup === true) {
        return;
      }
      this.setData({
        showPopup: true,
        transition: !immediate,
      });
      if (this.parent) {
        this.parent.getChildWrapperStyle().then((wrapperStyle) => {
          this.setData({
            wrapperStyle,
            showWrapper: true,
          });
          this.rerender();
        });
      }
    },
    updateDataFromParent() {
      if (this.parent) {
        const {
          activeColor,
          duration,
          direction,
          mask,
          closeOnClickMask,
        } = this.parent.properties;
        this.setData({
          activeColor,
          duration,
          direction,
          mask,
          closeOnClickMask,
        });
      }
    },
  },
  created() {},
  attached() {},
  ready() {},
  moved() {},
  detached() {},
});
