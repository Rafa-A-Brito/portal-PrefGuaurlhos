import { useEffect, useMemo, useState, useCallback } from "react";
import {
  listarPatrimonios,
  obterEstatisticas,
  listarCategoriasComContagem,
} from "../services/fakeApi";
import { PatrimoniosContext } from "./patrimoniosContextInstance";

export function PatrimoniosProvider({ children }) {
  const [patrimonios, setPatrimonios] = useState([]);
  const [estatisticas, setEstatisticas] = useState(null);
  const [categorias, setCategorias] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [selecionado, setSelecionado] = useState(null);

  // Estado do mapa flutuante fica aqui pra que o item "Maps" da Navbar
  // (que não tem rota própria) consiga abri-lo de qualquer página.
  const [mapaFlutuanteAberto, setMapaFlutuanteAberto] = useState(false);
  const abrirMapaFlutuante = useCallback(
    () => setMapaFlutuanteAberto(true),
    [],
  );
  const fecharMapaFlutuante = useCallback(
    () => setMapaFlutuanteAberto(false),
    [],
  );

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const [listaResp, statsResp, catResp] = await Promise.all([
        listarPatrimonios(),
        obterEstatisticas(),
        listarCategoriasComContagem(),
      ]);
      setPatrimonios(listaResp);
      setEstatisticas(statsResp);
      setCategorias(catResp);
    } catch (erroCapturado) {
      console.error(
        "[PatrimoniosProvider] falha ao carregar dados:",
        erroCapturado,
      );
      setErro("Não foi possível carregar os dados do patrimônio agora.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregar();
  }, [carregar]);

  const value = useMemo(
    () => ({
      patrimonios,
      estatisticas,
      categorias,
      carregando,
      erro,
      recarregar: carregar,
      selecionado,
      setSelecionado,
      mapaFlutuanteAberto,
      abrirMapaFlutuante,
      fecharMapaFlutuante,
      setMapaFlutuanteAberto,
    }),
    [
      patrimonios,
      estatisticas,
      categorias,
      carregando,
      erro,
      carregar,
      selecionado,
      mapaFlutuanteAberto,
      abrirMapaFlutuante,
      fecharMapaFlutuante,
    ],
  );

  return (
    <PatrimoniosContext.Provider value={value}>
      {children}
    </PatrimoniosContext.Provider>
  );
}
