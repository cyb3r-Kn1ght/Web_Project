import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./page/login.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Login />
  </StrictMode>
);

// day la file gop phan goi den va render ra trang web
// Xu li, goi, router cac trang web tai day
// KHONG XOA TRANG NAY
