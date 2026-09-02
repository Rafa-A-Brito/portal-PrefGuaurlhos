import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { PatrimoniosProvider } from "./context/PatrimoniosContext";
import FloatingMap from "./features/mapa/FloatingMap";
import Navbar from "./components/Navbar/NavBar";
import ConhecaMais from "./pages/ConhecaMais/ConhecaMais";
import Inicio from "./pages/Inicio/Inicio";
import Mapa from "./pages/Mapa/Mapa";
import Patrimonios from "./pages/Patrimonios/Patrimonios";

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
          <FloatingMap />
        </div>
      </BrowserRouter>
    </PatrimoniosProvider>
  );
}
