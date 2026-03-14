import { Routes, Route } from "react-router";
import { HomePage, LoginPage, RegisterPage } from "./pages";
import "./assets/styles/index.css";
import Navbar from "./components/ui/navbar/navbar.jsx";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </>
  )
}

export default App
