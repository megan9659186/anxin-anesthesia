# 安心麻醉網站

網站原始碼在 `docs/`，由 GitHub Pages 從 main 分支發布。

## 每次修改完都要開預覽

每次修改完網站，都要在右側欄開啟預覽網頁，讓使用者檢查：

1. 打包成單一 HTML 檔（CSS、JS、圖片都內嵌）：
   `python3 tools/preview.py <scratchpad>/preview.html`
   - 可加 `--after "<JS>"`，在頁面載入後自動執行，例如先勾選剛修改的品項。
2. 先用 Playwright 開這個檔案，確認沒有 JS 錯誤。
3. 用 Artifact 工具把 `preview.html` 發布成 artifact，讓使用者在右側欄直接操作網頁成品（不要用 SendUserFile，那只會顯示程式碼）。
   - 同一個對話裡一律發布同一個檔案路徑，網址才會保持不變。
   - 現有的預覽網址：https://claude.ai/artifact/XJwBLPma4MxLt4TGFWPByc（從其他對話更新時，以 `url` 帶入這個網址）。
4. 回覆時說明要點到哪裡才看得到這次修改的地方。
