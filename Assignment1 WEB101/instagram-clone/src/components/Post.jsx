import React from "react";
import { FaHeart, FaRegComment, FaShare } from "react-icons/fa";

const Post = ({ post }) => (
  <div className="post">
    <div className="post-header">
      <img src={post.avatar} alt={post.username} className="avatar" />
      <span>{post.username}</span>
    </div>
    <img src={post.image} alt="Post" className="post-image" />
    <div className="post-actions">
      <FaHeart />
      <FaRegComment />
      <FaShare />
    </div>
    <div className="post-info">
      <span>{post.likes} likes</span>
      <p><strong>{post.username}</strong> {post.caption}</p>
      {post.comments.map(comment => (
        <p key={comment.id}><strong>{comment.username}</strong> {comment.text}</p>
      ))}
    </div>
  </div>
);

export default Post;