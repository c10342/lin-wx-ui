import { getSystemInfoSync } from '../common/utils';
import defaulrProps from './props';

let ARRAY = [];

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    '../DropdownItem/index': {
      type: 'descendant',
      linked(child) {
        this.children = this.children || [];
        this.children.push(child);
        this.updateItemListData();
      },
      unlinked(child) {
        this.children = (this.children || []).filter((it) => it !== child);
        this.updateItemListData();
      },
    },
  },
  externalClasses: ['custom-class', 'wrapper-class', 'item-class'],
  properties: {
    activeColor: {
      type: String,
      value: defaulrProps.activeColor,
      observer: 'updateChildrenData',
    },
    zIndex: {
      type: Number,
      value: 10,
    },
    duration: {
      type: Number,
      value: defaulrProps.duration,
      observer: 'updateChildrenData',
    },
    direction: {
      type: String,
      value: defaulrProps.direction,
      options: ['down', 'up'],
      observer: 'updateChildrenData',
    },
    mask: {
      type: Boolean,
      value: defaulrProps.mask,
      observer: 'updateChildrenData',
    },
    closeOnClickMask: {
      type: Boolean,
      value: defaulrProps.closeOnClickMask,
      observer: 'updateChildrenData',
    },
    closeOnClickOutside: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    itemListData: [],
  },
  methods: {
    onTitleTap(event) {
      const index = event.currentTarget.dataset.index;
      const child = this.children[index];
      if (!child.properties.disabled) {
        ARRAY.forEach((menuItem) => {
          if (
            menuItem
            && menuItem.properties.closeOnClickOutside
            && menuItem !== this
          ) {
            menuItem.close();
          }
        });
        this.toggleItem(index);
      }
    },
    close() {
      (this.children || []).forEach((child) => {
        child.hide(true);
      });
    },
    toggleItem(activeIndex) {
      (this.children || []).forEach((child, index) => {
        const { showPopup } = child.data;
        if (index === activeIndex) {
          child.toggle();
        } else if (showPopup) {
          child.hide(true);
        }
      });
    },
    updateItemListData() {
      this.setData({
        itemListData: this.children.map((child) => child.data),
      });
    },
    updateChildrenData() {
      (this.children || []).forEach((child) => {
        child.updateDataFromParent();
      });
    },
    getChildWrapperStyle() {
      const { zIndex, direction } = this.properties;
      return new Promise((resolve) => {
        const query = this.createSelectorQuery();
        query.select('.lin-dropdown-menu-bar-wrapper').boundingClientRect();
        query.exec((rect) => {
          const { top = 0, bottom = 0 } = rect[0];
          let wrapperStyle = `z-index:${zIndex};`;
          if (direction === 'down') {
            wrapperStyle += `top:${bottom}px;`;
          } else {
            wrapperStyle += `bottom:${this.windowHeight - top}px`;
          }

          resolve(wrapperStyle);
        });
      });
    },
  },
  created() {},
  attached() {},
  ready() {
    const { windowHeight } = getSystemInfoSync();
    this.windowHeight = windowHeight;
    ARRAY.push(this);
  },
  moved() {},
  detached() {
    ARRAY = ARRAY.filter((item) => item !== this);
  },
});
