# 学而记

暖白底、墨绿色的中文个人学习博客。文章用 Markdown 保存，通过 GitHub Actions 自动发布到 GitHub Pages。

- 网站：https://y123456-hzy.github.io/xue-er-ji/
- 仓库：https://github.com/Y123456-hzy/xue-er-ji
- 时区：Asia/Shanghai（北京时间）
- 原来的个人网站单独保留，本仓库不修改它。

## 在电脑上写文章

需要 Node.js 24 或更新的受支持版本、pnpm 11.10.0。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

打开终端给出的本地网址（带 `/xue-er-ji/` 路径）。文章放在 `src/content/posts/`，关于页在 `src/content/pages/about.md`。

1. 复制 `templates/note.md` 到 `src/content/posts/my-first-note.md`。
2. 修改标题、日期、摘要、标签和正文。把日期改成自己的实际发布日期。
3. 草稿写完后，将 `draft: true` 改成 `draft: false`。
4. 运行 `pnpm build` 检查格式并生成搜索索引。用 `pnpm preview` 检查最终页面和搜索。
5. 提交并推送到 `main`，GitHub Actions 会自动更新网站。

```bash
git add src/content/posts
git commit -m "添加学习笔记"
git push
```

建议文件名使用小写英文和短横线，发布后保持稳定。图片可放在 Markdown 文件旁边，用 `![图片说明](./diagram.png)` 引用。

## 直接在 GitHub 网页写

进入仓库的 `src/content/posts/` 文件夹，选择 **Add file → Create new file**，新建以 `.md` 结尾的文件，参考已有文章填写元信息和正文，然后提交到 `main`。

已有文章页面底部的「在 GitHub 编辑」也会跳到对应源文件。需要登录自己的 GitHub 账号才能修改。

## 构建检查与搜索

```bash
pnpm build
node scripts/verify.mjs
pnpm preview
```

搜索使用 Pagefind，构建时生成中文全文索引。开发预览中的索引来自上次构建，修改文章后需要重新运行 `pnpm build`。发布工作流会先构建、检查页面和链接，再上线。

## 草稿与私人内容

`draft: true` 的文章不会生成博客页面，也不会进入列表、RSS 和搜索。公开仓库里的草稿文件仍能被任何人看到。**私人笔记不要提交到这个仓库。**

## 修改博客

- 名称、介绍、作者、社交链接：`astro-paper.config.ts`
- 暖白、墨绿与深色配色：`src/styles/theme.css`
- 首页介绍：`src/pages/index.astro`
- 中文界面：`src/i18n/lang/zh-CN.ts`
- 发布流程：`.github/workflows/deploy.yml`

Pages 来源应设为 **GitHub Actions**。本项目使用 `/xue-er-ji/` 子目录；以后更换仓库名或域名时，同时修改 `astro.config.ts` 的 `base`、`astro-paper.config.ts` 的网址，并更新验证脚本中的部署路径。

## 模板来源

基于 [AstroPaper](https://github.com/satnaing/astro-paper)，保留原作者的 MIT 许可证。模板源提交：`6f61e2dc0e45bbcefc05f4055f293cd7f81bcb03`。已移除模板演示文章，改为中文使用说明。
