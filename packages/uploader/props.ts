export const chooseImageProps = {
  // 所选的图片的尺寸, 当accept为image类型时设置所选图片的尺寸可选值为original compressed
  sizeType: {
    type: Array,
    value: ["original", "compressed"]
  },
  //   图片或者视频选取模式
  capture: {
    type: Array,
    value: ["album", "camera"]
  }
};

export const chooseVideoProps = {
  // 图片或者视频选取模式
  capture: {
    type: Array,
    value: ["album", "camera"]
  },
  //   是否压缩视频
  compressed: {
    type: Boolean,
    value: true
  },
  //   拍摄视频最长拍摄时间，单位秒
  maxDuration: {
    type: Number,
    value: 60
  },
  //   选择摄像头
  camera: {
    type: String,
    value: "back",
    options: ["back", "front"]
  }
};
