import { LinComponent } from "../common/component";

LinComponent({
  classes: [
    "title-class",
    "input-container-class",
    "input-item-class",
    "num-container-class",
    "num-row-class",
    "num-item-class"
  ],
  props: {
    // 是否为 iPhoneX 留出底部安全距离
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    // 是否显示
    show: {
      type: Boolean,
      value: false
    },
    // 是否在点击选项后关闭
    closeOnClickMask: {
      type: Boolean,
      value: false
    },
    // 层级
    zIndex: {
      type: Number,
      value: 100
    },
    // 是否显示遮罩层
    mask: {
      type: Boolean,
      value: true
    },
    // 密码长度
    length: {
      type: Number,
      value: 4
    },
    // 输入框的值
    inputValue: {
      type: Array,
      value: []
    },
    // 标题
    title: {
      type: String,
      value: "请输入密码"
    },
    // 是否使用标题插槽
    useTitleSlot: {
      type: Boolean,
      value: false
    },
    // 是否使用输入框插槽
    useInputSlot: {
      type: Boolean,
      value: false
    }
  },
  data: {
    // 键盘
    inputLabel: [
      [
        {
          value: 1,
          label: "1",
          type: "number"
        },
        {
          value: 2,
          label: "2",
          type: "number"
        },
        {
          value: 3,
          label: "3",
          type: "number"
        }
      ],
      [
        {
          value: 4,
          label: "4",
          type: "number"
        },
        {
          value: 5,
          label: "5",
          type: "number"
        },
        {
          value: 6,
          label: "6",
          type: "number"
        }
      ],
      [
        {
          value: 7,
          label: "7",
          type: "number"
        },
        {
          value: 8,
          label: "8",
          type: "number"
        },
        {
          value: 9,
          label: "9",
          type: "number"
        }
      ],
      [
        {
          value: "cancel",
          label: "取消",
          type: "cancel"
        },
        {
          value: 0,
          label: "0",
          type: "number"
        },
        {
          value: "del",
          label: "x",
          type: "del"
        }
      ]
    ]
  },
  methods: {
    // 点击键盘
    onClick(event: WechatMiniprogram.TouchEvent) {
      const { length, inputValue } = this.properties;
      const { item } = event.currentTarget.dataset;
      this.triggerEvent("click", item);
      if (item.type === "number") {
        // 点击的是数字
        if (inputValue.length < length) {
          this.triggerEvent("input", item.value);
        }
      } else if (item.type === "del") {
        // 点击的是删除按钮
        if (inputValue.length > 0) {
          this.triggerEvent("del", item.value);
        }
      } else if (item.type === "cancel") {
        // 点击的是取消按钮
        this.emitClose();
      }
    },
    // 点击遮罩层
    onClickMask() {
      this.emitClose();
    },
    // 发射关闭事件
    emitClose() {
      this.triggerEvent("close");
    }
  }
});
