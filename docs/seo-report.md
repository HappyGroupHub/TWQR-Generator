# TWQR 收款碼產生器 SEO 與 AI 搜尋（AEO / GEO）優化報告

## 一、優化項目與修改摘要

### 1. 渲染架構與可索引性（SSR / 靜態輸出改善）
- **問題診斷**：原本 `src/app/page.tsx` 整個檔案標記為 `"use client"`，雖然 Next.js 14 會做首次 SSR HTML 輸出，但頁面缺乏對搜尋引擎與 AI 爬蟲友善的靜態說明文字、語意化結構與結構化資料。
- **改法**：将需要瀏覽器狀態與 Canvas 操作的互動表單拆分為獨立 Client Component（`src/components/TWQRGeneratorTool.tsx`），並將首頁 `src/app/page.tsx` 改為 **Server Component（靜態預渲染）**。搜尋引擎與 AI 爬蟲無須執行客戶端互動即可在初始 HTML 中直接讀取完整的 H1、首段定義、使用步驟、280 家支援機構代碼、隱私說明、常見問題與 JSON-LD。

### 2. 技術 SEO（Metadata、Canonical、Robots、Sitemap、404、Manifest）
- **Metadata 與 Canonical（`src/app/layout.tsx`、`src/lib/site.ts`）**：
  - 設定 `metadataBase: new URL("https://twqr-generator.playfuni.net")` 與 `alternates.canonical: "/"`，確保 HTTPS 與網域 canonical 一致。
  - `<title>`：`TWQR 收款碼產生器｜免費台灣 Pay 轉帳 QR Code 線上產生`（35 字元）。
  - `<meta name="description">`：涵蓋台灣收款碼、TWQR、台灣 Pay、銀行代碼、帳號、金額、備註、自訂 Logo 與純瀏覽器端處理（96 字元）。
  - 改用 Next.js 14 原生 `export const viewport: Viewport` 管理 `width=device-width, initial-scale=1` 與 `themeColor: "#3B82F6"`，移除手寫 `<head>` 中重複的標籤。
  - 設定 `robots` 與 `googleBot`（允許 `max-image-preview: large`、`max-snippet: -1`）。
- **`robots.txt`（`src/app/robots.ts`）**：開放 `User-agent: *`、`Allow: /`，不阻擋任何搜尋引擎或 AI 搜尋爬蟲，並指向 `https://twqr-generator.playfuni.net/sitemap.xml`。
- **`sitemap.xml`（`src/app/sitemap.ts`）**：自動輸出首頁網址、`lastModified`、`changeFrequency: "monthly"` 與 `priority: 1.0`。
- **自訂 404 頁面（`src/app/not-found.tsx`）**：提供清楚的 404 提示、獨立 `<title>`、`noindex, follow` 設定，以及返回首頁的連結按鈕。
- **Web App Manifest 與圖示（`src/app/manifest.ts`）**：新增 `/manifest.webmanifest`、`/apple-touch-icon.png`（180×180）、`/icon-192.png`（192×192）、`/icon-512.png`（512×512）。

### 3. 社群分享（Open Graph & Twitter Card）
- 新增品牌視覺一致的 **1200×630 分享圖**（`public/og-image.png`）。
- 於 `src/app/layout.tsx` 完整設定 `openGraph`（`title`、`description`、`url`、`siteName`、`locale: "zh_TW"`、`type: "website"`、`images`）與 `twitter`（`card: "summary_large_image"`、`title`、`description`、`images`）。

### 4. 結構化資料（JSON-LD Schema）
於 `src/app/page.tsx` 以 `@graph` 內嵌與頁面可見文字完全一致的真實資訊（未捏造任何評分、評論或統計數據）：
- **`WebSite`** 與 **`Person`**：標示網站名稱、網址、語系與開發者資訊（GitHub / LinkedIn）。
- **`WebApplication`**：標示 `FinanceApplication`、免費（`price: "0"`, `TWD`）、功能特色清單、MIT 授權與最後修改日期。
- **`HowTo`**：四步驟產生 TWQR 收款碼教學（對應頁面 `#how-to-use` 區塊）。
- **`FAQPage`**：8 題自然語言常見問答（與 `src/content/faq.ts` 共用同一份資料來源，確保 JSON-LD 與頁面內容 100% 同步）。

### 5. 內容結構、語意化標籤與 AI 搜尋可讀性（AEO / GEO）
- **標題階層（Heading Hierarchy）**：
  - 單一 `<h1>`：`TWQR 收款碼產生器`
  - `<h2>`：`收款資訊設定`、`收款QR碼`、`如何產生 TWQR 收款碼`、`支援的銀行與格式`、`隱私說明`、`常見問題`、`使用條款`
  - `<h3>`：各步驟標題與各 FAQ 問題（並將 Footer 原本的 `<h3>` 改為 `<p>`，避免破壞標題階層）。
- **首段直接定義**：於 H1 下方提供約 60 字的「這是什麼」直接定義，方便 AI 搜尋引擎（ChatGPT Search、Perplexity、Google AI Overviews）直接引用。
- **真實程式碼依據之說明區塊**：
  - **使用步驟（`#how-to-use`）**：對應實際欄位驗證規則（10–16 碼帳號、自動去除連字號、金額上限 200 萬元、設為 0 由付款人自填、備註上限 19 字元）。
  - **支援的銀行與格式（`#supported-banks`）**：直接由 `src/data/bank-codes.json` 動態統計並列出全部 280 家金融機構（含本國銀行、郵局、農漁會、信合社與 9 家電子支付），使用 `<details>` 展開清單，兼顧版面整潔與 HTML 可索引性。
  - **隱私說明（`#privacy`）**：根據 `src/utils/qrGenerator.ts` 實際行為說明——透過 `qrcode` 套件與 HTML5 Canvas 在瀏覽器端產生，無後端 API、無資料庫、無追蹤或儲存。
  - **最後更新日期**：頁面底部以 `<time dateTime="2026-11-05">` 顯示最後更新日期。
- **`/llms.txt`（`public/llms.txt`）**：依循 llmstxt.org 規範撰寫網站摘要、TWQR 參數規格（`TWQRP://BankTransfer/158/02/V1` 之 `D1`、`D5`、`D6`、`D9`、`D10`）、隱私機制與頁面區塊錨點連結。（因本工具為完全免費開源專案，無付費方案，故不需建立 `/pricing.md`，費用資訊已明確記載於 `llms.txt`、FAQ 與 `WebApplication` schema 之 `offers`。）

### 6. 效能與 Core Web Vitals
- `next/font/google` 的 `Inter` 字型設定 `display: "swap"`，避免 FOIT 造成文字延遲顯示。
- `src/components/QRCodeDisplay.tsx` 中的 `<img>` 補上明確的 `width={256} height={256}` 與具體 `alt="產生的 TWQR 收款 QR Code"`，減少 Layout Shift (CLS)。
- 外部連結（GitHub、LinkedIn）皆確認具備 `rel="noopener noreferrer"`，頁尾新增內部錨點導覽 `<nav aria-label="頁尾導覽">`。

---

## 二、新增與修改檔案清單

### 新增檔案
- `src/lib/site.ts`：全站共用的網址、標題、描述、作者與最後更新日期常數
- `src/content/faq.ts`：頁面與 `FAQPage` JSON-LD 共用的常見問題資料
- `src/components/TWQRGeneratorTool.tsx`：自原 `page.tsx` 拆出的互動式產生器 Client Component
- `src/app/robots.ts`：動態產生 `/robots.txt`
- `src/app/sitemap.ts`：動態產生 `/sitemap.xml`
- `src/app/manifest.ts`：動態產生 `/manifest.webmanifest`
- `src/app/not-found.tsx`：自訂 404 頁面
- `public/llms.txt`：供大型語言模型與 AI 搜尋讀取的結構化說明檔
- `public/og-image.png`：1200×630 Open Graph 社群分享圖
- `public/apple-touch-icon.png`：180×180 Apple Touch Icon
- `public/icon-192.png`、`public/icon-512.png`：PWA / Web App 圖示
- `docs/seo-report.md`：本優化報告

### 修改檔案
- `src/app/layout.tsx`：完善 Metadata、Canonical、Open Graph、Twitter Card、Icons、Viewport 與字型 `display: "swap"`
- `src/app/page.tsx`：改為 Server Component，整合首段定義、互動工具、使用教學、支援銀行清單、隱私說明、FAQ、使用條款、最後更新時間與 JSON-LD
- `src/components/QRCodeDisplay.tsx`：語意化 `<h2>`、圖片 `alt` 與 `width`/`height`
- `src/components/Footer.tsx`：新增頁尾內部錨點導覽 `<nav>`、修正標題標籤階層

---

## 三、需要使用者後續手動完成的事項

1. **Google Search Console (GSC) 設定與提交**：
   - 前往 [Google Search Console](https://search.google.com/search-console) 驗證 `https://twqr-generator.playfuni.net` 網域所有權（建議使用 DNS TXT 記錄驗證，無須改動程式碼）。
   - 驗證完成後，於「Sitemaps」提交 `https://twqr-generator.playfuni.net/sitemap.xml`。
   - 使用「網址審查」功能請求索引首頁 `https://twqr-generator.playfuni.net/`。
2. **Bing Webmaster Tools 設定**：
   - 前往 [Bing Webmaster Tools](https://www.bing.com/webmasters) 匯入 GSC 設定或直接驗證網域，並提交 `sitemap.xml`（有助於提升依賴 Bing 索引的 AI 搜尋如 ChatGPT Search / Copilot 的能見度）。
3. **社群分享快取測試与更新**：
   - 部署上線後，建議使用 LINE 分享除錯工具、Facebook Sharing Debugger 與 X (Twitter) Card Validator 預覽 `https://twqr-generator.playfuni.net/`，確認 `/og-image.png` 正確顯示。
4. **外部連結與曝光建議**：
   - 於 GitHub Repo (`HappyGroupHub/twqr-generator`) 的 About 欄位確認填上正式網址 `https://twqr-generator.playfuni.net`。
   - 可於台灣開發者社群、理財或團購／社團收款教學文章中分享此工具並附上連結，建立自然反向連結。
