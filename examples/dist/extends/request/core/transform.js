// 处理 transformRequest transformRespond
export default function transform(data, headers, fns) {
  if (!fns) {
    return data;
  }
  if (!Array.isArray(fns)) {
    fns = [fns];
  }

  fns.forEach((fn) => {
    data = fn(data, headers);
  });

  return data;
}
