import { FaHeart, FaRegComment, FaPaperPlane, FaBookmark } from "react-icons/fa";

function Post({ post }) {
  return (
    <div className="post">
      <div className="post-header">{post.username}</div>

      <img src={post.image} alt="post" />

      <div className="post-actions">
        <div className="left-icons">
          <FaHeart />
          <FaRegComment />
          <FaPaperPlane />
        </div>
        <FaBookmark />
      </div>

      <div className="post-content">
        <p><strong>{post.likes} likes</strong></p>
        <p><strong>{post.username}</strong> {post.caption}</p>
      </div>
    </div>
  );
}

export default Post;