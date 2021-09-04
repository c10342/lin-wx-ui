const toString = Object.prototype.toString;

// 判断是否为普通对象
export function isPlainObject(value) {
  return toString.call(value) === '[object Object]';
}

// 判断是否为对象
export function isArr(val) {
  return toString.call(val) === '[object Array]';
}

// 深拷贝
export function deepClone(obj) {
  if (isPlainObject(obj)) {
    const ret = {};
    for (const key in obj) {
      const val = obj[key];
      if (typeof val === 'object') {
        ret[key] = deepClone(val);
      } else {
        ret[key] = val;
      }
    }
    return ret;
  } else if (isArr(obj)) {
    const ret = [];
    for (let i = 0; i < obj.length; i++) {
      const val = obj[i];
      if (typeof val === 'object') {
        ret.push(deepClone(val));
      } else {
        ret.push(val);
      }
    }
    return ret;
  }
  return obj;
}

// 深合并对象
export function deepMerge(...objs) {
  // 创建一个空对象
  const result = Object.create(null);

  objs.forEach((obj) => {
    if (obj) {
      obj = deepClone(obj);
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
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
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

// 分发函数，根据配置选择不同文件
export function getDefaultAdapter(config) {
  const { method } = config;
  let adapter;
  if (method === 'upload') {
    // 上传
    adapter = require('../adapters/upload').default;
  } else if (method === 'download') {
    // 下载
    adapter = require('../adapters/download').default;
  } else {
    // 普通网络请求
    adapter = require('../adapters/xhr').default;
  }

  return adapter;
}
