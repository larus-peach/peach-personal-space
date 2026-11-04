# PEACH / Personal Space

HTML / CSS / JavaScript で作った静的ポートフォリオです。

## ローカルで確認

リポジトリのルートで `python3 -m http.server 8000` を実行し、`http://localhost:8000/` を開いてください。

## GitHub Pages

GitHub にリポジトリを作成してファイルを push し、Settings → Pages → Deploy from a branch → main / (root) を選択してください。

## カスタマイズ

- `index.html` の X と GitHub のリンクを自分のURLに変更
- `assets/images/` に写真を追加し、各カードの `.card-placeholder` を `<img src="assets/images/..." alt="..." loading="lazy">` に置き換え
- 公開URLが決まったら OGP画像と `og:image`、`og:url` を追加
- 各趣味ページの文章と写真を追加


## Baseball page
HOME order: BASEBALL → IDOL → CAR → BOAT RACE. Baseball page includes Supporting Since 2008, yearly game records for 2024–2026, and three favorite players (unranked). The Photo Archive section is hidden until images are ready. To add photos, place files in `assets/images/baseball/`, add `<figure class="archive-photo">` elements inside `.photo-archive-grid`, and remove the `hidden` attribute from `#photo-archive`. Captions and dates are optional.
