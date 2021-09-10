import { LinComponent } from "../common/component";
import { isImageFile, chooseFile, isVideo, isPromise } from "./utils";

import { chooseImageProps, chooseVideoProps } from "./props";
import { canIUsePreviewMedia } from "../common/version";
import { isFunction } from "../common/is";

interface ListsItem {
  isImage?: boolean;
  url?: string;
  path?: string;
  isVideo?: boolean;
  type?: string;
}

LinComponent({
  classes: [
    "preview-class",
    "preview-image-class",
    "preview-file-class",
    "delete-class",
    "mask-class",
    "upload-class"
  ],
  props: {
    // 标识符
    name: {
      type: [String, Number]
    },
    // 是否禁用文件上传
    disabled: Boolean,
    // 上传区域文字提示
    uploadText: String,
    // 是否开启文件读取前事件
    useBeforeRead: Boolean,
    // 文件读取前方法，返回 true 或者 false，false 会中断上传
    beforeRead: null,
    // 文件读取后方法
    afterRead: null,
    // 接受的文件类型
    accept: {
      type: String,
      value: "image",
      options: ["all", "media", "image", "file", "video"]
    },
    // 是否开启图片多选，部分安卓机型不支持
    multiple: Boolean,
    // 文件上传数量限制
    maxCount: {
      type: Number,
      value: 100
    },
    // 文件列表
    fileList: {
      type: Array,
      value: [],
      observer: "formatFileList"
    },
    // 文件大小限制，单位为 byte
    maxSize: {
      type: Number,
      value: Number.MAX_VALUE
    },
    // 是否在上传完成后展示预览图
    previewImage: {
      type: Boolean,
      value: true
    },
    // 预览图裁剪模式，可选值参考小程序 image 组件的 mode 属性
    imageFit: {
      type: String,
      value: "scaleToFill"
    },
    // 预览图和上传区域的尺寸，默认单位为 px
    previewSize: {
      type: [String, Number],
      value: "160rpx"
    },
    // 是否在点击预览图后展示全屏图片预览
    previewFullImage: {
      type: Boolean,
      value: true
    },
    // 是否展示删除按钮
    deletable: {
      type: Boolean,
      value: true
    },
    // 上传区域图标
    uploadIcon: {
      type: String,
      value: "camera"
    },
    // 是否展示文件上传按钮
    showUpload: {
      type: Boolean,
      value: true
    },
    ...chooseVideoProps,
    ...chooseImageProps
  },
  data: {
    // 预览列表
    lists: [] as ListsItem[],
    // 是否显示上传按钮
    showUploadBtn: true
  },
  methods: {
    // 点击上传按钮
    startUpload() {
      const { maxCount, multiple, accept, lists, disabled } = this.data;
      if (disabled) return;
      // 根据类型选择文件
      chooseFile({
        ...this.data,
        maxCount: maxCount - lists.length
      } as any)
        .then((res: Record<string, any>) => {
          let file: any = null;
          if (isVideo(res, accept)) {
            // 视频文件
            file = {
              path: res.tempFilePath,
              ...res
            };
          } else {
            file = multiple ? res.tempFiles : res.tempFiles[0];
          }
          // 文件读取前方法
          this.onBeforeRead(file);
        })
        .catch((error) => {
          this.triggerEvent("error", error);
        });
    },
    // 文件读取前钩子
    onBeforeRead(file) {
      const { beforeRead, useBeforeRead } = this.data;
      let res: any = true;
      if (isFunction(beforeRead)) {
        // 获取beforeRead返回结果
        res = beforeRead(file, this.getDetail());
      }
      if (useBeforeRead) {
        // 开启文件读取前事件
        res = new Promise((resolve, reject) => {
          this.triggerEvent("before-read", {
            file,
            ...this.getDetail(),
            callback: (ok) => {
              if (ok) {
                resolve(ok);
              } else {
                reject(ok);
              }
            }
          });
        });
      }
      if (!res) {
        return;
      }
      // res返回来的是promise则需要调用then
      if (isPromise(res)) {
        res
          .then((data) => this.onAfterRead(data || file))
          .catch(() => {
            // todo
          });
      } else {
        this.onAfterRead(file);
      }
    },
    // 文件读取后方法
    onAfterRead(file) {
      const { maxSize, afterRead } = this.data;
      // 判断文件是否超出大小限制
      const overszie = Array.isArray(file)
        ? file.some((item) => item.size > maxSize)
        : file.size > maxSize;
      if (overszie) {
        // 超出大小限制
        this.triggerEvent("oversize", { file, ...this.getDetail() });
        return;
      }
      if (isFunction(afterRead)) {
        // 调用文件读取后回调函数
        afterRead(file, this.getDetail());
      }
      this.triggerEvent("after-read", { file, ...this.getDetail() });
    },
    // 图片预览
    onPreviewImage(event) {
      // 是否全屏预览图片
      const { previewFullImage } = this.data;
      if (!previewFullImage) return;
      const { index } = event.currentTarget.dataset;
      // 预览列表
      const { lists } = this.data;
      const item = lists[index];
      wx.previewImage({
        // 过滤掉那些不是图片的数据
        urls: lists
          .filter((itemData) => itemData.isImage)
          .map((itemData) => itemData.url || itemData.path || ""),
        // 当先图片地址
        current: item.url || item.path,
        fail() {
          // 失败
          wx.showToast({ title: "预览图片失败", icon: "none" });
        }
      });
    },
    // 预览视频
    onPreviewVideo(event) {
      const { previewFullImage } = this.data;
      if (!previewFullImage) return;
      // 判断能否预览视频
      if (!canIUsePreviewMedia()) {
        wx.showToast({
          title: "微信版本过低，无法全屏预览视频",
          icon: "none"
        });
        return;
      }
      const { index } = event.currentTarget.dataset;
      const { lists } = this.data;
      wx.previewMedia({
        // 过滤掉那些不是视频的数据
        sources: lists
          .filter((item) => item.isVideo)
          .map((item) => {
            item.type = "video";
            item.url = item.url || item.path;
            return item as WechatMiniprogram.MediaSource;
          }),
        // 第几个视频
        current: index,
        fail() {
          wx.showToast({ title: "预览视频失败", icon: "none" });
        }
      });
    },
    // 删除列表选项
    deleteItem(event) {
      const { index } = event.currentTarget.dataset;

      this.triggerEvent("delete", {
        ...this.getDetail(index),
        file: this.data.fileList[index]
      });
    },
    // 点击预览
    onClickPreview(event) {
      const { index } = event.currentTarget.dataset;
      const item = this.data.lists[index];

      this.triggerEvent("click-preview", {
        ...item,
        ...this.getDetail(index)
      });
    },
    // 获取组件唯一标识和文件索引
    getDetail(index) {
      return {
        name: this.data.name,
        index: index == null ? this.data.fileList.length : index
      };
    },
    // 格式化列表数据
    formatFileList() {
      const { fileList = [], maxCount } = this.data;
      const lists = fileList.map((item) => {
        // 是否为图片
        const isImage = "isImage" in item ? item.isImage : isImageFile(item);
        // 是否可删除
        const deletable = "deletable" in item ? item.deletable : true;
        return {
          ...item,
          isImage,
          deletable
        };
      });
      this.setData({ lists, showUploadBtn: lists.length < maxCount });
    }
  }
});
