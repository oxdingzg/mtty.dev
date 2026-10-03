---
title: miao on Windows
description: Windows downloads, PowerShell installation, and the signing status for miao.
sidebar:
  order: 2
---

## Windows release and installation

miao's Windows release archive is `miao-windows-x64.zip`, containing the command-line program `miao.exe`. The current release has no Authenticode code signature, so SmartScreen may say that Windows cannot identify its publisher.

Run the install script from PowerShell:

```powershell
irm https://mtty.dev/miao/install.ps1 | iex
```

The script downloads the ZIP from [miao GitHub Releases](https://github.com/oxdingzg/miao/releases) and installs it into the current user's directory; administrator access is not needed. You can also download and extract `miao-windows-x64.zip` manually from the official release page.

The install script and launching `miao.exe` can produce different prompts: the SmartScreen “Windows protected your PC” dialog usually appears when starting the downloaded executable. If it appears, verify the app name and download source, then follow the [shared Windows security guidance](/docs/about/windows-downloads/). Do not allow an antivirus threat detection.
