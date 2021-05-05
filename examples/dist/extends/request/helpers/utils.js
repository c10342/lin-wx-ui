const toString = Object.prototype.toString;

// 判断是否为普通对象
export function isPlainObject(value) {
  return toString.call(value) === '[object Object]';
}

// 深拷贝对象
export function deepMerge(...objs) {
  // 创建一个空对象
  const result = Object.create(null);

  objs.forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (isPlainObject(val)) {
          if (result[key]) {
            // 将同名属性对象合并
            // {a:{name:'lisi'}},{a:{age:1}}=>{a:{name:'lisi',age:1}}
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = deepMerge(val);
          }
        } else {
          result[key] = val;
        }
      });
    }
  });

  return result;
}

/**
 * 判断是否为绝对地址
 *
 * @export
 * @param {string} url
 * @returns {boolean}
 */
export function isAbsoluteURL(url) {
  // 以http,https等开头的都是绝对地址
  // eslint-disable-next-line
  // return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  return false;
}

//   合并地址
export function combineURL(baseURL, url) {
  return url
    ? baseURL.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '')
    : baseURL;
}

/**
 * 把from上的属性拷贝一份到to中
 *
 * @export
 * @template T
 * @template U
 * @param {} to
 * @param {} from
 * @returns {}
 */
export function extend(to, from) {
  for (const key in from) {
    to[key] = from[key];
  }
  return to;
}
