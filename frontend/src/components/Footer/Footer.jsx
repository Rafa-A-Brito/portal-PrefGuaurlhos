import { Link } from "react-router-dom";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="app-footer" id="contato">
      <div className="footer-grid">
        <div className="footer-col footer-brand">
          <div className="footer-brand-row">
            <BuildingLibraryIcon width={24} height={24} />
            <div>
              <strong>Patrimônio Cultural</strong>
              <span>Prefeitura de Guarulhos</span>
            </div>
          </div>
          <p>
            Mapeamento colaborativo dos bens históricos, culturais e naturais do
            município — projeto acadêmico em parceria com a comunidade.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navegação</h4>
          <Link to="/">Início</Link>
          <Link to="/mapa">Acervo &amp; Mapa</Link>
        </div>

        <div className="footer-col">
          <h4>Institucional</h4>
          <span className="footer-info">
            <MapPinIcon width={15} height={15} /> Guarulhos, SP
          </span>
          <span className="footer-info">
            <EnvelopeIcon width={15} height={15} />{" "}
            patrimonio@guarulhos.sp.gov.br
          </span>
          <span className="footer-info">
            <PhoneIcon width={15} height={15} /> (11) 0000-0000
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Mapeamento Cultural de Guarulhos. Projeto Acadêmico /
          Colaborativo.
        </p>
      </div>
    </footer>
  );
}
