import { useState, useCallback, useMemo, useEffect } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContextInstance.js";

/**
 * IMPORTANTE — isto é o guard de UX, não o guard de segurança.
 *
 * Este contexto só decide o que o React MOSTRA (esconder um botão, redirecionar
 * uma rota). Ele não impede ninguém de chamar a API diretamente com Postman/
 * DevTools. A autorização de verdade tem que estar no backend: toda rota que
 * cria/edita/apaga patrimônio precisa validar sessão + perfil no servidor.
 *
 * ---------------------------------------------------------------------------
 * ESTADO ATUAL: json-server (desenvolvimento)
 * ---------------------------------------------------------------------------
 * O json-server é só um CRUD REST em cima de um db.json — ele NÃO tem
 * /auth/login, não emite cookie de sessão e não sabe o que é "quem sou eu".
 * Então, nesta fase:
 *
 *   - login    -> GET /usuarios?email=...&senha=...  (filtro nativo do json-server)
 *   - sessão   -> sessionStorage (só para sobreviver ao F5 durante o dev)
 *   - logout   -> limpa o sessionStorage
 *
 * Isso é ACEITÁVEL APENAS COM DADOS FALSOS. A senha viaja na query string,
 * fica no histórico do navegador e no log do json-server, e o "usuário logado"
 * é editável pelo DevTools. Nada disso pode ir para produção — por isso o
 * caminho real está escrito e comentado logo abaixo de cada função.
 *
 * ---------------------------------------------------------------------------
 * QUANDO O BACKEND REAL EXISTIR
 * ---------------------------------------------------------------------------
 *   1. Apagar os blocos "MOCK" e descomentar os blocos "PRODUÇÃO".
 *   2. Ligar `withCredentials: true` em src/services/api.js.
 *   3. Backend devolve cookie HttpOnly + SameSite=Lax/Strict no /auth/login.
 *   4. NUNCA guardar token de sessão em localStorage/sessionStorage
 *      (XSS lê storage; não lê cookie HttpOnly).
 */

// Chave do "faz de conta" de sessão. Só existe no modo mock.
const CHAVE_SESSAO_MOCK = "guarulhos.admin.sessao";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // ===========================================================================
  // verificarSessao — roda uma vez na montagem do Provider
  // ===========================================================================

  /* ---------- MOCK (json-server) — ATIVO ---------- */
  const verificarSessao = useCallback(async () => {
    setCarregando(true);

    try {
      const bruto = sessionStorage.getItem(CHAVE_SESSAO_MOCK);

      if (!bruto) {
        setUsuario(null);
        return;
      }

      const salvo = JSON.parse(bruto);

      // Confere o formato mínimo antes de confiar no que veio do storage.
      if (salvo?.id && salvo?.email) {
        setUsuario(salvo);
      } else {
        sessionStorage.removeItem(CHAVE_SESSAO_MOCK);
        setUsuario(null);
      }
    } catch {
      // JSON corrompido / storage bloqueado: trata como deslogado.
      sessionStorage.removeItem(CHAVE_SESSAO_MOCK);
      setUsuario(null);
    } finally {
      setCarregando(false);
    }
  }, []);

  /* ---------- PRODUÇÃO (backend real) — descomentar depois ----------
  const verificarSessao = useCallback(async () => {
    setCarregando(true);
    try {
      // O cookie HttpOnly vai junto por causa do withCredentials da instância.
      const { data } = await api.get("/auth/me");
      setUsuario(data);
    } catch (err) {
      if (!err.response) {
        console.warn("[Auth] Backend inacessível. Assumindo usuário deslogado.");
      }
      setUsuario(null);
    } finally {
      setCarregando(false);
    }
  }, []);
  ------------------------------------------------------------------- */

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    verificarSessao();
  }, [verificarSessao]);

  // ===========================================================================
  // login
  // ===========================================================================

  /* ---------- MOCK (json-server) — ATIVO ---------- */
  const login = useCallback(async (email, senha) => {
    setErro(null);

    try {
      // Filtro nativo do json-server: /usuarios?email=x&senha=y
      // (comparação exata, feita no "servidor" — só serve para dados falsos).
      const { data } = await api.get("/usuarios", {
        params: { email: email.trim().toLowerCase(), senha },
      });

      const encontrado = Array.isArray(data) ? data[0] : null;

      if (!encontrado) {
        // Mensagem genérica de propósito: não revela se o e-mail existe.
        setErro("E-mail ou senha inválidos.");
        return false;
      }

      // Nunca deixar a senha entrar no estado do React nem no storage.
      const usuarioSeguro = { ...encontrado };
      delete usuarioSeguro.senha;

      sessionStorage.setItem(CHAVE_SESSAO_MOCK, JSON.stringify(usuarioSeguro));
      setUsuario(usuarioSeguro);
      return true;
    } catch (err) {
      if (!err.response) {
        setErro(
          "Não foi possível falar com o json-server (localhost:3001). " +
            "Verifique se ele está rodando.",
        );
      } else {
        setErro("E-mail ou senha inválidos.");
      }
      return false;
    }
  }, []);

  /* ---------- PRODUÇÃO (backend real) — descomentar depois ----------
  const login = useCallback(async (email, senha) => {
    setErro(null);
    try {
      // O backend responde 200 + dados públicos do usuário e seta o cookie
      // HttpOnly de sessão no Set-Cookie. O front nunca vê o token.
      const { data } = await api.post("/auth/login", { email, senha });
      setUsuario(data);
      return true;
    } catch {
      setErro("E-mail ou senha inválidos.");
      return false;
    }
  }, []);
  ------------------------------------------------------------------- */

  // ===========================================================================
  // logout
  // ===========================================================================

  /* ---------- MOCK (json-server) — ATIVO ---------- */
  const logout = useCallback(async () => {
    sessionStorage.removeItem(CHAVE_SESSAO_MOCK);
    setUsuario(null);
  }, []);

  /* ---------- PRODUÇÃO (backend real) — descomentar depois ----------
  const logout = useCallback(async () => {
    try {
      // Quem invalida a sessão é o servidor (limpa o cookie).
      await api.post("/auth/logout");
    } finally {
      setUsuario(null);
    }
  }, []);
  ------------------------------------------------------------------- */

  const value = useMemo(
    () => ({
      usuario,
      carregando,
      erro,
      autenticado: !!usuario,
      login,
      logout,
    }),
    [usuario, carregando, erro, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
