// 处理 transformRequest transformRespond
export default function transform(data, headers, fns) {
  if (!fns) {
    return data;
  }
  // 开发者传进来的，transformRequest transformRespond可能不是数组，统一转成数组去处理
  if (!Array.isArray(fns)) {
    fns = [fns];
  }

  fns.forEach((fn) => {
    data = fn(data, headers);
  });

  return data;
}
