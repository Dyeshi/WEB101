import React from "react";
import Navbar from "./components/Navbar";
import StoriesBar from "./components/StoriesBar";
import Feed from "./components/Feed";
import Sidebar from "./components/Sidebar";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <div className="left-section">
          <StoriesBar />
          <Feed />
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;