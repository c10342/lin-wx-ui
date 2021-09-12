# Storage 本地缓存

## 引入

在 index.js 中引入

```javascript
import storage from '/dist/extends/storage/index';
```

## 特性

- 底层使用 `wx.setStorageSync`，`wx.getStorageInfoSync`等
- 可设置过期时间
- 可设置最大存储容量
- 删除最近最少使用的项的缓存对象

## 案例

设置 5 秒过期时间

```javascript
storage.set('demo', 1, {
  expire: 5 * 1000
});
```

获取数据

```javascript
storage.get('demo', '默认值');
```

## storage 方法

- `storage.set(key,val[, config])`：设置缓存数据
- `storage.get(key,def)`：获取缓存数据
- `storage.has(key)`：是否存在 key
- `storage.remove(key)`：根据 key 移除缓存数据
- `storage.clear()`：清空所有缓存数据
- `storage.keys()`：获取缓存数据的所有 key 值
- `storage.values()`：获取缓存数据的所有 value 值
- `storage.forEach(callback)`：遍历所有缓存数据
- `storage.setMaxSize(maxSize)`：设置最大存储容量，单位 kb
- `storage.setDefaultConfig(config)`：设置默认配置(过期时间等)，config 见下文

## storage 属性

- `storage.length`：缓存数据的个数

## config 配置

| 字段名 | 说明             | 类型   | 默认值 |
| ------ | ---------------- | ------ | ------ |
| expire | 有效期，单位毫秒 | Number | —      |
