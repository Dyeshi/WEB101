import React from "react";
import Story from "./Story";
import { stories } from "../data/posts";

const StoriesBar = () => (
  <div className="stories-bar">
    {stories.map(story => (
      <Story key={story.id} story={story} />
    ))}
  </div>
);

export default StoriesBar;