# apiCache api 缓存

## 背景

Api 缓存是 `request`网络请求和`storage`本地缓存结合的产物。目的是为了应对用户流量大，减轻服务器的压力，减少网络请求次数，加快数据的显示，以及提高用户体验。我们现在需要把一些公共请求进行本地缓存，并且提供不同的更新策略给开发者选择。

## 引入

在 index.js 中引入

```javascript
import apiCache from '/dist/extends/apiCache/index';
```

## 特性

- `request`网络请求和`storage`本地缓存结合的产物
- 提供不同的更新策略给开发者选择

## 缓存方案（更新策略）

- 第一种方案：有缓存数据并且没有过期的情况下，直接返回缓存数据，不进行网络请求获取数据；没有缓存数据或者是有缓存数据，但是缓存数据的有效时间过期的情况下，发送网络请求，等待数据返回，然后存储到本地，并且设置过期时间，最后在把数据返回给前端
- 第二种方案：有缓存数据并且没有过期的情况下，直接返回缓存数据，同时继续发送网络请求，请求的数据回来之后对缓存数据进行更新；没有缓存数据或者有缓存数据，但是缓存数据已经过期的情况下，发送网络请求，然后存储到本地，并且设置过期时间，最后再把数据返回给前端
- 第三种方案：不进行缓存

## 案例

```javascript
import apiCache from '/dist/extends/apiCache/index';

// 统一设置缓存方案，以及过期时间
apiCache.setCacheConfig({ cache: 1, expire: 5000 });

Page({
  onClick() {
    //   发送请求
    apiCache
      .get('xxx', {
        data: {
          page: 1,
          limit: 4
        }
      })
      .then((res) => {
        console.log(res);
      });
  }
});
```

或者

```javascript
import apiCache from '/dist/extends/apiCache/index';

Page({
  onClick() {
    apiCache
      .get(
        'xxx',
        {
          data: {
            page: 1,
            limit: 4
          }
        },
        // 针对单个请求设置缓存方案，以及过期时间
        { cache: 1, expire: 5000 }
      )
      .then((res) => {
        console.log(res);
      });
  }
});
```

## Api

- `apiCache.setCacheConfig(cacheOptions)`

- `apiCache.request(method,url[,config,cacheOptions])`
-
- `apiCache.get(url[,config,cacheOptions])`

关于请求方法支持的列表跟`request`网络请求支持的一致，不同的就在于多了第三个参数`cacheOptions`，用来配置缓存设置的。

## cacheOptions 参数

| 字段名      | 说明                                                                 | 类型                                            | 可选值                                     | 默认值                         |
| ----------- | -------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------ | ------------------------------ |
| cache       | 更新策略                                                             | Boolean，Number                                 | false-禁用缓存，1-第一种方案，2-第二种方案 | 1                              |
| cacheKey    | 缓存的 key 值，可以唯一标识该请求的 key 值，url+参数基本可以唯一标识 | Function:(requestConfig, cacheOptions)=>String  | —                                          | requestConfig.url              |
| shouldCache | 是否需要缓存请求，默认只缓存 get 请求                                | Function:(requestConfig, cacheOptions)=>Boolean | —                                          | requestConfig.method === 'get' |
