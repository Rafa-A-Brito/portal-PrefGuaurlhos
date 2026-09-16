import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import Inicio from "./pages/Inicio/Inicio";
import Mapa from "./pages/Mapa/Mapa";
import Patrimonios from "./pages/Patrimonios/Patrimonios";
import PatrimonioDetalhe from "./pages/PatrimonioDetalhe/PatrimonioDetalhe";
import ConhecaMais from "./pages/ConhecaMais/ConhecaMais";
import { PatrimoniosProvider } from "./context/PatrimoniosContext";

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className="app-main">
      <div key={location.pathname} className="page-transition">
        <Routes location={location}>
          <Route path="/" element={<Inicio />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/patrimonios" element={<Patrimonios />} />
          <Route path="/patrimonios/:id" element={<PatrimonioDetalhe />} />
          <Route path="/conheca-mais" element={<ConhecaMais />} />
        </Routes>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <PatrimoniosProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <AppRoutes />
          <Footer />
        </div>
      </BrowserRouter>
    </PatrimoniosProvider>
  );
}
