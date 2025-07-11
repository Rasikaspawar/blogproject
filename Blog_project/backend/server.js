const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cdac', // ← your MySQL password
  database: 'blogdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ MySQL Connected');
});

// ✅ 1. Add Blog
app.post('/add-blog', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).send('Title and content required');
  db.query(
    'INSERT INTO blogs (title, content) VALUES (?, ?)',
    [title, content],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: 'Blog saved', id: result.insertId });
    }
  );
});

// ✅ 2. Fetch All Blogs
app.get('/blogs', (req, res) => {
  db.query('SELECT * FROM blogs ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});

// ✅ 3. Delete Blog by ID
app.delete('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  db.query('DELETE FROM blogs WHERE id = ?', [blogId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: 'Blog deleted' });
  });
});

// ✅ 4. Update Blog by ID
app.put('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).send('Title and content required');
  db.query(
    'UPDATE blogs SET title = ?, content = ? WHERE id = ?',
    [title, content, blogId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: 'Blog updated' });
    }
  );
});

// ✅ Start Server
app.listen(5000, () => console.log('🚀 Backend running on port 5000'));
