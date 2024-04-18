- content_scripts 特定域名下注入的脚本
- background 字段指定了后台页面的路径为 "background.js"，这个文件将作为 service，worker 运行。你需要确保 background.js 文件位于你的扩展目录中，并包含你的后台脚本逻辑。
  service worker 是一个可以在后台运行的脚本，它可以监听并响应来自扩展的事件，例如页面加载、消息传递等。你可以在 service worker 中执行一些与网络请求相关的操作，例如缓存、代理等。
-