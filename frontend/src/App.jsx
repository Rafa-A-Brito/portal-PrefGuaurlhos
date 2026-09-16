import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";

import Inicio from "./pages/Inicio/Inicio";
import Mapa from "./pages/Mapa/Mapa";
import Patrimonios from "./pages/Patrimonios/Patrimonios";
import ConhecaMais from "./pages/ConhecaMais/ConhecaMais";

import { PatrimoniosProvider } from "./context/PatrimoniosContext";
import { AuthProvider } from "./context/AuthContext";

import RotaProtegida from "./features/admin/components/RotaProtegida";
import LoginAdmin from "./features/admin/pages/LoginAdmin";

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes location={location}>
      {/* ===== Site público ===== */}
      <Route
        path="/*"
        element={
          <div className="app-container">
            <Navbar />

            <main className="app-main">
              <div key={location.pathname} className="page-transition">
                <Routes location={location}>
                  <Route path="/" element={<Inicio />} />
                  <Route path="/mapa" element={<Mapa />} />
                  <Route path="/patrimonios" element={<Patrimonios />} />
                  <Route path="/conheca-mais" element={<ConhecaMais />} />
                </Routes>
              </div>
            </main>

            <Footer />
          </div>
        }
      />

      {/* ===== Área administrativa ===== */}
      <Route path="/admin/login" element={<LoginAdmin />} />

      <Route element={<RotaProtegida />}>
        <Route
          path="/admin"
          element={
            <div className="page-hero">
              <h1>Dashboard administrativo</h1>
              <p>Em construção.</p>
            </div>
          }
        />

        {/* Próximas rotas:
        <Route
          path="/admin/patrimonios"
          element={<PatrimoniosAdmin />}
        />

        <Route
          path="/admin/usuarios"
          element={<UsuariosAdmin />}
        />
        */}
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PatrimoniosProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PatrimoniosProvider>
    </AuthProvider>
  );
}
