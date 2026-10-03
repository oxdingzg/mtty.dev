---
title: Windows 下载与运行提示
description: miao 当前 Windows 版本未签名时，SmartScreen 等 Windows 安全提示的含义与处理方法。
sidebar:
  order: 2
---

## 当前情况

miao 当前发布的 Windows 压缩包和 `miao.exe` **没有 Authenticode 代码签名**。这不表示程序被判定为恶意软件；它表示 Windows 无法通过代码签名确认发布者身份和文件签名完整性。

请只从 [miao GitHub Releases](https://github.com/oxdingzg/miao/releases) 下载官方版本。Windows 安装脚本会从该发布页下载并解压程序到当前用户目录，不需要管理员权限。

## 可能看到的提示

### Microsoft Defender SmartScreen：“Windows 已保护你的电脑”

首次运行从网上下载的 `miao.exe` 时，Windows 可能显示蓝色提示，称 SmartScreen 阻止了一个无法识别的应用。未签名且缺少下载信誉的程序更容易触发这类提示。不同 Windows 版本、下载量和设备策略会让提示有所不同，也可能不出现。

![Windows Defender SmartScreen 提示示例。选择“更多信息”后，通常会显示“仍要运行”选项。此截图来自 Windows 10，其他版本的界面可能不同。](/shots/windows-smartscreen.png)

截图来源：[Wikimedia Commons 上的 Microsoft Defender SmartScreen 截图](https://commons.wikimedia.org/wiki/File:Windows-protected-your-pc-more-info.png)。

如果你确认文件来自上面的官方 Releases 页面，且设备允许自行决定：

1. 在提示中选择 **“更多信息”**。
2. 确认显示的应用是 `miao.exe` 后，选择 **“仍要运行”**。

如果没有“仍要运行”，或者设备由组织管理并禁止运行，请不要关闭 SmartScreen 或 Smart App Control 来绕过限制；联系设备管理员，或等待提供已签名的版本。

### “未知发布者”

若 Windows 显示发布者未知，通常是因为该文件没有数字签名。miao 是命令行程序，通常不需要管理员权限；如果看到要求提升权限的 UAC 窗口，请先取消，再从普通 PowerShell 或 Windows Terminal 中运行 `miao`。安装脚本也会安装到用户目录，不应要求管理员权限。

### 杀毒软件报告威胁

杀毒软件的恶意软件检测与代码签名提示不是一回事。若 Microsoft Defender 或其他杀毒软件明确报告检测到威胁，不要按上述步骤放行；停止运行，核对下载来源，并通过 [GitHub Issues](https://github.com/oxdingzg/miao/issues) 报告版本号和检测名称。

## 为什么签名重要

代码签名可以让 Windows 和用户识别签名证书中的发布者，并检查签名后文件是否被改动。未签名时，Windows 无法显示可验证的发布者，SmartScreen 也可能因为该程序缺少信誉而提醒用户。签名有助于建立信任，但不能保证 SmartScreen 永远不显示警告；Windows 仍会结合文件和下载信誉、设备设置等因素判断。

## PowerShell 安装方式

在 PowerShell 中执行下面命令会下载安装脚本并在当前会话中运行：

```powershell
irm https://mtty.dev/miao/install.ps1 | iex
```

这条命令下载的是 PowerShell 脚本，脚本会获取并解压 Windows 发布包。它与双击从浏览器下载的 `.exe` 不同，SmartScreen 的“未知应用”对话框通常是在尝试启动可执行文件时出现。安装完成后，若你之后直接运行下载的 `miao.exe`，仍可能看到前述提示。

:::tip
安装脚本不是代码签名的替代品。若不想运行远程脚本，也可以从官方 Releases 页面下载 `miao-windows-x64.zip`，解压后在终端中运行 `miao.exe`。
:::
