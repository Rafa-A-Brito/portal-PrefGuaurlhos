import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import Inicio from "./pages/Inicio/Inicio";
import Mapa from "./pages/Mapa/Mapa";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/mapa" element={<Mapa />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>
            © 2026 Mapeamento Cultural de Guarulhos. Projeto Acadêmico /
            Colaborativo.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
