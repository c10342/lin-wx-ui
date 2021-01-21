# Uploader 文件上传

---

 <div class="demo-outer-container">
     <div class="demo-inner-container">
        <div class="demo-content">
            <img class="demo-image" src='../../componentImage/uploader.png' />
        </div>
     </div>
 </div>

## 引入

在 app.json 或 index.json 中引入组件，详细介绍见[快速上手](/#/start)

```json
"usingComponents": {
  "lin-uploader": "/dist/Uploader/index"
}
```

## 基础用法

文件上传完毕后会触发 after-read 回调函数，获取到对应的文件的临时地址。

:::demo

```html
<lin-uploader
  data-key="fileList1"
  file-list="{ { fileList1 }}"
  bind:after-read="afterRead"
  bind:delete="onDelete"
/>
```

```javascript
Page({
  data: {
    fileList1: [],
  },
  afterRead(event) {
    const key = event.currentTarget.dataset.key;
    const { file } = event.detail;

    const fileList = this.data[key];
    if (!("path" in file) && "tempFilePath" in file) {
      file.path = file.tempFilePath;
    }
    fileList.push({
      ...file,
    });
    this.setData({
      [key]: fileList,
    });
  },
  onDelete(event) {
    const key = event.currentTarget.dataset.key;
    const { index } = event.detail;
    const fileList = this.data[key];
    fileList.splice(index, 1);
    this.setData({
      [key]: fileList,
    });
  },
});
```

:::

## 上传视频

通过`accept`属性设置上传的文件类型

:::demo

```html
<lin-uploader
  accept="video"
  data-key="fileList3"
  file-list="{ { fileList3 }}"
  bind:after-read="afterRead1"
  bind:delete="onDelete"
/>
```

```javascript
Page({
  data: {
    fileList3: [],
  },
  afterRead1(event) {
    const key = event.currentTarget.dataset.key;
    const { file } = event.detail;
    const fileList = this.data[key];
    fileList.push({
      ...file,
      isVideo: true,
    });
    this.setData({
      [key]: fileList,
    });
  },
  onDelete(event) {
    const key = event.currentTarget.dataset.key;
    const { index } = event.detail;
    const fileList = this.data[key];
    fileList.splice(index, 1);
    this.setData({
      [key]: fileList,
    });
  },
});
```

:::

## 图片预览

通过向组件传入`file-list`属性，可以绑定已经上传的图片列表，并展示图片列表的预览图。file-list 的详细结构可见下方。

:::demo

```html
<lin-uploader
  data-key="fileList2"
  file-list="{ { fileList2 }}"
  bind:after-read="afterRead"
  bind:delete="onDelete"
/>
```

```javascript
Page({
  data: {
    fileList2: [
      {
        url: "https://img.yzcdn.cn/vant/leaf.jpg",
        name: "图片1",
      },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: "http://iph.href.lu/60x60?text=default",
        name: "图片2",
        isImage: true,
        deletable: true,
      },
    ],
  },
  afterRead(event) {
    const key = event.currentTarget.dataset.key;
    const { file } = event.detail;

    const fileList = this.data[key];
    if (!("path" in file) && "tempFilePath" in file) {
      file.path = file.tempFilePath;
    }
    fileList.push({
      ...file,
    });
    this.setData({
      [key]: fileList,
    });
  },
  onDelete(event) {
    const key = event.currentTarget.dataset.key;
    const { index } = event.detail;
    const fileList = this.data[key];
    fileList.splice(index, 1);
    this.setData({
      [key]: fileList,
    });
  },
});
```

:::

## 上传状态

通过`status`属性可以标识上传状态，`uploading`表示上传中，`failed`表示上传失败，`done`表示上传完成。

:::demo

```html
<lin-uploader
  data-key="fileList4"
  file-list="{ { fileList4 }}"
  bind:after-read="afterRead"
  bind:delete="onDelete"
/>
```

```javascript
Page({
  data: {
    fileList4: [
      {
        url: "https://img.yzcdn.cn/vant/leaf.jpg",
        status: "uploading",
        message: "上传中",
      },
      {
        url: "https://img.yzcdn.cn/vant/tree.jpg",
        status: "failed",
        message: "上传失败",
      },
    ],
  },
  afterRead(event) {
    const key = event.currentTarget.dataset.key;
    const { file } = event.detail;

    const fileList = this.data[key];
    if (!("path" in file) && "tempFilePath" in file) {
      file.path = file.tempFilePath;
    }
    fileList.push({
      ...file,
    });
    this.setData({
      [key]: fileList,
    });
  },
  onDelete(event) {
    const key = event.currentTarget.dataset.key;
    const { index } = event.detail;
    const fileList = this.data[key];
    fileList.splice(index, 1);
    this.setData({
      [key]: fileList,
    });
  },
});
```

:::

## 限制上传数量

通过`max-count`属性可以限制上传文件的数量，上传数量达到限制后，会自动隐藏上传区域

:::demo

```html
<lin-uploader
  max-count="2"
  data-key="fileList5"
  file-list="{ { fileList5 }}"
  bind:after-read="afterRead"
  bind:delete="onDelete"
/>
```

```javascript
Page({
  data: {
    fileList5: [],
  },
  afterRead(event) {
    const key = event.currentTarget.dataset.key;
    const { file } = event.detail;

    const fileList = this.data[key];
    if (!("path" in file) && "tempFilePath" in file) {
      file.path = file.tempFilePath;
    }
    fileList.push({
      ...file,
    });
    this.setData({
      [key]: fileList,
    });
  },
  onDelete(event) {
    const key = event.currentTarget.dataset.key;
    const { index } = event.detail;
    const fileList = this.data[key];
    fileList.splice(index, 1);
    this.setData({
      [key]: fileList,
    });
  },
});
```

:::

## 上传前校验

将`use-before-read`属性设置为`true`，然后绑定 `before-read` 事件可以在上传前进行校验，调用 `callback` 方法传入 `true` 表示校验通过，传入 `false` 表示校验失败。

:::demo

```html
<lin-uploader
  data-key="fileList6"
  file-list="{ { fileList6 }}"
  bind:after-read="afterRead"
  accept="media"
  use-before-read
  bind:before-read="beforeRead"
  bind:delete="onDelete"
/>
```

```javascript
Page({
  data: {
    fileList6: [],
  },
  afterRead(event) {
    const key = event.currentTarget.dataset.key;
    const { file } = event.detail;

    const fileList = this.data[key];
    if (!("path" in file) && "tempFilePath" in file) {
      file.path = file.tempFilePath;
    }
    fileList.push({
      ...file,
    });
    this.setData({
      [key]: fileList,
    });
  },
  onDelete(event) {
    const key = event.currentTarget.dataset.key;
    const { index } = event.detail;
    const fileList = this.data[key];
    fileList.splice(index, 1);
    this.setData({
      [key]: fileList,
    });
  },
  beforeRead(event) {
    const { file, callback } = event.detail;
    if (file.tempFilePath.lastIndexOf(".jpg") > -1) {
      callback(true);
    } else {
      callback(false);
      wx.showToast({
        title: "只能上传jpg图片",
        icon: "none",
      });
    }
  },
});
```

:::

## 上传其他文件

将`accept`属性设置为`all`即可上传其他文件

:::demo

```html
<lin-uploader
  data-key="fileList7"
  file-list="{ { fileList7 }}"
  bind:after-read="afterRead"
  accept="all"
  bind:delete="onDelete"
/>
```

```javascript
Page({
  data: {
    fileList7: [],
  },
  afterRead(event) {
    const key = event.currentTarget.dataset.key;
    const { file } = event.detail;

    const fileList = this.data[key];
    if (!("path" in file) && "tempFilePath" in file) {
      file.path = file.tempFilePath;
    }
    fileList.push({
      ...file,
    });
    this.setData({
      [key]: fileList,
    });
  },
  onDelete(event) {
    const key = event.currentTarget.dataset.key;
    const { index } = event.detail;
    const fileList = this.data[key];
    fileList.splice(index, 1);
    this.setData({
      [key]: fileList,
    });
  },
});
```

:::

## 自定义上传样式

可使用默认插槽自定义上传按钮的样式

:::demo

```html
<lin-uploader
  data-key="fileList8"
  file-list="{ { fileList8 }}"
  bind:after-read="afterRead"
  bind:delete="onDelete"
>
  <lin-button icon="camera" type="success">上传图片</lin-button>
</lin-uploader>
```

```javascript
Page({
  data: {
    fileList8: [],
  },
  afterRead(event) {
    const key = event.currentTarget.dataset.key;
    const { file } = event.detail;

    const fileList = this.data[key];
    if (!("path" in file) && "tempFilePath" in file) {
      file.path = file.tempFilePath;
    }
    fileList.push({
      ...file,
    });
    this.setData({
      [key]: fileList,
    });
  },
  onDelete(event) {
    const key = event.currentTarget.dataset.key;
    const { index } = event.detail;
    const fileList = this.data[key];
    fileList.splice(index, 1);
    this.setData({
      [key]: fileList,
    });
  },
});
```

:::

## 属性

| 参数             | 说明                                                          | 类型           | 可选值                                   | 默认值                     |
| ---------------- | ------------------------------------------------------------- | -------------- | ---------------------------------------- | -------------------------- |
| name             | 标识符                                                        | String,Number  | —                                        | —                          |
| disabled         | 是否禁用文件上传                                              | Boolean        | —                                        | false                      |
| uploadText       | 上传区域文字提示                                              | String         | —                                        | —                          |
| useBeforeRead    | 是否开启文件读取前事件                                        | Boolean        | —                                        | false                      |
| beforeRead       | 文件读取前方法，返回 true 或者 false，false 会中断上传        | Function       | —                                        | —                          |
| afterRead        | 文件读取后方法                                                | Function       | —                                        | —                          |
| accept           | 接受的文件类型                                                | String         | `all`, `media`, `image`, `file`, `video` | image                      |
| multiple         | 是否开启图片多选，部分安卓机型不支持                          | Boolean        | —                                        | false                      |
| maxCount         | 文件上传数量限制                                              | Number         | —                                        | —                          |
| fileList         | 文件列表                                                      | Array          | —                                        | —                          |
| maxSize          | 文件大小限制，单位为 byte                                     | Number         | —                                        | —                          |
| previewImage     | 是否在上传完成后展示预览图                                    | Boolean        | —                                        | true                       |
| imageFit         | 预览图裁剪模式，可选值参考小程序 image 组件的 mode 属性       | String         | —                                        | scaleToFill                |
| previewSize      | 预览图和上传区域的尺寸，默认单位为 px                         | String, Number | —                                        | 160rpx                     |
| previewFullImage | 是否在点击预览图后展示全屏图片预览                            | Boolean        | —                                        | true                       |
| deletable        | 是否展示删除按钮                                              | Boolean        | —                                        | true                       |
| uploadIcon       | 上传区域图标                                                  | String         | —                                        | camera                     |
| showUpload       | 是否展示文件上传按钮                                          | Boolean        | —                                        | true                       |
| sizeType         | 所选的图片的尺寸, 当 accept 为 image 类型时设置所选图片的尺寸 | Array          | `original`, `compressed`                 | ['original', 'compressed'] |
| capture          | 图片或者视频选取模式                                          | Array          | `album`, `camera`                        | ['album', 'camera']        |
| compressed       | 当 accept 为 video 时生效，是否压缩视频                       | Boolean        | —                                        | true                       |
| maxDuration      | 当 accept 为 video 时生效，拍摄视频最长拍摄时间，单位秒       | Number         | —                                        | 60                         |
| camera           | 当 accept 为 video 时生效                                     | String         | `back`, `front`                          | back                       |

### accept 的合法值

| 参数  | 说明                                 |
| ----- | ------------------------------------ |
| media | 图片和视频                           |
| image | 图片                                 |
| video | 视频                                 |
| file  | 从客户端会话选择图片和视频以外的文件 |
| all   | 从客户端会话选择所有文件             |

### FileList 说明

`file-list` 为一个对象数组，数组中的每一个对象包含以下 `key`

| 参数    | 说明                                     |
| ------- | ---------------------------------------- |
| url     | 图片和视频的网络资源地址                 |
| name    | 文件名称，视频将在全屏预览时作为标题显示 |
| type    | 文件类型，可选值`image` `video` `file`   |
| isImage | 手动标记图片资源                         |
| isVideo | 手动标记视频资源                         |

## 事件

| 事件名             | 说明                                                                                                       | 参数            |
| ------------------ | ---------------------------------------------------------------------------------------------------------- | --------------- |
| bind:error         | 选择文件发生错误                                                                                           | error           |
| bind:before-read   | 文件读取前，在回调函数中返回 `false` 可终止文件读取，绑定事件的同时需要将`use-before-read`属性设置为`true` | {file,callback} |
| bind:oversize      | 文件超出大小限制                                                                                           | {file}          |
| bind:after-read    | 文件读取完成后                                                                                             | {file}          |
| bind:delete        | 删除文件                                                                                                   | {file}          |
| bind:click-preview | 点击预览图片                                                                                               | Object          |

## 插槽

| 插槽名称 | 说明           |
| -------- | -------------- |
| —        | 自定义上传区域 |

## 外部样式类

| 插槽名称            | 说明                 |
| ------------------- | -------------------- |
| custom-class        | 根节点样式类         |
| preview-class       | 预览容器样式类       |
| preview-image-class | 预览图片样式类       |
| preview-file-class  | 预览其他文件样式类   |
| delete-class        | 删除按钮样式类       |
| mask-class          | loading 遮罩层样式类 |
| upload-class        | 上传区域样式类       |
