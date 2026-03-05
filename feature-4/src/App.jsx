import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Common/Navbar"; // Adjust import path if needed
import ForumView from "./views/ForumView";
import AuthorView from "./views/AuthorView";
import ProfileView from "./views/ProfileView";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/forum" />} />
        <Route path="/forum" element={<ForumView />} />
        <Route path="/Author/:id" element={<AuthorView />} />
        <Route path="/profile" element={<ProfileView />} />
      </Routes>
    </>
  );
}

export default App;