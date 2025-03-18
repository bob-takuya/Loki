const express = require('express');
const router = express.Router();

// API info route
router.get('/', (req, res) => {
  res.json({
    name: 'Loki API',
    version: '1.0.0',
    description: 'API for Loki - a location-based social network',
  });
});

// モックユーザーを作成
const mockUser = {
  id: '1',
  name: 'テストユーザー',
  email: 'test@example.com',
  avatar: 'https://via.placeholder.com/150',
  role: 'user'
};

// モック投稿を作成
const mockPosts = [
  {
    id: '1',
    content: '東京タワーからの眺めは最高！',
    location: { latitude: 35.6586, longitude: 139.7454 },
    locationName: '東京タワー',
    user: mockUser,
    createdAt: new Date().toISOString(),
    likes: 15,
    comments: 3
  },
  {
    id: '2',
    content: '渋谷でランチ中。このラーメン美味しい！',
    location: { latitude: 35.6580, longitude: 139.7016 },
    locationName: '渋谷',
    user: mockUser,
    createdAt: new Date().toISOString(),
    likes: 8,
    comments: 1
  }
];

// 認証API
router.post('/auth/google', (req, res) => {
  res.json({
    token: 'mock-jwt-token',
    user: mockUser
  });
});

// ユーザー情報取得API
router.get('/auth/me', (req, res) => {
  res.json({ user: mockUser });
});

// 投稿一覧取得API
router.get('/posts', (req, res) => {
  res.json({ posts: mockPosts });
});

// 投稿詳細取得API
router.get('/posts/:id', (req, res) => {
  const post = mockPosts.find(p => p.id === req.params.id) || mockPosts[0];
  res.json({ post, likeCount: post.likes });
});

// 投稿作成API
router.post('/posts', (req, res) => {
  const newPost = {
    id: Date.now().toString(),
    content: req.body.content || 'テスト投稿',
    location: req.body.location || { latitude: 35.6762, longitude: 139.6503 },
    locationName: req.body.locationName || '新宿',
    user: mockUser,
    createdAt: new Date().toISOString(),
    likes: 0,
    comments: 0
  };
  
  mockPosts.unshift(newPost);
  res.status(201).json({ post: newPost });
});

module.exports = router;
