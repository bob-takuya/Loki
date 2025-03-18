# Loki - 位置情報ベースのSNS

Loki（ロキ）は、ユーザーがGPSをオンにしないと投稿できない、位置情報に基づいたSNSです。地図上に投稿がピンとして表示され、投稿者の位置情報が視覚的に反映されることで、リアルタイムの位置情報共有を活用した新しいソーシャルメディア体験を提供します。

## 機能

- Googleアカウントでのログイン認証
- 位置情報に基づいた投稿
- 地図上での投稿の表示
- 近くのユーザーの投稿の閲覧
- コメントといいね機能
- プライバシー保護のための位置情報の精度調整

## 技術スタック

### フロントエンド
- Next.js
- React
- TypeScript
- Tailwind CSS
- Mapbox GL JS

### バックエンド
- Express.js
- PostgreSQL with PostGIS
- Sequelize ORM
- JWT認証
- Google OAuth 2.0

## セットアップ方法

### 前提条件
- Node.js (v18以上)
- PostgreSQL (PostGISエクステンション付き)
- Google OAuth クライアントIDの取得
- Mapbox アクセストークンの取得

### 環境変数の設定

1. フロントエンド（`frontend/.env`）:
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

2. バックエンド（`backend/.env`）:
```
PORT=4000
NODE_ENV=development
DATABASE_URL=postgres://postgres:postgres@localhost:5432/loki
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### データベースのセットアップ

PostgreSQLとPostGISがインストールされていることを確認し、以下のコマンドを実行してデータベースを初期化します：

```bash
# データベース初期化スクリプトを実行
./init-db.sh
```

### アプリケーションの起動

```bash
# 依存関係のインストールと起動を一括で行う
./start.sh

# または個別に実行する場合
# フロントエンドの依存関係をインストール
cd frontend && npm install

# バックエンドの依存関係をインストール
cd ../backend && npm install

# バックエンドを起動
cd ../backend && npm run dev

# 別のターミナルでフロントエンドを起動
cd ../frontend && npm run dev
```

ブラウザで http://localhost:3000 にアクセスすると、アプリケーションが表示されます。

## ロゴの設定

アプリケーションを実行する前に、ロゴ画像を設定する必要があります：

1. `frontend/public/logo.html` をブラウザで開く
2. 表示されたロゴの画面キャプチャを撮る
3. キャプチャした画像を `frontend/public/logo.png` として保存する

## セキュリティ対策

- ゼロトラスト導入（IAM, TLS1.3, MFA）
- Googleアカウントなどの外部認証を必須とし、パスワード管理リスクを低減
- 位置情報の精度を制御可能（市区町村レベルまでぼかすオプション）
- 位置情報の保存期間を制限（30日後に自動削除）
- データの暗号化（AES-256）
- HTTPS（TLS1.3）による全通信の暗号化

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。
