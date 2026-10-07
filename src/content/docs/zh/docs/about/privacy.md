---
title: 隐私
description: 项目数据存放在哪里，以及由哪些服务处理。
---

## 项目数据

mtty 在本机保存配置、主机库和工作区状态。它托管你选择的代理工具，自己不调用模型 API。
SSH 与文件传输连接你选择的主机；Markdown 预览可能获取文档引用的远程图片。
可选的加密主机与片段同步会写入你配置的同步目录。

miao 在本地保存会话历史，并将完成任务所需的上下文发送给你配置的模型供应商。
其中可能包含提示、代码和工具输出。供应商账号及数据处理适用该供应商的条款。
你配置的 MCP、插件与远程工具也有各自的数据流。

miao 显示的 token 和费用是本地估算，不是账单记录。OpenTelemetry 导出仅在设置
`OTEL_EXPORTER_OTLP_ENDPOINT` 后启用；桌面错误上报取决于构建时的 Sentry DSN。
官方发布构建未配置该 DSN。

## 远程访问

Remote Control 是可选功能。你将某个 miao 窗口连接到自己部署的 Hub，登录该 Hub，
再在本地批准限定范围的设备授权。Hub 保存账号与路由元数据、转发加密流量；执行和会话历史
仍在运行 miao 的机器上。见[远程控制](/zh/docs/miao/remote/)。

mtty 的控制面通常使用仅属主可访问的本地套接字（Windows 上为命名管道）；可选的 TCP
监听需要令牌。配置方式见[控制面文档](/zh/docs/mtty/cli/)。

## 本站

mtty.dev 通过 Cloudflare 提供静态页面，由其处理访问请求与站点统计。
文档搜索使用浏览器内的静态索引，主题偏好保存在浏览器的 `localStorage` 中。

## 联系

数据处理相关问题可发邮件至 <contact@mtty.dev>，或在
[mtty](https://github.com/oxdingzg/mtty/issues)、
[miao](https://github.com/oxdingzg/miao/issues) 或
[本站](https://github.com/oxdingzg/mtty.dev/issues) 提交 issue。

*核对日期：2026-10-07。*
