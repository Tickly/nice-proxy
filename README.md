# nice-proxy

> 刚起步的项目，功能并不是很完善，欢迎提意见。

在进行多人合作项目的时候，通常使用`webpack-dev-server`来进行代理设置。

总是会遇到下面这些问题。

- 当需要跟另一个人对接的时候，切换代理就要重启项目，如果项目较大，启动速度较慢，会造成不必要的等待时间。
- 偶尔会发现，我怎么连到张三了，我明明跟李四在对接。原来是别人提交了代码，覆盖了你之前的设置。

那么你可以来试试`nice-proxy`

# 安装

`yarn add nice-proxy -D`

# 使用

## 务必先初始化

`npx nice-proxy init`

> 该命令会在项目根目录生成一个`nice-proxy`文件夹。  
> `proxy-list.json`为代理列表文件。  
> `proxy-config.json`为你当前使用的代理配置。(此文件不要提交到`[GIT][SVN]`)  
> 具体可以看生成的`readme`文档

## 配置 webpack-dev-server

### vue-cli

如果你使用的是`vue-cli`创建的项目，那么在你的`vue.config.js`文件里这么去写。

```js
const { useNiceProxy } = require("nice-proxy");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "<url>",
        ws: true,
        changeOrigin: true,
        // 参考vue-cli官网配置示例，只需要添加下面这行参数。
        router: useNiceProxy,
      },
    },
  },
};
```

### webpack

如果你使用的是`webpack`，也只需要把你的`webpack.config.js`像上面修改一下即可。

# 提供的命令

## list 列出所有代理

- `npx nice-proxy list`
- `npx nice-proxy ls`

![](https://segmentfault.com/img/bVcWWXa)

## add 添加代理

- `npx nice-proxy add`

执行该命令后，界面会继续让你输入要添加的代理的相关信息。

![](https://segmentfault.com/img/bVcWWXb)

## change 切换代理

- `npx nice-proxy change`
- `npx nice-proxy use`

执行该命令后，界面会列出当前所有代理让你选择。

![](https://segmentfault.com/img/bVcWWXi)
![](https://segmentfault.com/img/bVcWWXj)

# TODO

- [x] 当有新的前端加入项目后，proxy-list文件已生成，但是proxy-config文件是没有的，需要有个命令能解决这个问题。

# FAQ

`vue-cli`目前使用的`webpack-dev-server`版本不高，在配置`proxy`的时候，`target`参数不能缺少。
