const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all posts
router.get('/posts', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
  res.json(rows);
});

// Create new post
router.post('/posts', async (req, res) => {
  const { title, content, image } = req.body;
  await db.query('INSERT INTO posts (title, content, image) VALUES (?, ?, ?)', [title, content, image]);
  res.json({ message: 'Post created' });
});

module.exports = router;
