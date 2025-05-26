import Home from "./page/web_page/Home.jsx";
import Login from "./page/login/login.jsx";
import Chat from "./page/chat/chat.jsx";

import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
