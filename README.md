# AI Spec-driven Software Development 展示專案

本專案完美展示了 AI 協作開發的強大能力：從 ChatGPT 生成的詳細規格文件，到 Manus AI 實現的完整網頁應用程式

## 🤖 AI 協作開發流程

### 第一階段：ChatGPT 規格生成

> 仿造 Kiro Spec-Driven 的生成架構，建立而成的 GPT: Kiro Spec Architect
> [https://chatgpt.com/g/g-688208fa90788191b5b28c818b6d67ff-kiro-spec-architect](https://chatgpt.com/g/g-688208fa90788191b5b28c818b6d67ff-kiro-spec-architect)

Kiro Spec Architect 根據用戶需求生成了三個完整的開發規格書：

- **需求文件 (Requirements)**：定義了滑桿比較、導覽切換、GitHub Pages 部署等核心需求
- **設計文件 (Design)**：包含系統架構、組件設計、資料模型、錯誤處理策略
- **任務文件 (Tasks)**：詳細的 7 階段實作計劃和技術規範

### 第二階段：Manus AI 程式實現

Manus AI 接收規格文件後，完成了：

- 🏗️ **完整專案架構**：HTML/CSS/JavaScript 純前端實現
- 🎯 **精確需求實現**：100% 符合原始規格要求
- 🧠 **智慧功能擴展**：自動圖片方向偵測與容器調整
- 🔧 **技術最佳實踐**：響應式設計、錯誤處理、效能優化
- 📚 **完整文件**：使用說明、部署指南、更新日誌

### 第三階段：用戶反饋優化

用戶使用後，根據問題或進一步需求對 AI 反饋。如，當用戶提出「直幅照片被裁切」的問題時，Manus AI 立即：

- 🔍 **問題分析**：快速定位 CSS 固定高度限制問題
- 💡 **智慧解決**：實現自動圖片方向偵測功能
- 🧪 **完整測試**：驗證橫幅/直幅圖片的自動適應
- 📦 **即時交付**：更新版本並提供詳細說明

## 🎯 AI Spec-driven Software Development 的威力

### 🚀 **從概念到成品的完整流程**

```
用戶想法 → GPT 規格 → Manus 實現 → 完整應用
   💭          📋          🔨        ✨
```

### 🎨 **AI 協作的優勢**

- **GPT**：擅長需求分析、架構設計、規格撰寫
- **Manus AI**：專精程式實現、技術優化、問題解決
- **協作效果**：1 + 1 > 2 的開發效率

### 📈 **開發效率提升**

- ⚡ **快速原型**：從規格到可運行程式僅需數小時
- 🎯 **精確實現**：AI 理解規格，減少溝通成本
- 🔄 **敏捷迭代**：即時反饋，快速優化改進
- 📚 **完整交付**：程式碼 + 文件 + 部署指南

---

# Before and After Slider

一個可部署於 GitHub Pages 的純前端靜態網站，用於展示兩張相同視角的照片，透過滑桿方式實現 Before/After 比較效果。

## 功能特色

- 📸 **Before/After 滑桿比較**：透過拖動滑桿即時比較兩張照片
- 🧭 **多地點導覽**：上方導覽列可切換不同地點的照片組
- 🖼️ **智慧圖片適應**：自動偵測圖片方向（橫幅/直幅）並調整容器尺寸，確保圖片完整顯示不被裁切
- 📱 **響應式設計**：支援桌機、平板、手機等各種裝置
- ⚡ **純前端**：無需後端，可直接部署到 GitHub Pages
- 🎯 **觸控支援**：支援滑鼠拖拽和觸控操作

## 快速開始

### 1. 準備圖片

將您的圖片放置於 `images/` 資料夾中，命名格式為：

- `地點名稱-1.jpg` (Before 圖片)
- `地點名稱-2.jpg` (After 圖片)

例如：

```
images/
├── 客廳-1.jpg
├── 客廳-2.jpg
├── 廚房-1.jpg
├── 廚房-2.jpg
├── 臥室-1.jpg
└── 臥室-2.jpg
```

### 2. 本地測試

由於瀏覽器安全限制，需要透過 HTTP 伺服器來運行：

**使用 Python：**

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**使用 Node.js：**

```bash
npx http-server
```

**使用 PHP：**

```bash
php -S localhost:8000
```

然後在瀏覽器中開啟 `http://localhost:8000`

### 3. 部署到 GitHub Pages

1. 將專案上傳到 GitHub 儲存庫
2. 進入儲存庫設定 (Settings)
3. 找到 "Pages" 選項
4. 在 "Source" 中選擇 "Deploy from a branch"
5. 選擇 "main" 分支和 "/ (root)" 資料夾
6. 點擊 "Save"
7. 等待幾分鐘後，您的網站將可在 `https://yourusername.github.io/repository-name` 存取

## 檔案結構

```
before-after-slider/
├── index.html          # 主頁面
├── css/
│   └── style.css       # 樣式文件
├── js/
│   ├── main.js         # 主要邏輯
│   └── slider.js       # 滑桿功能
├── images/             # 圖片資料夾
│   ├── 客廳-1.png      # Before 圖片
│   ├── 客廳-2.png      # After 圖片
│   └── ...
├── README.md           # 使用說明
├── DEPLOYMENT.md       # 部署指南
└── CHANGELOG.md        # 更新日誌
```

## 使用方式

1. **瀏覽照片**：網站載入後會自動顯示第一個可用地點的照片
2. **拖動滑桿**：使用滑鼠或手指拖動滑桿來比較 Before/After 效果
3. **切換地點**：點擊上方導覽列的地點名稱來切換不同照片組
4. **鍵盤操作**：使用方向鍵 ←→ 來微調滑桿位置

## 技術規格

- **前端技術**：HTML5, CSS3, Vanilla JavaScript
- **圖片適應**：自動偵測圖片寬高比，動態調整容器樣式
- **相容性**：現代瀏覽器 (Chrome, Firefox, Safari, Edge)
- **響應式**：支援各種螢幕尺寸
- **無依賴**：不需要任何外部函式庫或框架

## Kiro Spec Architect 生成三個開發規格文件

本專案開發規格文件的生成，範例詳見：[https://chatgpt.com/share/688bb060-2e10-8007-8417-6009c564b6e5](https://chatgpt.com/share/688bb060-2e10-8007-8417-6009c564b6e5)

## 自訂設定

### 修改預設地點

在 `js/main.js` 中修改 `potentialLocations` 陣列：

```javascript
const potentialLocations = ["客廳", "廚房", "臥室", "浴室", "陽台"];
```

### 調整樣式

編輯 `css/style.css` 來自訂：

- 顏色主題
- 字體樣式
- 滑桿外觀
- 響應式斷點

### 錯誤處理

系統會自動處理以下情況：

- 圖片載入失敗
- 找不到配對的圖片組
- 網路連線問題

## 疑難排解

**Q: 為什麼圖片沒有顯示？**
A: 請確認：

1. 圖片檔案存在於 `images/` 資料夾
2. 檔案命名格式正確（地點-1.jpg, 地點-2.jpg）
3. 透過 HTTP 伺服器運行（不是直接開啟 HTML 檔案）

**Q: 導覽列沒有顯示地點？**
A: 系統只會顯示有完整配對圖片的地點，請確認每個地點都有 -1 和 -2 兩張圖片。

**Q: 滑桿不能拖動？**
A: 請確認瀏覽器支援現代 JavaScript 功能，建議使用最新版本的瀏覽器。

## 🎓 學習價值

這個專案展示了：

- **AI 協作開發**的實際應用
- **規格驅動開發**的重要性
- **純前端技術**的強大能力
- **響應式設計**的最佳實踐
- **用戶體驗優化**的思考過程

## 版本歷史

- **v1.1.0** - 新增智慧圖片適應功能
- **v1.0.0** - 初始版本，基本滑桿比較功能

## 授權

MIT License - 您可以自由使用、修改和分發此專案。
