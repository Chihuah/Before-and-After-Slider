# 部署指南

## GitHub Pages 部署步驟

### 1. 準備 GitHub 儲存庫

1. 在 GitHub 上建立新的儲存庫（Repository）
2. 將專案檔案上傳到儲存庫

### 2. 上傳專案檔案

確保以下檔案都已上傳到 GitHub 儲存庫：

```
before-after-slider/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── slider.js
├── images/
│   ├── 客廳-1.png
│   ├── 客廳-2.png
│   └── ... (其他圖片檔案)
├── README.md
└── DEPLOYMENT.md
```

### 3. 啟用 GitHub Pages

1. 進入 GitHub 儲存庫頁面
2. 點擊 "Settings" 標籤
3. 在左側選單中找到 "Pages"
4. 在 "Source" 區域選擇：
   - Source: "Deploy from a branch"
   - Branch: "main" (或 "master")
   - Folder: "/ (root)"
5. 點擊 "Save"

### 4. 等待部署完成

- GitHub 會自動建置和部署您的網站
- 通常需要幾分鐘時間
- 部署完成後會顯示網站 URL：`https://yourusername.github.io/repository-name`

### 5. 測試部署的網站

1. 開啟部署後的 URL
2. 確認所有功能正常運作：
   - 圖片正確載入
   - 滑桿功能正常
   - 導覽列切換功能
   - 響應式設計在不同裝置上正常顯示

## 常見問題

### Q: 圖片沒有顯示？
A: 確認：
- 圖片檔案已正確上傳到 `images/` 資料夾
- 檔案命名格式正確：`地點-1.png` 和 `地點-2.png`
- 檔案路徑使用相對路徑

### Q: 網站顯示 404 錯誤？
A: 確認：
- GitHub Pages 已正確啟用
- 儲存庫是公開的（Public）
- `index.html` 檔案在根目錄

### Q: 功能在本地正常但在 GitHub Pages 上不正常？
A: 確認：
- 所有檔案都已上傳
- 沒有使用絕對路徑
- JavaScript 檔案正確載入

## 更新網站

要更新已部署的網站：

1. 修改本地檔案
2. 提交變更到 GitHub 儲存庫
3. GitHub Pages 會自動重新部署
4. 等待幾分鐘後重新整理網站

## 自訂網域（可選）

如果您有自己的網域：

1. 在 GitHub Pages 設定中的 "Custom domain" 欄位輸入您的網域
2. 在您的網域 DNS 設定中新增 CNAME 記錄指向 `yourusername.github.io`
3. 等待 DNS 傳播完成（可能需要幾小時）

## 效能最佳化建議

1. **圖片最佳化**
   - 壓縮圖片檔案大小
   - 使用適當的圖片格式（JPEG 用於照片，PNG 用於圖形）

2. **快取設定**
   - GitHub Pages 自動設定適當的快取標頭

3. **CDN 加速**
   - GitHub Pages 已使用 CDN 加速全球存取

## 監控和分析

您可以使用以下工具監控網站效能：

- Google Analytics（需要額外設定）
- GitHub Insights（儲存庫統計）
- 瀏覽器開發者工具

