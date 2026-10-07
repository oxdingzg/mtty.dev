---
title: 许可
description: 两个项目各自的协议，以及它们内部各组件的协议。
---

这里的两个项目都是开源的，因此没有单独的协议要接受，也没有东西要签:协议本身就是全部 —— 你可以读源码、
自行构建、修改并再分发。

## mtty —— Apache License 2.0

完整文本见仓库的
[`LICENSE`](https://github.com/oxdingzg/mtty/blob/main/LICENSE)。

Apache-2.0 允许你使用、修改和再分发 mtty，包括商用。作为交换，它要求你随软件保留许可证与相关声明、
说明你做了哪些修改，并且不得用项目名义暗示背书。

## miao —— MIT

miao 以 MIT 协议授权。它是 [opencode](https://github.com/anomalyco/opencode)(同为 MIT)的衍生
项目，其 [`LICENSE`](https://github.com/oxdingzg/miao/blob/main/LICENSE) **同时保留两条版权行** ——
miao 作者的 2026 与 opencode 的 2025 —— 因为 MIT 要求上游声明随每一份副本一同传递。

## 它们内部有什么

两个项目都不是单人作品，内部的组件各自适用自己的条款。有四处容易被忽略:

- **随包字体不在 mtty 的 Apache-2.0 覆盖范围内。** 每一项都有自己的文件与协议:JetBrains Mono
  (SIL Open Font License 1.1，**经过修改** —— 合入了 Noto Sans 符号以补足字形)、Symbols Nerd
  Font(MIT)、Tabler Icons 子集(MIT)。表格见
  [`assets/fonts/README.md`](https://github.com/oxdingzg/mtty/blob/main/assets/fonts/README.md)。
- **带本地补丁内嵌的 crate 保留上游协议**：`muda`（Apache-2.0 OR MIT）、
  `egui_commonmark`（MIT OR Apache-2.0）与 `winit`（Apache-2.0）。
- **[bat](https://github.com/sharkdp/bat) 内嵌的语法定义**各自保留独立的协议与来源说明;逐条表格见
  [`docs/third-party/SYNTAXES.md`](https://github.com/oxdingzg/mtty/blob/main/docs/third-party/SYNTAXES.md)。
- **其余都是依赖项**，在工作区各 `Cargo.toml` 中声明，其协议取自项目在
  [`deny.toml`](https://github.com/oxdingzg/mtty/blob/main/deny.toml) 中维护的白名单，政策见
  [ADR 0006](https://github.com/oxdingzg/mtty/blob/main/docs/decisions/0006-license-policy.zh-CN.md)。
  以当前配置为准，其中还记录了 BSL-1.0、CDLA-Permissive-2.0、Apache-2.0 WITH LLVM-exception 等宽松许可表达式。

## 本站

文档页与营销页由 [Astro](https://astro.build) 与
[Starlight](https://starlight.astro.build) 构建(均为 MIT)，使用 Instrument Serif、
Instrument Sans 与 JetBrains Mono(均为 SIL Open Font License 1.1)。

`/docs/` 下从产品仓库同步而来的页面，适用该项目的协议;每一页的页脚都标注了它来自哪个提交。
