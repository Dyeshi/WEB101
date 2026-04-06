import posts from "../data/posts";
import Post from "./Post";

function PostList() {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;