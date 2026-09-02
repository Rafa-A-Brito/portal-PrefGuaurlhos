import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { PatrimoniosProvider } from "./context/PatrimoniosContext";
import FloatingMap from "./features/mapa/FloatingMap";
import Navbar from "./features/mapa/Navbar/Navbar";
import Inicio from "./pages/Inicio/Inicio";
import Mapa from "./pages/Mapa/Mapa";
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
            </Routes>
          </main>
          <Footer />
          <FloatingMap />
        </div>
      </BrowserRouter>
    </PatrimoniosProvider>
  );
}
