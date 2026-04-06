import Navbar from "./components/Navbar";
import Stories from "./components/Stories";
import PostList from "./components/PostList";
import BottomNav from "./components/BottomNav";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="feed">
        <Stories />
        <PostList />
      </div>
      <BottomNav />
    </div>
  );
}

export default App;