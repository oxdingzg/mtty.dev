---
title: miao 在 Windows 上
description: miao 的 Windows 下载包、PowerShell 安装方式与签名状态。
sidebar:
  order: 2
---

## Windows 版本与安装

miao 的 Windows 发布包是 `miao-windows-x64.zip`，内含命令行程序 `miao.exe`。当前版本没有 Authenticode 代码签名；SmartScreen 可能提示 Windows 无法识别发布者。

可在 PowerShell 中运行安装脚本：

```powershell
irm https://mtty.dev/miao/install.ps1 | iex
```

脚本从 [miao GitHub Releases](https://github.com/oxdingzg/miao/releases) 下载 ZIP，并安装到当前用户目录，不需要管理员权限。也可以从官方发布页手动下载并解压 `miao-windows-x64.zip`。

安装脚本与直接运行 `miao.exe` 的提示不同：SmartScreen 的“Windows 已保护你的电脑”通常在启动下载的 `.exe` 时出现。若看到提示，先核对应用名称和下载来源，再按[共用的 Windows 安全提示说明](/zh/docs/about/windows-downloads/)处理。杀毒软件报告威胁时不要放行。
