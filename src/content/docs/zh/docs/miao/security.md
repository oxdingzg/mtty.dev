---
title: 安全
description: miao 的威胁模型、不在受理范围内的情形，以及如何报告漏洞。
sidebar:
  order: 8
---

完整策略见仓库中的 [`SECURITY.md`](https://github.com/oxdingzg/miao/blob/main/SECURITY.md)。
本页是它的摘要。

:::danger[不接受 AI 生成的安全报告]
我们不接受 AI 生成的安全报告。此类报告数量很大，而我们完全没有资源逐份审阅。提交此类报告会被直接
封禁。
:::

## 威胁模型

miao 是运行在你本机的 AI 编程助手。它提供一套代理系统，可访问能力很强的工具，包括执行 shell、
操作文件和访问网络。

### 沙箱

**默认情况下，代理不被沙箱隔离。** 权限系统是一项体验功能:它在执行命令、写入文件等操作前请求确认，
帮助你了解代理在做什么。它**不是**用来提供安全隔离的。如果你需要真正的隔离，请在 Docker 容器或
虚拟机中运行 miao。

**此外还有一个可选开启的内核级沙箱** —— 上游的策略文件写在它出现之前。V2 `bash` 工具可以让每条命令
跑在操作系统的沙箱里:macOS 上是 seatbelt，Linux 上是 Landlock;Windows 没有后端。**不开就不生效:**

```jsonc
{ "sandbox": { "mode": "workspace-write", "network": true } }
```

有两个细节属于安全页，而不只属于使用指南:

- **它默认是"失败即放行"。** 若请求了沙箱但后端不可用，`on_unavailable` 默认是 `"warn"`，
  命令会**在没有沙箱的情况下执行**。想让它直接拒绝，设为 `"fail"`。
- `workspace-write` 限制的是**写入**，不是读取。网络默认允许，除非你显式禁止。

平台限制见[使用指南](/zh/docs/miao/guide/)中的内核级沙箱一节，以及
[可用性对照表](/zh/docs/miao/miao-vs-opencode/)。

:::caution[上游策略文件在这一处落后于代码]
`SECURITY.md` 至今仍写着 miao 没有沙箱。但使用指南与
[`crates/miao-sandbox`](https://github.com/oxdingzg/miao/tree/main/crates/miao-sandbox) 都表明
相反。本页以代码为准;那份策略文件需要更新。
:::

### 服务端模式

服务端模式需要手动开启。开启后请设置 `MIAO_SERVER_PASSWORD` 以启用 HTTP Basic Auth;不设置时
服务会以未认证状态运行，并给出警告。保护该服务是使用者自己的责任，它提供的任何功能都不构成漏洞。

## 不在受理范围内

| 类别 | 理由 |
|---|---|
| 开启服务端后的访问 | 启用服务端模式后，API 可被访问是预期行为 |
| 权限系统的"沙箱逃逸" | 那套系统本身不是沙箱 —— 见上文[沙箱](#沙箱) |
| LLM 供应商的数据处理 | 发送给你所配置供应商的数据由他们的策略约束 |
| MCP 服务端行为 | 你自己配置的外部 MCP 服务端不在我们的信任边界内 |
| 恶意配置文件 | 配置由你自己掌控，修改它不构成攻击途径 |

## 报告漏洞

请使用 GitHub Security Advisory 的
[「Report a Vulnerability」](https://github.com/oxdingzg/miao/security/advisories/new) 入口。

团队会回信说明后续处理步骤。首次回复之后，我们会持续同步修复与公开披露的进展，并可能向你询问更多
信息。

如果 **6 个工作日**内没有收到确认，请在 advisory 线程里追问。
