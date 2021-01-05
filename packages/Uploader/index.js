import {
  isImageFile, chooseFile, isVideo, isPromise
} from './utils';

import { chooseImageProps, chooseVideoProps } from './props';
import { canIUsePreviewMedia } from '../common/version';

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: [
    'custom-class',
    'preview-class',
    'preview-image-class',
    'preview-file-class',
    'delete-class',
    'mask-class',
    'upload-class'
  ],
  properties: {
    name: String,
    disabled: Boolean,
    uploadText: String,
    useBeforeRead: Boolean,
    beforeRead: null,
    afterRead: null,
    accept: {
      type: String,
      value: 'image',
      options: ['all', 'media', 'image', 'file', 'video']
    },
    multiple: Boolean,
    maxCount: {
      type: Number,
      value: 100
    },
    fileList: {
      type: Array,
      value: [],
      observer: 'formatFileList'
    },
    maxSize: {
      type: Number,
      value: Number.MAX_VALUE
    },
    previewImage: {
      type: Boolean,
      value: true
    },
    imageFit: {
      type: String,
      value: 'scaleToFill'
    },
    previewSize: {
      type: [String, Number],
      value: '160rpx'
    },
    previewFullImage: {
      type: Boolean,
      value: true
    },
    deletable: {
      type: Boolean,
      value: true
    },
    uploadIcon: {
      type: String,
      value: 'camera'
    },
    showUpload: {
      type: Boolean,
      value: true
    },
    ...chooseVideoProps,
    ...chooseImageProps
  },
  data: {
    lists: [],
    showUploadBtn: true
  },
  methods: {
    startUpload () {
      const {
        maxCount, multiple, accept, lists, disabled
      } = this.properties;
      if (disabled) return;
      chooseFile({
        ...this.properties,
        maxCount: maxCount - lists.length
      })
        .then((res) => {
          let file = null;
          if (isVideo(res, accept)) {
            file = {
              path: res.tempFilePath,
              ...res
            };
          } else {
            file = multiple ? res.tempFiles : res.tempFiles[0];
          }
          this.onBeforeRead(file);
        })
        .catch((error) => {
          this.triggerEvent('error', error);
        });
    },
    onBeforeRead (file) {
      const { beforeRead, useBeforeRead } = this.properties;
      let res = true;
      if (typeof beforeRead === 'function') {
        res = beforeRead(file, this.getDetail());
      }
      if (useBeforeRead) {
        res = new Promise((resolve, reject) => {
          this.triggerEvent('before-read', {
            file,
            ...this.getDetail(),
            callback: (ok) => {
              if (ok) {
                resolve();
              } else {
                reject(ok);
              }
              // ok ? resolve() : reject();
            }
          });
        });
      }
      if (!res) {
        return;
      }

      if (isPromise(res)) {
        res
          .then((data) => this.onAfterRead(data || file))
          .catch(() => {});
      } else {
        this.onAfterRead(file);
      }
    },
    onAfterRead (file) {
      const { maxSize, afterRead } = this.properties;
      const overszie = Array.isArray(file)
        ? file.some((item) => item.size > maxSize)
        : file.size > maxSize;
      if (overszie) {
        this.triggerEvent('oversize', { file, ...this.getDetail() });
        return;
      }
      if (typeof afterRead === 'function') {
        afterRead(file, this.getDetail());
      }
      this.triggerEvent('after-read', { file, ...this.getDetail() });
    },
    onPreviewImage (event) {
      const { previewFullImage } = this.properties;
      if (!previewFullImage) return;
      const { index } = event.currentTarget.dataset;
      const { lists } = this.data;
      const item = lists[index];
      wx.previewImage({
        urls: lists
          .filter((itemData) => itemData.isImage)
          .map((itemData) => itemData.url || itemData.path),
        current: item.url || item.path,
        fail () {
          wx.showToast({ title: '预览图片失败', icon: 'none' });
        }
      });
    },
    onPreviewVideo (event) {
      const { previewFullImage } = this.properties;
      if (!previewFullImage) return;
      if (!canIUsePreviewMedia()) {
        wx.showToast({
          title: '微信版本过低，无法全屏预览视频',
          icon: 'none'
        });
        return;
      }
      const { index } = event.currentTarget.dataset;
      const { lists } = this.data;
      wx.previewMedia({
        sources: lists
          .filter((item) => item.isVideo)
          .map((item) => {
            item.type = 'video';
            item.url = item.url || item.path;
            return item;
          }),
        current: index,
        fail () {
          wx.showToast({ title: '预览视频失败', icon: 'none' });
        }
      });
    },
    deleteItem (event) {
      const { index } = event.currentTarget.dataset;

      this.triggerEvent('delete', {
        ...this.getDetail(index),
        file: this.data.fileList[index]
      });
    },
    onClickPreview (event) {
      const { index } = event.currentTarget.dataset;
      const item = this.data.lists[index];

      this.triggerEvent('click-preview', {
        ...item,
        ...this.getDetail(index)
      });
    },
    getDetail (index) {
      return {
        name: this.properties.name,
        index: index == null ? this.data.fileList.length : index
      };
    },
    formatFileList () {
      const { fileList = [], maxCount } = this.properties;
      const lists = fileList.map((item) => {
        const isImage = 'isImage' in item ? item.isImage : isImageFile(item);
        const deletable = 'deletable' in item ? item.deletable : true;
        return {
          ...item,
          isImage,
          deletable
        };
      });
      this.setData({ lists, showUploadBtn: lists.length < maxCount });
    }
  },
  created () {},
  attached () {},
  ready () {},
  moved () {},
  detached () {}
});
