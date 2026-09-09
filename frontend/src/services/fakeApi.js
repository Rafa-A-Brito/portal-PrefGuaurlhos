/**
 * Fake API — camada de acesso a dados que fala com um servidor local de
 * mentira (json-server), servindo db.json como se fosse a futura API REST.
 *
 * Quando o backend definitivo (Node/Express) estiver pronto, essas funções
 * não mudam de assinatura — só o VITE_API_BASE_URL no .env.local passa a
 * apontar para o backend real em vez de localhost:4000 (json-server).
 */
import api from "./api";

const LATENCIA_MS = 400;

function comLatencia(promise, ms = LATENCIA_MS) {
  return Promise.all([promise, new Promise((r) => setTimeout(r, ms))]).then(
    ([resultado]) => resultado,
  );
}

/** GET /patrimonios */
export async function listarPatrimonios() {
  return comLatencia(api.get("/patrimonios").then((r) => r.data));
}

/** GET /patrimonios/:id */
export async function buscarPatrimonioPorId(id) {
  try {
    return await comLatencia(api.get(`/patrimonios/${id}`).then((r) => r.data));
  } catch {
    return null;
  }
}

/**
 * json-server só gera CRUD simples por recurso — não tem rota de
 * agregação pronta. Buscamos a lista uma vez (já com a mesma chamada
 * acima, sem duplicar a latência) e calculamos no cliente.
 */
export async function obterEstatisticas() {
  const { data: patrimonios } = await api.get("/patrimonios");
  const bairros = new Set(patrimonios.map((p) => p.bairro));
  const categorias = new Set(patrimonios.map((p) => p.categoria));
  return comLatencia(
    Promise.resolve({
      totalBens: patrimonios.length,
      totalBairros: bairros.size,
      totalCategorias: categorias.size,
      primeiroTombamento: 1988,
    }),
    0, // já esperamos a rede acima; sem atraso extra aqui
  );
}

export async function listarCategoriasComContagem() {
  const { data: patrimonios } = await api.get("/patrimonios");
  return patrimonios.reduce((acc, item) => {
    acc[item.categoria] = (acc[item.categoria] || 0) + 1;
    return acc;
  }, {});
}
