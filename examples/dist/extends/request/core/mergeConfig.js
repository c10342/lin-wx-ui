/**
 * 合并配置
 * @param {*} config1 默认配置
 * @param {*} config2 用户传递进来的配置
 */
export default function mergeConfig(config1 = {}, config2 = {}) {
  const config = Object.create(null);

  // 处理用户传递进来的配置
  for (const key in config2) {
    mergeFiled(key);
  }

  // 处理默认配置
  for (const key in config1) {
    if (!config2[key]) {
      //    用户没有传递进来就是使用默认配置
      mergeFiled(key);
    }
  }

  function mergeFiled(key) {
    // 合并策略，['url', 'data']这些没有默认配置，只能获取用户传递进来的
    const stratKeysFromVal2 = ['url', 'data'];
    let val;

    if (stratKeysFromVal2.includes(key)) {
      // 获取用户配置的值
      val = config2[key];
    } else {
      // 其余的看看用户是否传递进来了，没有则使用默认配置
      val = typeof config2[key] === 'undefined' ? config1[key] : config2[key];
    }
    config[key] = val;
  }

  return config;
}
