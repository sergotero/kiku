import { Routes, Route, Navigate } from "react-router";
import { HomePage, AccessPage, KanasPage, SearchPage, DetailPage, ControlPanel } from "./pages";
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
      <Route path="/control-panel/:type" element={<ControlPanel />} />
      <Route path="/*" element={<Navigate to={"/access"} />} />
    </Routes>
    </>
  )
}

export default App
