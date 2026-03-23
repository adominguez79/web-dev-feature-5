// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Env from "./environments";
import Parse from "parse";
import NavBar from "./Components/Common/Navbar"; // Adjust import path if needed
import AuthorView from "./Views/AuthorView";
import ForumView from "./views/ForumView";
import ProfileView from "./views/ProfileView";
import AuthModule from "./components/Auth/Auth";
import AuthRegister from "./components/Auth/AuthRegister";
import ProtectedRoute from "./services/ProtectedRoute";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/Auth" element={<AuthModule />} />

        <Route path="/register" element={<AuthRegister />} />
        
        <Route
          path="/forum"
          element={
            <ProtectedRoute>
              <ForumView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Author/:id"
          element={
            <ProtectedRoute>
              <AuthorView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileView />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </>
  );
}

export default App;
