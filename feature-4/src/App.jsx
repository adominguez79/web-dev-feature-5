// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./Components/Common/Navbar"; // Adjust import path if needed
import AuthorView from "./views/AuthorView";
import Env from './environments'
import Parse from "parse";
import ForumView from './views/ForumView';
import ProfileView from './views/ProfileView';

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

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