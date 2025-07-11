import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BlogApp() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [comment, setComment] = useState('');

  // Load blogs from backend
  useEffect(() => {
    fetch('http://localhost:5000/blogs')
      .then(res => res.json())
      .then(data => {
        const loaded = data.map(item => ({
          id: item.id,
          title: item.title,
          content: item.content || '',
          comments: []
        }));
        setPosts(loaded);
      });
  }, []);

  const handleAddOrUpdatePost = async () => {
    if (!title || !content) return;

    if (editIndex !== null) {
      // UPDATE blog
      const postToEdit = posts[editIndex];
      const updatedPost = { ...postToEdit, title, content };

      await fetch(`http://localhost:5000/blogs/${postToEdit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost)
      });

      const updatedPosts = [...posts];
      updatedPosts[editIndex] = updatedPost;
      setPosts(updatedPosts);
      setEditIndex(null);
    } else {
      // ADD blog
      const res = await fetch('http://localhost:5000/add-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      const data = await res.json();
      const newBlog = { id: data.id, title, content, comments: [] };
      setPosts([newBlog, ...posts]);
    }

    setTitle('');
    setContent('');
  };

  const handleEdit = index => {
    setTitle(posts[index].title);
    setContent(posts[index].content);
    setEditIndex(index);
  };

  const handleDelete = async index => {
    const blog = posts[index];
    await fetch(`http://localhost:5000/blogs/${blog.id}`, {
      method: 'DELETE'
    });
    setPosts(posts.filter((_, i) => i !== index));
  };

  const handleAddComment = (index) => {
    if (!comment) return;
    const updated = [...posts];
    updated[index].comments.push(comment);
    setPosts(updated);
    setComment('');
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{
      background: 'linear-gradient(to right, #0077b6, #fdf497)',
      padding: '30px'
    }}>
      <motion.div
        className="card shadow p-4 w-100"
        style={{ maxWidth: '700px', borderRadius: '20px' }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-center mb-4 text-primary">🌟 K Blog Website</h2>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter Blog Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Enter Blog Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddOrUpdatePost}
          className="btn btn-primary w-100 mb-3"
        >
          {editIndex !== null ? 'Update Blog' : 'Add Blog'} <FiPlus />
        </motion.button>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search blogs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {filteredPosts.map((post, index) => (
          <motion.div
            className="card mb-3 shadow-sm"
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content}</p>
                </div>
                <div className="d-flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleEdit(index)}
                  >
                    <FiEdit2 />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                  >
                    <FiTrash2 />
                  </motion.button>
                </div>
              </div>

              {/* Comment Section */}
              <div className="mt-3">
                <h6>Comments:</h6>
                <ul className="list-group mb-2">
                  {post.comments.map((c, i) => (
                    <li key={i} className="list-group-item py-1 px-2">{c}</li>
                  ))}
                </ul>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add comment..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="btn btn-secondary"
                    onClick={() => handleAddComment(index)}
                  >
                    Comment
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
