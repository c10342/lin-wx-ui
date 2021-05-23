const markdown = `
# 介绍
Storage 本地缓存，参考\`lru-cache\`源码的设计思想，特点如下：
- 底层使用 \`wx.setStorageSync\`，\`wx.getStorageInfoSync\`等
- 可设置过期时间
- 可设置最大存储容量
- 删除最近最少使用的项的缓存对象

# 引用
\`\`\`javascript
import storage from 'path/to/dist/extends/storage/index';
\`\`\`

# storage 方法

- \`storage.set(key,val[, config])\`：设置缓存数据
- \`storage.get(key,def)\`：获取缓存数据
- \`storage.has(key)\`：是否存在key
- \`storage.remove(key)\`：根据key移除缓存数据
- \`storage.clear()\`：清空所有缓存数据
- \`storage.keys()\`：获取缓存数据的所有key值
- \`storage.values()\`：获取缓存数据的所有value值
- \`storage.forEach(callback)\`：遍历所有缓存数据
- \`storage.setMaxSize(maxSize)\`：设置最大存储容量
- \`storage.setDefaultConfig(config)\`：设置默认配置(过期时间等)


更多详细的例子，用法，配置，方法，请查看web端文档！！！

`;

export default markdown;
