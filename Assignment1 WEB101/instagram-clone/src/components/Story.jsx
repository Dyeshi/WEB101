import React from "react";

const Story = ({ story }) => (
  <div className="story">
    <img src={story.image} alt={story.username} className="story-image" />
    <span>{story.username}</span>
  </div>
);

export default Story;