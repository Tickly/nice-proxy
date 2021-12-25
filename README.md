# nice-proxy

> 刚起步的项目，功能并不是很完善，欢迎提意见。

每次切换代理难道都要重启任务吗？大可不必！

# 安装

`yarn add nice-proxy`

# 使用

## 务必先初始化

`npx nice-proxy init`

该命令会在项目根目录生成一个`nice-proxy`文件夹。

其中`proxy-list.json`为代理列表文件。`proxy-config.json`为你当前使用的代理配置。

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

下面的命令都可以

- `npx nice-proxy list`
- `npx nice-proxy ls`

## add 添加代理

- `npx nice-proxy add`

执行该命令后，界面会继续让你输入要添加的代理的相关信息。

## change 切换代理

- `npx nice-proxy change`
- `npx nice-proxy use`

执行该命令后，界面会列出当前所有代理让你选择。
