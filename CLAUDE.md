# 安心麻醉網站

網站原始碼在 `docs/`，由 GitHub Pages 從 main 分支發布。

## 每次修改完都要開預覽

每次修改完網站，都要在右側欄開啟預覽網頁，讓使用者檢查：

1. 打包成單一 HTML 檔（CSS、JS、圖片都內嵌）：
   `python3 tools/preview.py <scratchpad>/preview.html`
   - 可加 `--after "<JS>"`，在頁面載入後自動執行，例如先勾選剛修改的品項。
2. 先用 Playwright 開這個檔案，確認沒有 JS 錯誤。
3. 用 SendUserFile 傳送 `preview.html`，`display: "render"`，讓它在右側欄打開。
4. 回覆時說明要點到哪裡才看得到這次修改的地方。
