# 台灣移民青年倡議陣線協會 官方網站

新二代留聲機 — Taiwan Immigration Youth Alliance（TIYA）正式形象網站。靜態網站，零後端、零資料庫。

> **完整開發藍圖：[`開發藍圖.md`](./開發藍圖.md)** — 如果你是接手的工程師，先讀那份。本 README 只講「怎麼把這份程式碼跑起來、怎麼更新內容、怎麼部署」。

---

## ⚠ 法律限制（最重要，請先讀）

本協會**尚未取得勸募字號**，網站上**不能進行任何公開勸募行為**。

**可以做**：被動提供匯款帳戶資訊、收據說明、匯款後通知表單。
**不能做**：「支持我們」「Donate Now」這類號召性標題、捐款層級示意（「100 元 = 場地費」這類）、紅磚色 CTA 大按鈕、任何「請捐款支持」訊息。

寫任何跟捐款相關的內容前先看 [`src/components/Donate.astro`](./src/components/Donate.astro) 裡的免責聲明措辭。違反《公益勸募條例》是違法的。

---

## 技術棧

| 工具 | 用途 |
|------|------|
| [Astro](https://astro.build/) | 靜態網站框架。所有頁面在 build 時產出純 HTML/CSS/JS |
| [Tailwind CSS](https://tailwindcss.com/) | 樣式（目前主要用原生 CSS + 變數，Tailwind 備用） |
| Astro Content Collections | 活動 / 專欄文章資料源（markdown） |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | 自動產生 `sitemap-index.xml` |
| [Netlify](https://www.netlify.com/) | 部署（免費，自動 SSL + CDN） |

**為什麼選靜態方案**：免後端、免資料庫、零月費、上 CDN 後速度快、易換主機。完整理由見藍圖第 2 節。

---

## 開發環境

需要 Node 18+ 與 npm。

```bash
# 第一次設定
npm install

# 本機預覽（http://localhost:4321）
npm run dev

# 編譯出靜態檔案（產出在 dist/）
npm run build

# 預覽 build 結果
npm run preview
```

---

## 怎麼新增 / 修改內容

### 新增一場活動

在 `src/content/events/` 放一個新的 `.md` 檔（檔名隨意，但建議 `YYYY-地點.md` 格式），複製現有檔案的 frontmatter，改值即可。日期最新的會自動排在最前面。

```yaml
---
date: 2026-06-01           # 用來排序，新到舊
regionZh: 台北場
regionEn: Taipei
locationZh: 場地名稱
locationEn: Venue Name
titleZh: 活動標題
titleEn: Event Title in English
descriptionZh: 一句話介紹活動內容...
descriptionEn: One-line description in English...
quoteZh: （可選）想引用的金句
quoteEn: (Optional) Quote in English
tags:
  - 標籤一
  - 標籤二
fbEmbedUrl: https://www.facebook.com/TWmigrantchamber/posts/...   # 可選，FB 貼文網址
featured: true                                                     # false 就會從首頁隱藏
---
```

存檔，網站就會自動讀到。`featured: false` 會從首頁拿掉但檔案還在。

### 新增一篇專欄文章

放到 `src/content/columns/`：

```yaml
---
publishedDate: 2026-06-01
titleZh: 中文標題
titleEn: English title
authorZh: 作者中文
authorEn: Author Romanized
url: https://opinion.cw.com.tw/blog/profile/531/article/XXXX
featured: true
---
```

文章編號（01、02、03…）會依 `publishedDate` 由舊到新自動產生，不用手動填。

### 更新捐款匯款資訊

直接改 [`src/components/Donate.astro`](./src/components/Donate.astro) 最上面的 `bankInfo` 物件。**寫任何文案前先讀本 README 的「法律限制」一節**。

### 改文字 / 換照片 / 改連結

| 內容 | 檔案位置 |
|------|----------|
| Hero 區（首頁主視覺） | `src/components/Hero.astro` |
| 關於我們 | `src/components/About.astro` |
| 實體活動 | `src/components/Events.astro` + `src/content/events/*.md` |
| 天下獨立評論專欄 | `src/components/Column.astro` + `src/content/columns/*.md` |
| 捐款資訊 | `src/components/Donate.astro` |
| FB / IG / 信箱 | `src/components/Social.astro` |
| 頁尾 | `src/components/Footer.astro` |
| 導覽列連結 | `src/components/Nav.astro` |
| 語言切換列 | `src/components/LangBar.astro` |
| 全站 meta / OG / favicon | `src/layouts/BaseLayout.astro` |

每個元件都吃 `lang` prop（`'zh-TW'` 或 `'en'`），裡面 `isEn ? 英文 : 中文` 切換內容。

---

## 部署（Cloudflare Workers Static Assets）

已接 GitHub 自動部署。改完內容只要 `git push` 到 `main`，Cloudflare 會偵測到 commit 並自動 build + 部署。

```bash
git add -A
git commit -m "說明這次改了什麼"
git push
```

build log 在 Cloudflare dashboard 的 **Workers & Pages → tiya-website → Deployments** 分頁看，正常 30 秒~2 分鐘上線。

線上網址：[tiya-website.leepolung1.workers.dev](https://tiya-website.leepolung1.workers.dev/)
GitHub repo：[github.com/polungcs/tiya-website](https://github.com/polungcs/tiya-website)

**為什麼是 Workers，不是 Pages？** Cloudflare 已將兩者合併到統一的 dashboard，新建專案時介面預設導向 Workers，但對純靜態網站來說行為跟 Pages 完全相同（Workers Static Assets）。免費額度比 Netlify 寬鬆很多（500 builds/月、無限頻寬）。

---

## 專案結構

```
官方網站/
├── public/                 # 靜態檔（直接複製到 dist/ 根目錄）
│   └── robots.txt
├── src/
│   ├── components/         # 各區塊元件（Hero / About / Events / ...）
│   ├── content/
│   │   ├── config.ts       # Content collection schema 定義
│   │   ├── events/         # 活動 markdown
│   │   └── columns/        # 專欄文章 markdown
│   ├── layouts/
│   │   └── BaseLayout.astro   # HTML <head>、OG meta
│   ├── pages/
│   │   ├── index.astro     # 繁中首頁 /
│   │   └── en/index.astro  # 英文首頁 /en/
│   └── styles/
│       └── global.css      # 全站變數（顏色、字體）
├── *.png                   # logo 圖檔（直接放根目錄，build 時複製到 public）
├── 開發藍圖.md              # 完整規劃文件 ← 接手前必讀
├── astro.config.mjs        # Astro / sitemap / Tailwind 整合設定
├── package.json
└── tailwind.config.mjs
```

---

## 品牌視覺參考

色票（定義在 `src/styles/global.css`）：

| 變數 | 色碼 | 用途 |
|------|------|------|
| `--orange` | `#EF9F27` | 主色、Hero 背景 |
| `--terra` | `#CE5942` | 強調色、底線、留聲機 logo |
| `--terra-deep` | `#B8401E` | 深強調、連結 hover |
| `--cream` | `#FFFAF0` | 主背景 |
| `--cream-warm` | `#FAEEDA` | 區塊交替背景 |
| `--ink` | `#2A1A0A` | 主文字色 |
| `--ink-soft` | `#5C4317` | 次文字色 |

字型：Noto Serif TC（標題）+ Noto Sans TC（內文）+ Cormorant Garamond italic（英文裝飾）+ IBM Plex Sans（標籤）。透過 Google Fonts 載入。

---

## 目前的佔位資訊（demo 階段）

部署上線前要替換的東西：

- [ ] `src/components/Donate.astro` — 銀行帳戶資訊（戶名 / 銀行 / 帳號 / 郵政劃撥），目前都是「待確認」
- [ ] `src/components/Donate.astro` — 匯款通知表單 URL（`forms.gle/PLACEHOLDER`）
- [ ] `src/content/columns/*.md` — `publishedDate` 是估算的，找原文確認真實日期
- [ ] `astro.config.mjs` — `site` 等網域 `tiya.org.tw` 申請好後改成正式網域
- [ ] `public/robots.txt` — 上面同樣要改網域
- [ ] `src/layouts/BaseLayout.astro` — favicon 用的是 `logo-tiya-square.png`，可以另外做 16×16 / 32×32 / Apple Touch Icon 版本

---

## 之後要做的事（依藍圖排序）

- [ ] 階段 0：建 GitHub repo、接 Netlify 自動部署
- [ ] 階段 3：接 Decap CMS（讓非技術成員從 `/admin` 後台改內容）
- [ ] 階段 3：申請 `tiya.org.tw` 網域、Netlify 換自訂網域
- [ ] 階段 4：補完整英文版內容（目前部分區塊英文是 placeholder）
- [ ] 階段 5：上線前 SEO 檢查 + Google Search Console 提交 sitemap
- [ ] 階段 6：金流串接（**前提：協會先取得勸募字號**）
- [ ] 階段 7：其他東南亞語言（先擴 i18n 路由結構，再分批上翻譯）

---

## 聯絡 / 維護

| 角色 | 對象 |
|------|------|
| 技術負責人 | 柏龍（台東大學資工系） |
| 組織信箱 | 2024tiya@gmail.com |
| FB | [facebook.com/TWmigrantchamber](https://www.facebook.com/TWmigrantchamber/) |
| IG | [@2023_tiya](https://www.instagram.com/2023_tiya/) |

---

_最後更新：2026-05-06_
