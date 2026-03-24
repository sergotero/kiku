import { Routes, Route } from "react-router";
import { HomePage, AccessPage, KanasPage, SearchPage, DetailPage } from "./pages";
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
      <Route path="/dictionary/:type/:id" element={<DetailPage />} />
      <Route path="/dictionary/:type/:id" element={<DetailPage />} />
    </Routes>
    </>
  )
}

export default App
