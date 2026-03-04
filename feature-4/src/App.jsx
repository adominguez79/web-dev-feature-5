// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import ForumView from './views/ForumView';
import ProfileView from './views/ProfileView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ForumView />} />
      <Route path="/about" element={<ProfileView />} />
    </Routes>
  );
}

export default App;