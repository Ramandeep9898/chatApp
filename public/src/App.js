import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Register } from "./Pages/Register";
import { Chat } from "./Pages/Chat";
import { Login } from "./Pages/Login";
import { SetAvatar } from "./Pages/SetAvatar";
import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Chat />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
