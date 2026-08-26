import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import "../mapa/styles/mapa.css";

const GUARULHOS_CENTER = { lat: -23.4542, lng: -46.5268 };
const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "8px",
};

const FALLBACK_IMG =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23D9D9D9'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='16' fill='%235B5876' text-anchor='middle' dominant-baseline='middle'%3ESem imagem%3C/text%3E%3C/svg%3E";

export default function MapaPatrimonios({
  patrimonios = [],
  selecionado: selecionadoProp,
  onSelecionar,
}) {
  // Continua funcionando "sozinho" (estado interno) se ninguém controlar de fora,
  // e passa a ser controlado quando a página (Mapa.jsx) passa selecionado/onSelecionar.
  const [internalSelecionado, setInternalSelecionado] = useState(null);
  const selectedPatrimonio = onSelecionar
    ? selecionadoProp
    : internalSelecionado;
  const setSelectedPatrimonio = onSelecionar ?? setInternalSelecionado;

  const [map, setMap] = useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const isMockMode = import.meta.env.VITE_USE_MOCK_MAP === "true" || !apiKey;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey || "",
    preventGoogleFontsLoading: true,
  });

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!isMockMode && map && patrimonios.length > 0 && window.google) {
      const bounds = new window.google.maps.LatLngBounds();
      patrimonios.forEach((item) => {
        bounds.extend({ lat: item.localizacao.lat, lng: item.localizacao.lng });
      });
      map.fitBounds(bounds);

      if (patrimonios.length === 1) {
        map.setZoom(15);
      }
    }
  }, [map, patrimonios, isMockMode]);

  if (isMockMode) {
    return (
      <div className="map-wrapper">
        <div className="map-mockup-container">
          <div className="mockup-badge">
            <span className="mockup-dot" /> Modo Desenvolvedor (Mockup Sem Custo
            de API)
          </div>

          <div className="mockup-grid">
            {patrimonios.length === 0 ? (
              <p className="mockup-empty">
                Nenhum patrimônio encontrado para os filtros selecionados.
              </p>
            ) : (
              patrimonios.map((item) => (
                <div
                  key={item.id}
                  className={`mockup-pin-card ${selectedPatrimonio?.id === item.id ? "active" : ""}`}
                  onClick={() => setSelectedPatrimonio(item)}
                >
                  <span className={`badge-categoria ${item.categoria}`}>
                    {item.categoria}
                  </span>
                  <h4>{item.nome}</h4>
                  <p>📍 {item.bairro}</p>
                  <small>Nº {String(item.id).padStart(3, "0")}</small>
                </div>
              ))
            )}
          </div>

          {selectedPatrimonio && (
            <div className="mockup-infowindow">
              <button
                className="mockup-close-btn"
                onClick={() => setSelectedPatrimonio(null)}
              >
                ✕
              </button>
              <div className="info-window-card">
                <img
                  src={selectedPatrimonio.imagemPrincipal}
                  alt={selectedPatrimonio.nome}
                  className="info-window-img"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                />
                <span
                  className={`badge-categoria ${selectedPatrimonio.categoria}`}
                >
                  {selectedPatrimonio.categoria}
                </span>
                <h3>{selectedPatrimonio.nome}</h3>
                <p className="info-window-bairro">
                  📍 {selectedPatrimonio.bairro}
                </p>
                <p className="info-window-resumo">
                  {selectedPatrimonio.resumo}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (loadError)
    return <div className="map-error">Erro ao carregar a Google Maps API.</div>;
  if (!isLoaded) return <div className="map-loading">Carregando mapa...</div>;

  return (
    <div className="map-wrapper">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={GUARULHOS_CENTER}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {patrimonios.map((item) => (
          <MarkerF
            key={item.id}
            position={{ lat: item.localizacao.lat, lng: item.localizacao.lng }}
            title={item.nome}
            onClick={() => setSelectedPatrimonio(item)}
          />
        ))}

        {selectedPatrimonio && (
          <InfoWindowF
            position={{
              lat: selectedPatrimonio.localizacao.lat,
              lng: selectedPatrimonio.localizacao.lng,
            }}
            onCloseClick={() => setSelectedPatrimonio(null)}
          >
            <div className="info-window-card">
              <img
                src={selectedPatrimonio.imagemPrincipal}
                alt={selectedPatrimonio.nome}
                className="info-window-img"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMG;
                }}
              />
              <span
                className={`badge-categoria ${selectedPatrimonio.categoria}`}
              >
                {selectedPatrimonio.categoria}
              </span>
              <h3>{selectedPatrimonio.nome}</h3>
              <p className="info-window-bairro">
                📍 {selectedPatrimonio.bairro}
              </p>
              <p className="info-window-resumo">{selectedPatrimonio.resumo}</p>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
}
