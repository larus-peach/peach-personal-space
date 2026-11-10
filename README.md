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


## IDOL page
`idol/index.html` に4グループとお気に入り曲12曲を掲載しています。曲名はクリック不可で、順位もありません。
「**あーぐれす**」は指定どおりの表記です。
公式リンクは未確認URLを掲載しないため、`idol/index.html` のコメント内に追記用テンプレートを用意しています。URL確認後にコメントを解除し、各リンクを書き換えてください。

## CAR page
`car/index.html` にS15 Spec-R AEROの紹介、Street-Focused. コンセプト、The Details. の装着パーツ一覧を追加しました。写真は既存のユーザー提供画像 `assets/images/car/car-home.webp` を使用しています。アーム類、エアロ、メーター類は表の右列でまとめて表示します。サイドスカートは掲載していません。

写真追加時は `car/index.html` の `PHOTO ARCHIVE` コメント内のテンプレートを有効化し、`assets/images/car/` に写真を配置してください。未確認のインタークーラー詳細モデル、NISMOメーターの復刻品区分、Defiの色や最大圧力は掲載していません。
