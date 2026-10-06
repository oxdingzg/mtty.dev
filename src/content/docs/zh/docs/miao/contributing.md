---
title: 参与贡献
description: 如何向 miao 报告问题与提交改动。
sidebar:
  order: 6
---

miao 以 MIT 协议授权，在 [oxdingzg/miao](https://github.com/oxdingzg/miao) 公开开发。完整
指南是仓库中的
[`CONTRIBUTING.md`](https://github.com/oxdingzg/miao/blob/main/CONTRIBUTING.md);本页是简要版。

## 动手写代码之前:先开 issue

**每个 pull request 都必须引用一个已存在的 issue。** 请先开一个 issue 描述 bug 或功能需求 ——
这便于维护者分类处理，也避免两个人做同一件事。没有关联 issue 的 PR 可能不经审阅就被关闭。

在 PR 描述里用 `Fixes #123` 或 `Closes #123` 关联 issue。小改动写个简短的 issue 就够了:只要
能让维护者理解问题。

任何人都可以在 [github.com/oxdingzg/miao/issues](https://github.com/oxdingzg/miao/issues) 开
issue。

## Pull request

- 保持**小而聚焦**。
- 说明问题是什么，以及你的改动为什么能解决它。
- 添加新功能前，先确认代码库里没有已有实现。
- **UI 改动**:附上改动前后的截图或视频。
- **逻辑改动**(修 bug、新功能、重构):说明你**如何验证** —— 测了什么，审阅者怎么复现。

不接受冗长、AI 生成的 PR 描述与 issue，这类内容可能被直接忽略:请用自己的话写简短、聚焦的描述。
如果说不清楚，那多半是改动太大了。

### 标题

标题遵循 conventional commits，可选地带上 scope:

```text
feat: add dark mode support
fix: resolve crash on startup
docs: update contributing guidelines
chore: bump dependency versions
feat(app): add dark mode support
fix(desktop): resolve crash on startup
```

前缀有 `feat:`、`fix:`、`docs:`、`chore:`、`refactor:` 与 `test:`。

## 参与开发

开发环境准备、从源码运行的命令、API 服务、Web 应用与桌面应用的跑法，以及调试器配置，都在
[`CONTRIBUTING.md`](https://github.com/oxdingzg/miao/blob/main/CONTRIBUTING.md) 里。
[使用指南](/zh/docs/miao/guide/) 讲的是安装与使用发布版代理，通常是从这里上手更快。

## 安全

漏洞请不要走 issue —— 见[安全](/zh/docs/miao/security/)。

## 许可

miao 以 MIT 协议授权。提交贡献即表示你同意你的贡献以同一协议提供。
