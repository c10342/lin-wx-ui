export const openType=Behavior({properties:{openType:String},methods:{bindGetUserInfo(e){this.triggerEvent("getuserinfo",e.detail)},bindContact(e){this.triggerEvent("contact",e.detail)},bindGetPhoneNumber(e){this.triggerEvent("getphonenumber",e.detail)},bindError(e){this.triggerEvent("error",e.detail)},bindLaunchApp(e){this.triggerEvent("launchapp",e.detail)},bindOpenSetting(e){this.triggerEvent("opensetting",e.detail)}}});