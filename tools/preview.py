#!/usr/bin/env python3
"""把 docs/ 網站打包成單一 HTML 檔，方便在側欄預覽。

用法：python3 tools/preview.py 輸出路徑.html [--after "載入後要執行的 JS"]
CSS、JS 與 icons/ 圖片都會內嵌；Google Fonts 仍從網路載入。
--after 可在頁面載入後自動跳到剛修改的畫面，例如：
  --after "careState.selected.add('C03')"
"""
import argparse, base64, pathlib, re

DOCS = pathlib.Path(__file__).resolve().parent.parent / 'docs'


def data_uri(path):
    mime = {'.png': 'image/png', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg'}[path.suffix]
    return f'data:{mime};base64,' + base64.b64encode(path.read_bytes()).decode()


def inline_images(text):
    return re.sub(r'icons/[\w.-]+\.(?:png|svg|jpg)',
                  lambda m: data_uri(DOCS / m.group(0)) if (DOCS / m.group(0)).exists() else m.group(0), text)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('out')
    ap.add_argument('--after', default='')
    args = ap.parse_args()
    html = (DOCS / 'index.html').read_text(encoding='utf-8')
    html = re.sub(r'<link rel="manifest"[^>]*>', '', html)
    html = re.sub(r'<link rel="stylesheet" href="([^"]+)">',
                  lambda m: '<style>\n' + (DOCS / m.group(1)).read_text(encoding='utf-8') + '\n</style>', html)
    scripts = []

    def take(m):
        scripts.append((DOCS / m.group(1)).read_text(encoding='utf-8'))
        return ''

    html = re.sub(r'<script src="([^"]+)" defer></script>', take, html)
    # defer 腳本會在解析完後依序執行，所以全部移到 </body> 前，順序不變。
    # 這些檔案共用全域 const/let，必須保留各自的 <script>，不能合併成一段。
    body = ''.join('<script>\n' + s.replace('</script', '<\\/script') + '\n</script>\n' for s in scripts)
    if args.after:
        body += "<script>addEventListener('load',()=>setTimeout(()=>{" + args.after + "},300));</script>\n"
    html = html.replace('</body>', body + '</body>') if '</body>' in html else html + body
    out = pathlib.Path(args.out)
    out.write_text(inline_images(html), encoding='utf-8')
    print(out, f'{out.stat().st_size / 1024:.0f} KB')


if __name__ == '__main__':
    main()
