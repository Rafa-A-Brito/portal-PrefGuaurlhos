import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

/**
 * Guard de UX para o React Router v6. Usa <Outlet /> para funcionar como
 * rota "pai" — todas as rotas filhas dela só renderizam se autenticado().
 *
 * `permissoes` (opcional) faz o RBAC básico no frontend: se passado, exige
 * que usuario.perfil esteja na lista. Repito: isso só evita que o React
 * DESENHE o botão/página — a chamada real (ex.: DELETE /patrimonios/:id)
 * precisa ser bloqueada de novo no backend, no roleMiddleware.
 */
export default function RotaProtegida({ permissoes }) {
  const { autenticado, carregando, usuario } = useAuth();
  const location = useLocation();

  if (carregando) {
    return <div className="empty-state">Verificando sessão…</div>;
  }

  if (!autenticado) {
    // "state: { from }" guarda pra onde o usuário ia, pra devolver após o login.
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (permissoes && !permissoes.includes(usuario?.perfil)) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
