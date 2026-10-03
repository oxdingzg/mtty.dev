---
title: Windows download and run warnings
description: What Windows security prompts mean for the currently unsigned miao release, and how to handle them.
sidebar:
  order: 2
---

## Current status

miao's current Windows release archives and `miao.exe` are **not Authenticode-signed**. This does not mean the program was identified as malware. It means Windows cannot use a code-signing certificate to verify the publisher and signature integrity.

Download releases only from [miao GitHub Releases](https://github.com/oxdingzg/miao/releases). The Windows install script downloads and extracts the program from that release page into the current user's directory; it does not need administrator privileges.

## Prompts you may see

### Microsoft Defender SmartScreen: “Windows protected your PC”

When you first run `miao.exe` downloaded from the internet, Windows may show a blue SmartScreen dialog saying it prevented an unrecognized app from starting. Unsigned apps with little download reputation are more likely to trigger it. The exact prompt varies with the Windows version, download reputation, and device policy; it may not appear at all.

![Example Microsoft Defender SmartScreen dialog. After selecting More info, a Run anyway option is usually shown. This screenshot is from Windows 10; other versions may look different.](/shots/windows-smartscreen.png)

Screenshot source: [Microsoft Defender SmartScreen screenshot on Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Windows-protected-your-pc-more-info.png).

If you verified that the file came from the official Releases page above and your device allows you to decide:

1. Select **More info** in the prompt.
2. Check that the app is `miao.exe`, then select **Run anyway**.

If **Run anyway** is unavailable, or your organization manages the device and blocks the app, do not turn off SmartScreen or Smart App Control to get around the restriction. Ask your administrator or wait for a signed release.

### “Unknown publisher”

Windows may show an unknown publisher because the file has no digital signature. miao is a command-line program and normally does not need administrator privileges. If you see a UAC prompt asking to elevate privileges, cancel it and run `miao` from a normal PowerShell or Windows Terminal session. The installer also installs into your user directory and should not ask for administrator access.

### Antivirus threat detection

An antivirus malware detection is different from a code-signing warning. If Microsoft Defender or another antivirus explicitly reports a threat, do not follow the steps above to allow it. Stop, verify the download source, and report the version and detection name through [GitHub Issues](https://github.com/oxdingzg/miao/issues).

## Why signing matters

Code signing lets Windows and users identify the publisher named in a certificate and check whether a signed file has changed. Without a signature, Windows cannot show a verifiable publisher, and SmartScreen may warn because the app has little reputation. Signing helps establish trust, but it does not guarantee SmartScreen will never show a warning; Windows also considers file and download reputation and device settings.

## Installing from PowerShell

Running this command in PowerShell downloads an install script and runs it in the current session:

```powershell
irm https://mtty.dev/miao/install.ps1 | iex
```

This downloads a PowerShell script, which then fetches and extracts the Windows release. It differs from double-clicking an `.exe` downloaded in a browser: the SmartScreen “unrecognized app” dialog usually appears when starting an executable. If you later run the downloaded `miao.exe` directly, you may still see the warning above.

:::tip
The install script is not a substitute for code signing. If you prefer not to run a remote script, download `miao-windows-x64.zip` from the official Releases page, extract it, and run `miao.exe` from a terminal.
:::
