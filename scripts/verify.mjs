import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(project, "dist");
const origin = "https://y123456-hzy.github.io";
const base = "/xue-er-ji/";
const required = ["index.html", "posts/index.html", "tags/index.html", "about/index.html", "archives/index.html", "search/index.html", "404.html", "rss.xml", "sitemap-index.xml", "pagefind/pagefind.js", "pagefind/pagefind-entry.json", "social-card.png"];
for (const file of required) assert.ok(existsSync(join(dist, file)), `Missing build output: ${file}`);

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
let links = 0;
const pages = walk(dist).filter(file => file.endsWith(".html"));
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  assert.match(html, /lang="zh-CN"/, `Wrong language: ${page}`);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/);
  assert.ok(canonical?.[1].startsWith(origin + base), `Wrong canonical: ${page}`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll("&amp;", "&");
    if (/^(?:#|mailto:|tel:|data:|javascript:)/.test(value)) continue;
    const url = new URL(value, canonical[1]);
    if (url.origin !== origin) continue;
    if (/^https?:/.test(value) && !url.pathname.startsWith(base)) continue;
    assert.ok(url.pathname.startsWith(base), `Link escapes blog base: ${value}`);
    const relative = decodeURIComponent(url.pathname.slice(base.length));
    let target = join(dist, relative);
    if (existsSync(target) && statSync(target).isDirectory()) target = join(target, "index.html");
    if (!existsSync(target) && !relative.includes(".")) target = join(dist, relative, "index.html");
    assert.ok(existsSync(target), `Broken local link in ${page}: ${value}`);
    links++;
  }
}
const rss = readFileSync(join(dist, "rss.xml"), "utf8");
for (const item of rss.matchAll(/<link>([^<]+)<\/link>/g)) {
  assert.ok(item[1].startsWith(origin + base), "RSS link must use the blog subdirectory");
}
const sitemap = readFileSync(join(dist, "sitemap-0.xml"), "utf8");
assert.ok(!sitemap.includes("astro-paper.pages.dev"), "Sitemap still points at the theme demo");
const search = JSON.parse(readFileSync(join(dist, "pagefind/pagefind-entry.json"), "utf8"));
assert.ok(Object.keys(search.languages).some(language => language.startsWith("zh")), "Chinese search index is missing");
assert.ok(!existsSync(join(dist, "templates")), "Writing templates must not become pages");
console.log(`Verified ${pages.length} Chinese pages, ${links} local links/assets, RSS, canonical URLs, and Chinese search index.`);
