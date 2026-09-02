import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import {
  listarPatrimonios,
  obterEstatisticas,
  listarCategoriasComContagem,
} from "../services/fakeApi";

const PatrimoniosContext = createContext(null);

export function PatrimoniosProvider({ children }) {
  const [patrimonios, setPatrimonios] = useState([]);
  const [estatisticas, setEstatisticas] = useState(null);
  const [categorias, setCategorias] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Estado de seleção compartilhado entre o mapa flutuante, a página de
  // acervo e a lista — clicar num card em qualquer lugar destaca o mesmo
  // item nos outros componentes que estiverem escutando.
  const [selecionado, setSelecionado] = useState(null);

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
    } catch (e) {
      setErro("Não foi possível carregar os dados do patrimônio agora.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
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
    }),
    [
      patrimonios,
      estatisticas,
      categorias,
      carregando,
      erro,
      carregar,
      selecionado,
    ],
  );

  return (
    <PatrimoniosContext.Provider value={value}>
      {children}
    </PatrimoniosContext.Provider>
  );
}

export function usePatrimoniosContext() {
  const ctx = useContext(PatrimoniosContext);
  if (!ctx) {
    throw new Error(
      "usePatrimoniosContext deve ser usado dentro de <PatrimoniosProvider>",
    );
  }
  return ctx;
}
