# AGENTS.md - 项目编码规范

> 本文件为大模型（Agent）在本项目中编写代码时必须遵守的规则。以下规则按本仓库实际结构编写。

## 1. 仓库概览（实际结构）

- 纯静态 HTML/CSS/JS 课程作业集合：**没有** `package.json`、构建、测试、lint 或 dev server，直接用浏览器打开 HTML 预览。
- **根目录 `index.html` 是唯一首页**（个人作业导航页），其他页面一律不得再命名为 `index.html`。
- 根目录页面：
  - 移动端交互任务：`touch-probe.html`（任务一 触摸事件探针）、`mobile-gesture.html`（任务二 美食卡片滑动）、`mobile-zoom.html`（任务三 图片查看器）、`mobile-sensor.html`（任务四 摇一摇抽菜谱）。
  - 课堂练习：`swiper-task.html`（Swiper 轮播）、`tab-news.html`（Tab 选项卡）、`tushuwenjian.html`（图书分类）、`svg.html`（SVG 图标）、`review-flex.html`（布局复习）。
- 资源目录：
  - `css/`（flex-css.css、svg.css）、`js/`（tab.js）、根目录 `24002120407*.css` 为课堂样式。
  - `font/`：iconfont 字体与 `demo_index.html`（第三方生成文件，不要改）。
  - `swiper/`：Swiper 库与官方 demo；`swiper-imgs/`：轮播图片素材。
  - `videos/`：任务三、任务四演示视频 mp4；`db/`：db.json。
  - `ryhhhhh/` 只有 README，没有页面。
- `.trae/`、`.trae-html-share-packages/`、`.screenshots/` 为本地工具产物，不属于网站内容。
- 文档：`任务提示词汇总.md` 记录各任务的原始提示词。

## 2. 命名规范

- 新写的 CSS 类名、id、JS 变量与函数统一用 `yhr_` 前缀（id 可用 `yhrXxx` 驼峰，与现有页面一致）。
- 首页三处入口的钩子类名固定不变：侧边栏 `course-list`、模块卡片 `module-card`、页脚 `footer-links`。
- 修改旧文件时沿用该文件现有风格，不做无谓重命名。

## 3. 新建页面必须做的事

1. 加文件头注释（格式见第 4 节）。
2. 页面内加入返回首页链接：`<a id="yhr_homeLink" href="index.html">← 返回首页</a>`（根目录页面；更深目录按层级调整相对路径）。
3. 在根目录 `index.html` **三处**同步加入口，全部使用相对路径：
   - 侧边栏 `ul.course-list` 对应分组下加 `<li><a>`；
   - 主内容对应分区加一张 `module-card` 卡片；
   - 页脚 `nav.footer-links` 加一条链接。
4. 不得新建第二个 `index.html`。

## 4. 注释规范

- **新建 HTML 文件头部**必须加入文件级注释，放在 `<!DOCTYPE html>` 之后、`<html>` 之前：

```html
<!--
=========================================================
 * 文件名称：xxx.html
 * 作    者：叶浩然
 * 学    号：24002120407
 * 建立时间：YYYY-MM-DD
 * 大模型：Trae
 * 功能名称：一句话描述本页功能
 * =========================================================
-->
```

- **新建 JS 文件**开头使用同样的块注释（`/* ... */`）。
- **每一个函数**（普通函数、类方法、箭头函数、回调）上方必须加 JSDoc 风格注释，写清"函数主要实现功能"，多参数写清含义，有返回值写清返回内容：

```javascript
/**
 * 函数主要实现功能：xxx
 * @param {类型} 参数名 - 参数说明
 * @returns {类型} 返回值说明
 */
function yhr_xxx(参数名) { ... }
```

- 修改旧文件时：原文件已有注释风格的跟随原风格；无注释的按上述规范补齐。

## 5. 其他规则

- 优先使用原生 HTML / CSS / JS，不引入第三方库（Swiper 课堂任务使用本地 `swiper/` 中的库）。
- 外部资源一律相对路径，**不使用 CDN**（课堂作业要求）。
- 路径和内容含中文，统一 UTF-8；PowerShell 控制台乱码不代表文件损坏。
- 页面中 `<script>` 标签放置在 `</body>` 之前。
- 改完 HTML 后确认引用的 CSS / JS / 图片 / 视频确实存在。

## 6. Git / 推送

- 远程为 **GitHub**：`https://github.com/YHR12321/yehaoran`，默认分支 `master`，使用 SSH 推送。
- 提交前先 `git status` 确认改动范围，避免把无关文件一起提交。
- **不要提交** `.trae/`（本地配置，可能含敏感信息）、`.screenshots/`。
- `videos/` 下的 mp4 每个小于 50MB，可直接提交；引用视频必须复制到 `videos/` 内，不要引用微信缓存等外部目录。
