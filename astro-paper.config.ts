import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://y123456-hzy.github.io/xue-er-ji/",
    title: "学而记",
    description: "学习笔记和备忘。",
    author: "Y123456-hzy",
    profile: "https://github.com/Y123456-hzy",
    ogImage: "social-card.png",
    lang: "zh-CN",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: { perPage: 8, perIndex: 5 },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/Y123456-hzy/xue-er-ji/edit/main/",
    },
    search: "pagefind",
    toc: true,
  },
  socials: [
    {
      name: "github",
      url: "https://github.com/Y123456-hzy/xue-er-ji",
      linkTitle: "查看学而记的 GitHub 仓库",
    },
  ],
  shareLinks: [],
});
