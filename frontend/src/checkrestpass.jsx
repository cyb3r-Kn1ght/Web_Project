import page_reset from "./page/login/forgot_password";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<page_reset />} />
      </Routes>
    </>
  );
}

export default App;
