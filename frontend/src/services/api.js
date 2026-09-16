import axios from "axios";

/**
 * DESENVOLVIMENTO (json-server)
 *   baseURL = http://localhost:3001  (sem /api — o json-server serve as
 *   coleções na raiz: /usuarios, /patrimonios, ...)
 *   Suba com:  npx json-server --watch db.json --port 3001
 *
 * PRODUÇÃO (backend real)
 *   baseURL = VITE_API_BASE_URL, ex.: https://api.guarulhos.sp.gov.br/api
 *   e `withCredentials: true` para o cookie HttpOnly de sessão viajar
 *   nas requisições (sem isso o /auth/me sempre volta 401).
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },

  // ===== PRODUÇÃO — descomentar junto com o /auth/login real =====
  // withCredentials: true,
});

// Interceptador para tratamento global de erros nas requisições
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[API Error]:", error.response?.data || error.message);

    // ===== PRODUÇÃO — descomentar quando houver sessão de verdade =====
    // Sessão expirada/inválida: derruba o usuário para a tela de login.
    // Cuidado para não entrar em laço quando o próprio /auth/me der 401.
    //
    // const url = error.config?.url || "";
    // const ehRotaDeAuth = url.includes("/auth/");
    //
    // if (error.response?.status === 401 && !ehRotaDeAuth) {
    //   window.location.assign("/admin/login");
    // }

    return Promise.reject(error);
  },
);

export default api;
