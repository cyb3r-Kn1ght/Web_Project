import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Chat from "./page/chat.jsx";
import "../src/style/main.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Chat />
  </StrictMode>
);

// day la file gop phan goi den va render ra trang web
// Xu li, goi, router cac trang web tai day
// KHONG XOA TRANG NAY
