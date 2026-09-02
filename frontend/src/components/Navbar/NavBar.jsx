import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { usePatrimoniosContext } from "../../hooks/usePatrimoniosContext";

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { abrirMapaFlutuante } = usePatrimoniosContext();

  const linkClass = ({ isActive }) => (isActive ? "active" : "");
  const fechar = () => setMenuAberto(false);

  const itensNav = (
    <>
      <NavLink to="/" end className={linkClass} onClick={fechar}>
        Início
      </NavLink>
      {/* "Maps" não é uma página própria — abre o mapa flutuante global */}
      <button
        type="button"
        className="navbar-link-btn"
        onClick={() => {
          abrirMapaFlutuante();
          fechar();
        }}
      >
        Maps
      </button>
      <NavLink to="/mapa" className={linkClass} onClick={fechar}>
        Patrimônios
      </NavLink>
      <a href="/#sobre" onClick={fechar}>
        Conheça mais
      </a>
      <a href="/#contato" onClick={fechar}>
        Contato
      </a>
    </>
  );

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="brand-mark">
          <BuildingLibraryIcon width={22} height={22} />
        </div>
        <div className="brand-text">
          <span className="b1">Prefeitura de</span>
          <span className="b2">Guarulhos</span>
        </div>
      </div>

      <nav className="navbar-nav navbar-nav-desktop">{itensNav}</nav>

      <button
        className="navbar-toggle"
        onClick={() => setMenuAberto((v) => !v)}
        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuAberto}
      >
        {menuAberto ? (
          <XMarkIcon width={22} height={22} />
        ) : (
          <Bars3Icon width={22} height={22} />
        )}
      </button>

      {menuAberto && (
        <nav className="navbar-nav navbar-nav-mobile">{itensNav}</nav>
      )}
    </header>
  );
}
