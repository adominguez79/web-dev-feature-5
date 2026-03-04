// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Common/Navbar"; // Adjust import path if needed
import AuthorView from "./views/AuthorView";

import * as Env from './environments'
import Parse from "parse";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

console.log(Env.SERVER_URL);

import ForumView from './views/ForumView';
import ProfileView from './views/ProfileView';

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