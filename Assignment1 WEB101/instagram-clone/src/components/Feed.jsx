import React from "react";
import Post from "./Post";
import { posts } from "../data/posts";

const Feed = () => (
  <div className="feed">
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
);

export default Feed;