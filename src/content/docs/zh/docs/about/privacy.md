---
title: 隐私
description: mtty 和 miao 会发送什么、绝不发送什么，以及本站会收集什么。
---

大多数隐私页只能请读者相信厂商，因为除此之外别无他法。这两个产品是**开源的**，所以有别的办法:
本页每一条结论，都是关于**你能读到的代码**的结论 —— 而其中大多数甚至不需要你真的去读代码，一分钟
就能验完。

两个产品对网络的回答不同，因此下面分开写。

## 一句话

- **两个产品里都没有分析、遥测或使用上报。**
- **mtty 不会自己发任何请求。** 更新检查只在你主动触发时发生。
- **miao 默认会做更新检查**，在界面启动一秒后。可以关掉。
- 除这些更新检查之外，**两个项目都不会向本项目运行的服务器发送任何东西**。
- **本站没有分析脚本**，不加载任何第三方资源，字体由本站自己提供。

## mtty

### 没有任何上报

仓库里没有遥测、分析或崩溃上报代码，也没有任何会自行发起连接的代码。更新检查是调用 `curl` 子进程;
依赖树里那一个 HTTP 客户端服务于下文的 Markdown 远程图片。其余一切都是你自己发起的连接。正因为
如此，下面这份清单才能被完整列举出来 —— 而由于整个应用是开源的，**它也能被你逐条核对**。

### 更新检查

mtty 启动时不联系任何服务器。检查由菜单里的 **Check for Updates** 发起，以及更新对话框在失败后
提供的重试按钮。它就是一个请求:

```sh
curl -fsSL --max-time 8 <update-check-url>
```

该地址默认指向项目自己在 GitHub 上的发布清单;这个请求暴露的信息，等同于任何一次文件下载对提供方
暴露的信息。下载下来的产物会与清单声明的 `sha256` 核对，设置 `update-pubkey` 后还会额外校验
minisign 签名。把 `update-check-url` 指向空，就永远不会有任何抓取。见[配置](/zh/docs/mtty/config/)。

### 你自己发起的连接

其余离开这台机器的流量，都是你主动发起、连向你指定主机的:

| 内容 | 何时 |
|---|---|
| SSH、SFTP、FTP、端口转发 | 当你连接某台主机时 |
| MTP 控制面 | **每用户本地套接字**，仅属主可访问;Windows 上为命名管道 |
| 经 TCP 的 MTP | 只有你设了 `remote-listen` 才会启用，且**未设 `MTTY_MTP_TOKEN` 时拒绝启动** |
| 主机与命令片段同步 | 只有你设了 `sync-dir` 才会启用，默认未设 |

一个不明显、但值得知道的例外:Markdown 预览编译时带上了远程图片支持，所以**你打开的文档如果以 URL
引用了图片，它就会去取那张图**。

## miao

### 没有任何上报

仓库里不存在分析或使用上报 SDK。界面显示给你的那些数字 —— token 数、估算费用、首字节延迟、
提示缓存命中 —— 都是本地计算，从不上传。产品自己把这些叫做 "telemetry"(遥测)，但那指的是终端里
的一块面板，不是一次传输。

有两样东西接了线但没开:

- **OpenTelemetry 导出**:除非你自己设 `OTEL_EXPORTER_OTLP_ENDPOINT`，否则什么都不做。
- **错误上报**:只有在构建时提供 Sentry DSN 才会被编译进去。这里发布的版本构建时没有提供，因此不
  上报任何东西。如果这一点将来变了，本页也会跟着改。

### 更新检查默认开启

这是 miao 唯一自作主张的事。界面启动一秒后(不阻塞界面)，miao 会检查有没有新版本 —— 并且默认会
在后台装上;正在运行的进程仍用旧构建，只提示你重启以应用。取决于是怎么安装的，请求会发往
`github.com/oxdingzg/miao`、`api.github.com`、npm registry 或 Homebrew 的 formula 索引。

在 `miao.jsonc` 里关掉:

```jsonc
{ "autoupdate": false }
```

或设 `MIAO_DISABLE_AUTOUPDATE=1`。预览版与开发版从不自升级。

### 其余往外走的东西

| 内容 | 默认 |
|---|---|
| models.dev 目录(模型名、价格、限制) | 后台抓取，缓存 12 小时;离线时使用内置快照 |
| 模型供应商 API | 只有**你**配置的那些 |
| HTTP 服务与浏览器界面 | 需要手动开启;`miao serve` |
| 远程聊天桥接(微信、QQ) | 需要手动开启，且是连向那些平台自己的服务器 |
| 会话分享 | 已移除，没有后端 |

## 两者都不收集什么

这部分值得正面写清楚，因为人们通常默认它在发生:

- **没有账号。** 两个产品都不要求登录，也都没有可登录的服务器。
- **没有任何使用记录离开你的机器** —— 你用了哪些功能、跑了哪些命令、打开了哪些文件，都不外传。
- **没有崩溃上报**，除非你自己写一份。
- **没有广告、追踪或指纹识别**，产品与本站都没有。

## 本站

这里的文档页与营销页都是静态的。没有分析脚本、没有追踪像素、没有广告或同意书代码，也没有任何从
第三方域名加载的资源 —— 字体就来自本站域名。页面上对外的链接，只有你肉眼能看到的那几个。

有两点值得实测而不是假定:

- **不设任何 Cookie。** 连一个偏好 Cookie 都没有;你选的主题存在浏览器的 `localStorage` 里，
  从不发送到任何地方。
- **搜索在你的浏览器里跑。** 文档索引作为静态文件随站点一起提供，所以搜索查询在本地完成，
  不离开页面。

有一点要说清楚:本站经由 Cloudflare 提供服务，因此 Cloudflare 会看到任何主机或 CDN 都会看到的
东西 —— 请求的 IP 地址与 User-Agent。

## 自己验

这些就是上面那些结论背后的命令。前两条在 `miao-term` 的克隆里跑;后两条只要有终端就行。

**mtty 里有没有会替你做上报的东西?**

```sh
cargo tree -e normal --prefix none | awk '{print $1}' | sort -u \
  | grep -iE 'posthog|mixpanel|amplitude|sentry|datadog|telemetry|crashpad'
```

没有。**那有没有 HTTP 客户端?**

```sh
cargo tree -e normal --prefix none | awk '{print $1}' | sort -u \
  | grep -xE 'ureq|reqwest|hyper|isahc|curl|surf|minreq|attohttpc'
```

一行:`ureq` —— 就是上文提到的那个例外，由 Markdown 预览用来取远程图片。**这个例外是被这条命令
找出来的，不是被藏起来的。**更新检查不用它:那是 `curl` 子进程，在
[`crates/term-widget/src/lib.rs`](https://github.com/oxdingzg/miao-term/blob/main/crates/term-widget/src/lib.rs)
的 `check_updates` 里。

**本站会追踪你吗?**

```sh
curl -s https://mtty.dev/ | grep -ciE 'beacon\.min\.js|cloudflareinsights|googletagmanager|gtag\(|plausible|umami'
curl -sI https://mtty.dev/ | grep -ci set-cookie
```

两条都输出 `0`。如果你更愿意读而不是跑:本站的源码同样是公开的
[oxdingzg/mtty.dev](https://github.com/oxdingzg/mtty.dev)。

**以及一条完全不需要信任的检查。** 应用是开源的，你可以自己编译二进制，然后看它究竟打开了什么连接。
这里没有任何东西需要你相信 —— 公开代码的意义，正是让这份信任不必被索取。

## 联系

有疑问，或者发现本页与你的实际观察不符:写信到 <contact@mtty.dev>，或在
[mtty](https://github.com/oxdingzg/miao-term/issues) 与
[miao](https://github.com/oxdingzg/miao/issues) 开 issue。

*最后更新:2026-10-03。本页描述的是代码，所以代码变了它就会变 —— 各条结论的复核日期记录在*
[*许可与依赖政策*](https://github.com/oxdingzg/miao-term/blob/main/docs/decisions/0006-license-policy.zh-CN.md) *里。*
