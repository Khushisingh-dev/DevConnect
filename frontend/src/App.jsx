import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      <Route path="/home" element={<Home />} />

      <Route path="/profile/:id" element={<Profile />} />

      <Route
        path="/edit-profile"
        element={<EditProfile />}
      />

      <Route path="*" element={<NotFound />} />
      
    </Routes>
  );
}

export default App;