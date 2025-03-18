#!/bin/bash

# 色の定義
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Loki データベース初期化スクリプト${NC}"
echo "=================================="

# PostgreSQLが起動しているか確認
if ! command -v psql &> /dev/null; then
  echo -e "${RED}PostgreSQLがインストールされていません。インストールしてから再実行してください。${NC}"
  exit 1
fi

# データベースの作成
echo -e "${GREEN}データベースを作成中...${NC}"
createdb loki 2>/dev/null || echo -e "${BLUE}データベースはすでに存在します${NC}"

# PostGISエクステンションの有効化
echo -e "${GREEN}PostGISエクステンションを有効化中...${NC}"
psql -d loki -c "CREATE EXTENSION IF NOT EXISTS postgis;" 2>/dev/null || echo -e "${RED}PostGISエクステンションの有効化に失敗しました${NC}"

echo -e "${GREEN}データベースの初期化が完了しました${NC}"
echo "=================================="
echo -e "${BLUE}接続情報:${NC}"
echo "データベース名: loki"
echo "ユーザー名: postgres (または現在のシステムユーザー)"
echo "ポート: 5432"
echo "=================================="
echo -e "${BLUE}この情報をbackend/.envファイルに設定してください${NC}"
