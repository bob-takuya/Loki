#!/bin/bash

# 色の定義
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Loki アプリケーション起動スクリプト${NC}"
echo "=================================="

# フロントエンドの依存関係をインストール
echo -e "${GREEN}フロントエンドの依存関係をインストール中...${NC}"
cd frontend && npm install
if [ $? -ne 0 ]; then
  echo -e "${RED}フロントエンドの依存関係のインストールに失敗しました${NC}"
  exit 1
fi

# バックエンドの依存関係をインストール
echo -e "${GREEN}バックエンドの依存関係をインストール中...${NC}"
cd ../backend && npm install
if [ $? -ne 0 ]; then
  echo -e "${RED}バックエンドの依存関係のインストールに失敗しました${NC}"
  exit 1
fi

# バックエンドを起動（バックグラウンドで）
echo -e "${GREEN}バックエンドを起動中...${NC}"
npm run dev &
BACKEND_PID=$!

# フロントエンドを起動
echo -e "${GREEN}フロントエンドを起動中...${NC}"
cd ../frontend && npm run dev

# Ctrl+Cが押されたときにバックエンドも終了させる
trap "kill $BACKEND_PID" EXIT

# 終了処理
echo -e "${GREEN}アプリケーションを終了しています...${NC}"
