---
title: "用微信或 QQ 遥控会话"
sidebar:
  order: 3
---

:::caution[实验性]
`miao remote` 已能端到端使用，但仍属实验性。腾讯既未允许也未禁止第三方微信客户端；见**限制与风险**。
:::

`miao remote` 在 `127.0.0.1` 上同时运行 miao 服务和你的 IM 通道，于是你可以在手机上列出会话、新建会话、发 prompt、审批工具调用和中断。同一批会话也能在桌面上用 `miao attach` 看到，因此可以在微信里开始、在终端里收尾。

## 登录与运行

```sh
miao remote login wechat   # 用微信扫码
miao remote login qq       # 用手机 QQ 扫码，创建机器人并连接
miao remote                # 前台运行（调试用）
miao remote install        # 写 launchd 代理并打印加载方式
miao remote status         # 通道状态、今日主动推送用量、待取结果
miao remote uninstall
```

即使还没有账号，`miao remote` 也能启动；之后登录的账号立即生效，`miao remote login` 会通过正在运行的守护进程完成，无需重启。用下面的命令在桌面打开同一批会话：

```sh
miao attach http://127.0.0.1:4097
```

## TUI 里的 `/remote` 对话框

TUI 中的 `/remote` 显示守护进程和每个已连接账号，可登录新账号（二维码直接画在对话框里）、发送测试消息、断开连接。第一个账号可以完全在这里配置，不用 CLI：没有守护进程时，在连接器上按回车即在本机登录，随后 *start daemon (launchd)* 或 *start once (background)* 会显示确切命令，只有你确认后才运行。正在运行的守护进程也能在同一对话框里停止，同样需要确认。

## IM 应用里的命令

发送 `/help` 查看列表。不以 `/` 开头的文字发给当前会话。

| 命令 | 作用 |
|---|---|
| `/list` | 会话列表：编号、项目、标题、状态、最后活动时间（等你的排在最前） |
| `/use 2` | 把 #2 设为当前会话 |
| `/new miao 修一下 README` | 在项目 `miao` 里新建会话，可带第一条 prompt |
| `/projects` | 允许遥控的项目及其别名 |
| `#2 消息` | 发给 #2 而不切换当前会话 |
| `/queue 消息` | 按排队投递，而不是 steer 正在运行的一轮 |
| `/stop` | 中断当前会话（`#2 /stop` 中断指定会话） |
| `/r` | 取回超出回复窗口而暂存的结果 |
| `/status` | 当前会话最近一轮的摘要：工具、改动文件、花费 |
| `/help` | 命令与帮助 |

会话编号是本地短编号，映射到真实 Session ID，重启后仍保留。会话正在运行时，新消息会在下一个安全的供应商轮次边界 **steer** 它（与 TUI 默认一致）；`/queue` 则等到会话本会空闲时再投递。

### 审批与问答

远程会话请求权限时，请求会带着短回复码到达聊天：

```
【#2 miao】请求执行 bash：
  rm -rf dist && bun run build
回复 y7 允许一次 · a7 总是允许 · n7 拒绝
```

`y7` / `a7` / `n7` 分别对应*一次* / *总是* / *拒绝*；回复码只对该用户有效，并会过期（默认 30 分钟）。问答类提示会列出编号选项，回复编号即可。

## 配置

```jsonc
{
  "remote": {
    "port": 4097,
    "projects": { "miao": "~/workspace/code/github/miao" },
    "wechat": { "push_budget_per_day": 4 },
    "qq": { "markdown": true },
  },
}
```

| 键 | 作用 |
|---|---|
| `remote.port` | 服务在 `127.0.0.1` 上监听的端口（默认 4097） |
| `remote.projects` | 别名 → 目录；IM 用户只能在这些目录内列出、新建和驱动会话 |
| `remote.wechat.push_budget_per_day` | 每天允许的微信主动推送条数（默认 4） |
| `remote.qq` | `markdown`（默认 true），以及可选的 `api` / `portal` 主机 |
| `remote.connectors` | 要加载的第三方 IM 连接器（npm 包名或本地路径） |
| `remote.settings` | 按连接器 id 索引的连接器设置 |

第三方连接器需导出一个用 `@miao/remote` 的 `defineConnector` 构建的连接器。飞书和 Telegram 已在计划中。

## 安全

- 只接受扫码登录者本人账号的消息；其余一律忽略并记日志。
- `/new` 只能在 `remote.projects` 内新建会话，因此手机无法驱动任意仓库。
- 远程发起的 prompt 绝不自动放行工具；审批在聊天里完成，也不提供 `--auto`。
- 凭证（bot token 等）存进 miao 现有的凭证存储，权限 `0600`；游标和路由状态在 `~/.local/state/miao/remote/`。
- 同一个 bot 同时只允许一个 `miao remote` 轮询；入站消息会去重。

## 限制与风险

微信（iLink）通道受平台约束，miao 在其限制内工作：

- 回复必须在你的消息之后约**两分钟**内发出，一个 `context_token` 大约允许十条回复。更晚完成的结果会暂存，直到你再次发消息或发送 `/r`。
- 主动消息（非回复）每天大约 **5–6 条**后就会被限流；默认预算是 4，超出预算的结果进入待取队列。
- 只能与扫码者一对一私聊——不支持群和按钮。
- 腾讯没有明确允许或禁止第三方客户端。有 bot 下行被风控数天到数周的报告；`miao remote login wechat` 会打印这一警告。

QQ 会在你发消息后的几分钟内回复，随后转为主动消息，因此除非关闭机器人的主动消息，结果通常能按时到达。

还有一个**单写者**约束：会话执行只在单个进程内协调。要从 IM 驱动的会话必须运行在 `miao remote` 服务里；在桌面上用 `miao attach` 打开。单独启动的 TUI 里的会话会出现在 `/list`，但本版本无法驱动。跨进程 fencing 已在路线图上。

## 相关

- 这些会话使用的[供应商层](/zh/docs/miao/providers/)
- [安全策略](/zh/docs/miao/security/)
- [miao 使用指南](/zh/docs/miao/guide/)中的配置优先级与会话
