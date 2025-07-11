import React from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function BlogCard({ post, onDelete, onEdit }) {
  return (
    <motion.div
      className="p-4 rounded-xl backdrop-blur-md bg-white/30 dark:bg-white/10 shadow-lg border border-white/40 dark:border-white/20 transition hover:scale-105 hover:shadow-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}
      <h2 className="text-xl font-bold mb-1 dark:text-white">{post.title}</h2>
      <p className="text-sm mb-3 dark:text-gray-300">{post.description}</p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 transition"
        >
          <FiEdit2 />
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="text-red-600 hover:text-red-800 transition"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
}
