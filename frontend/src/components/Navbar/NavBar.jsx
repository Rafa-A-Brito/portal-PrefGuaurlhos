import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  const linkClass = ({ isActive }) => (isActive ? "active" : "");
  const fechar = () => setMenuAberto(false);

  const itensNav = (
    <>
      <NavLink to="/" end className={linkClass} onClick={fechar}>
        Início
      </NavLink>
      <NavLink to="/mapa" className={linkClass} onClick={fechar}>
        Mapas
      </NavLink>
      <NavLink to="/patrimonios" className={linkClass} onClick={fechar}>
        Patrimônios
      </NavLink>
      <NavLink to="/conheca-mais" className={linkClass} onClick={fechar}>
        Conheça +
      </NavLink>
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
