---
title: Windows 下载与安全提示
description: miao 与 mtty 共用的 SmartScreen 处理方法，以及各自的签名差异。
sidebar:
  order: 3
---

## 两个产品共通的情况

**miao 和 mtty 当前的 Windows 版本都没有 Authenticode 发布者签名。** 因此，运行下载的程序时 Windows 可能显示 SmartScreen 警告；安装程序请求管理员权限时，也可能显示“未知发布者”。具体文字取决于 Windows 版本、下载信誉和设备策略，提示也不一定每次都会出现。

这类提示表示 Windows 无法验证发布者，并不等于软件被判定为恶意程序。杀毒软件单独报告威胁则是另一回事：若 Defender 或其他杀毒软件明确报出威胁，请停止运行并报告版本号和检测名称，不要放行。

### SmartScreen：“Windows 已保护你的电脑”

下图是 SmartScreen 提示的一种样式。点击 **“更多信息”** 后，会显示应用名称；若设备策略允许，通常还会出现 **“仍要运行”**。

![Windows Defender SmartScreen 警告。箭头指向“更多信息”；展开后通常会出现“仍要运行”。截图来自 Windows 10，较新版本的界面可能不同。](/shots/windows-smartscreen.png)

截图来源：[Wikimedia Commons 上的 Microsoft Defender SmartScreen 截图](https://commons.wikimedia.org/wiki/File:Windows-protected-your-pc-more-info.png)。

只有在文件来自项目官方发布页、显示的应用名称也与要运行的文件相符时，才继续操作：

1. 选择 **“更多信息”**。
2. 核对显示的应用名称。
3. 若有 **“仍要运行”** 选项，再选择它。

如果设备由组织管理并禁止运行，或没有“仍要运行”，请联系设备管理员。不要为了绕过限制而关闭 SmartScreen 或 Smart App Control。代码签名有助于识别发布者，但应用信誉不足时，SmartScreen 仍可能发出警告。

## miao 与 mtty 的不同之处

| | miao | mtty |
|---|---|---|
| Windows 下载包 | `miao-windows-x64.zip`，内含 `miao.exe` | `mtty-windows-x86_64.zip`，或 `mtty-app-<版本>-x86_64.msi` |
| 安装方式 | PowerShell 脚本，或手动解压 ZIP；安装到当前用户目录 | MSI 安装程序，或手动解压 ZIP |
| Windows Authenticode 签名 | `miao.exe` 未签名 | 当前 MSI 和 ZIP 中的程序均未签名。`v0.1.2` 发布流水线因未配置 Windows 证书而跳过 MSI 签名。 |
| 额外发布签名 | 当前 miao Windows 下载项没有随包提供 detached 签名 | Windows ZIP 和 MSI 带有独立的 `.sig` 文件及 minisign 公钥，可用于校验下载文件；这不是 Authenticode 签名，Windows 不会把它当作发布者身份，也不会因此消除 SmartScreen 提示。 |

miao 请从 [miao GitHub Releases](https://github.com/oxdingzg/miao/releases) 下载，mtty 请从 [mtty GitHub Releases](https://github.com/oxdingzg/mtty/releases) 下载。miao 的[指南](/zh/docs/miao/guide/)介绍了 PowerShell 安装与 Windows 提示；mtty 的[安装指南](/zh/docs/mtty/install/)介绍了 MSI 和 ZIP。

关于 mtty v0.1.2 的签名状态，可查看[发布文件](https://github.com/oxdingzg/mtty/releases/tag/v0.1.2)和 [Windows 发布工作流](https://github.com/oxdingzg/mtty/actions/runs/37131514776)。
