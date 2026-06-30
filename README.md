# 経営分析レポートメーカー Pro — iPhone版

## iPhoneで使う

このフォルダをHTTPS対応の静的ホスティングへ配置し、発行されたURLをSafariで開きます。Safariの共有ボタンから「ホーム画面に追加」を選ぶと、アプリのように起動でき、初回読込後はオフラインでも利用できます。

対応する代表的な配置先は GitHub Pages、Cloudflare Pages、Netlify、社内Webサーバーです。サーバー処理やデータ送信はなく、入力内容は端末のブラウザ内に保存されます。

## ファイル構成

- `index.html` — 画面、計算ロジック、業界データ
- `manifest.webmanifest` — ホーム画面追加時のアプリ情報
- `sw.js` — オフラインキャッシュ。更新時は `CACHE_NAME` のバージョンを上げます
- `icon.svg` / `apple-touch-icon.png` — アプリアイコン

## 今後の機能追加

小規模な変更は `index.html` に追加できます。機能が増えた段階で、業界データ・計算ロジック・画面処理を別JavaScriptファイルへ分離すると保守しやすくなります。公開後にファイルを更新した場合は、`sw.js` の `CACHE_NAME` を `financial-analysis-v2` のように変更してください。
