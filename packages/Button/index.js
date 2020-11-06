import { canIUseFormFieldButton } from "../common/version";

const behaviors = [];
// 使用内置 behaviors
// 对于 form 组件，目前可以自动识别下列内置 behaviors:
// wx://form-field
// wx://form-field-group
// wx://form-field-button
if (canIUseFormFieldButton()) {
  behaviors.push("wx://form-field-button");
}

Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ["custom-class", "loading-class", "icon-class"],
  behaviors,
  /**
   * 组件的属性列表
   */
  properties: {
    formType: String,
    disabled: {
      type: Boolean,
      value: false,
    },
    block: {
      type: Boolean,
      value: false,
    },
    type: {
      type: String,
      value: "default",
      options: ["primary", "success", "info", "warning", "danger", "default"],
    },
    plain: {
      type: Boolean,
      value: false,
    },
    round: {
      type: Boolean,
      value: false,
    },
    circle: {
      type: Boolean,
      value: false,
    },
    icon: {
      type: String,
      value: "",
    },
    iconSize: {
      type: String,
    },
    size: {
      type: String,
      value: "default",
    },
    loading: {
      type: Boolean,
      value: false,
    },
    loadingColor: String,
    loadingSize: String,
    dataset: null,
    color: {
      type: String,
      value: "",
      observer(color) {
        let style = "";
        if (color) {
          style += `color: ${this.data.plain ? color : "white"};`;
          if (!this.data.plain) {
            style += `background: ${color};`;
          }
          if (color.indexOf("gradient") !== -1) {
            style += "border: none;";
          } else {
            style += `border-color:${color};`;
          }
        }
        if (style !== this.data.baseStyle) {
          this.setData({ baseStyle: style });
        }
      },
    },

    id: String,
    lang: String,
    businessId: Number,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    ariaLabel: String,
    openType: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    baseStyle: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick() {
      if (!this.properties.disabled) {
        this.triggerEvent("click");
      }
    },
    bindGetUserInfo(event) {
      this.triggerEvent("getuserinfo", event.detail);
    },

    bindContact(event) {
      this.triggerEvent("contact", event.detail);
    },

    bindGetPhoneNumber(event) {
      this.triggerEvent("getphonenumber", event.detail);
    },

    bindError(event) {
      this.triggerEvent("error", event.detail);
    },

    bindLaunchApp(event) {
      this.triggerEvent("launchapp", event.detail);
    },

    bindOpenSetting(event) {
      this.triggerEvent("opensetting", event.detail);
    },
  },
});
