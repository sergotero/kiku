import { Routes, Route } from "react-router";
import { HomePage, AccessPage, KanasPage, SearchPage } from "./pages";
import "./assets/styles/index.css";
import Navbar from "./components/ui/navbar/navbar.jsx";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/access" element={<AccessPage />} />
      <Route path="/kanas" element={<KanasPage />} />
      <Route path="/dictionary" element={<SearchPage />} />
    </Routes>
    </>
  )
}

export default App
