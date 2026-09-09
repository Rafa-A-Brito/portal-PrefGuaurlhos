import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Inicio from "./pages/Inicio/Inicio";
import Mapa from "./pages/Mapa/Mapa";
import Patrimonios from "./pages/Patrimonios/Patrimonios";
import ConhecaMais from "./pages/ConhecaMais/ConhecaMais";
import { PatrimoniosProvider } from "./context/PatrimoniosContext";

export default function App() {
  return (
    <PatrimoniosProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/mapa" element={<Mapa />} />
              <Route path="/patrimonios" element={<Patrimonios />} />
              <Route path="/conheca-mais" element={<ConhecaMais />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </PatrimoniosProvider>
  );
}
