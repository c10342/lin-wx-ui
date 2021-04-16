import { getSystemInfoSync, getRect } from '../common/utils';
import defaulrProps from './props';

// 存储组件实例对象
let ARRAY = [];

Component({
  name: 'DropdownMenu',
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class', 'wrapper-class', 'item-class'],
  relations: {
    '../DropdownItem/index': {
      type: 'descendant',
      linked(child) {
        // 当有子组件插入进来，就更新数据
        this.children = this.children || [];
        this.children.push(child);
        this.updateItemListData();
      },
      unlinked(child) {
        this.children = (this.children || []).filter((it) => it !== child);
        this.updateItemListData();
      }
    }
  },
  properties: {
    // 菜单标题和选项的选中态颜色
    activeColor: {
      type: String,
      value: defaulrProps.activeColor,
      observer: 'updateChildrenData'
    },
    // 菜单栏 z-index 层级
    zIndex: {
      type: Number,
      value: 10
    },
    // 动画时长，单位毫秒
    duration: {
      type: Number,
      value: defaulrProps.duration,
      observer: 'updateChildrenData'
    },
    // 菜单展开方向
    direction: {
      type: String,
      value: defaulrProps.direction,
      options: ['down', 'up'],
      observer: 'updateChildrenData'
    },
    // 是否显示遮罩层
    mask: {
      type: Boolean,
      value: defaulrProps.mask,
      observer: 'updateChildrenData'
    },
    // 是否在点击遮罩层后关闭菜单
    closeOnClickMask: {
      type: Boolean,
      value: defaulrProps.closeOnClickMask,
      observer: 'updateChildrenData'
    },
    // 是否在点击外部 menu 后关闭菜单
    closeOnClickOutside: {
      type: Boolean,
      value: true
    }
  },
  data: {
    // 存储子组件的数据信息
    itemListData: []
  },
  methods: {
    // 点击标题
    onTitleTap(event) {
      // 获取点击的是第几个
      const index = event.currentTarget.dataset.index;
      const child = this.children[index];
      if (!child.properties.disabled) {
        // 没有被禁用
        // 遍历页面上的所有该组件
        ARRAY.forEach((menuItem) => {
          // 关闭其他组件弹出层
          if (
            menuItem &&
            menuItem.properties.closeOnClickOutside &&
            menuItem !== this
          ) {
            menuItem.close();
          }
        });
        // 切换弹出层显示/隐藏
        this.toggleItem(index);
      }
    },
    // 关闭所有弹出层
    close() {
      (this.children || []).forEach((child) => {
        child.hide(true);
      });
    },
    // 切换弹出层显示/隐藏
    toggleItem(activeIndex) {
      (this.children || []).forEach((child, index) => {
        const { showPopup } = child.data;
        if (index === activeIndex) {
          // 当前索引就是点击的，就切换隐藏/显示
          child.toggle();
        } else if (showPopup) {
          // 其他的就全部隐藏
          child.hide(true);
        }
      });
    },
    // 子组件DropdownItem数据发生变化，就需要更新数据
    updateItemListData() {
      this.setData({
        itemListData: this.children.map((child) => child.data)
      });
    },
    // 父组件（就是该组件）数据发生变化，就需要更新子组件DropdownItem
    updateChildrenData() {
      (this.children || []).forEach((child) => {
        child.updateDataFromParent();
      });
    },
    // 获取子组件固定定位的样式数据
    getChildWrapperStyle() {
      const { zIndex, direction } = this.properties;
      return getRect(this, '.lin-dropdown-menu-bar-wrapper').then((rect) => {
        // 组件距离顶部和底部的距离
        const { top = 0, bottom = 0 } = rect;
        let wrapperStyle = `z-index:${zIndex};`;
        if (direction === 'down') {
          // 向下展开
          wrapperStyle += `top:${bottom}px;`;
        } else {
          // 向上展开
          wrapperStyle += `bottom:${this.windowHeight - top}px`;
        }
        return wrapperStyle;
      });
    }
  },
  created() {},
  attached() {},
  ready() {
    // 获取窗口高度
    const { windowHeight } = getSystemInfoSync();
    this.windowHeight = windowHeight;
    // 存储组件实例对象
    ARRAY.push(this);
  },
  moved() {},
  detached() {
    // 移除组件实例对象
    ARRAY = ARRAY.filter((item) => item !== this);
  }
});
