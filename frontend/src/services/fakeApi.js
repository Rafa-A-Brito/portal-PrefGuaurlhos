/**
 * Fake API — camada de acesso a dados que hoje serve o catálogo mockado
 * de features/mocks/patrimoniosMock.js (a mesma fonte usada na Home),
 * simulando latência de rede. As assinaturas das funções são as mesmas
 * que uma API real teria, então quando o backend definitivo existir,
 * só é preciso trocar a implementação aqui — quem consome (contexto,
 * páginas) não muda.
 */
import { patrimoniosMock } from "../features/mocks/patrimoniosMock";

const LATENCIA_MS = 400;

function comLatencia(valor, ms = LATENCIA_MS) {
  return new Promise((resolve) => setTimeout(() => resolve(valor), ms));
}

/** GET /patrimonios */
export async function listarPatrimonios() {
  return comLatencia(patrimoniosMock);
}

/** GET /patrimonios/:id */
export async function buscarPatrimonioPorId(id) {
  const encontrado = patrimoniosMock.find((p) => String(p.id) === String(id));
  return comLatencia(encontrado ?? null);
}

export async function obterEstatisticas() {
  const bairros = new Set(patrimoniosMock.map((p) => p.bairro));
  const categorias = new Set(patrimoniosMock.map((p) => p.categoria));
  return comLatencia({
    totalBens: patrimoniosMock.length,
    totalBairros: bairros.size,
    totalCategorias: categorias.size,
    primeiroTombamento: 1988,
  });
}

export async function listarCategoriasComContagem() {
  const contagem = patrimoniosMock.reduce((acc, item) => {
    acc[item.categoria] = (acc[item.categoria] || 0) + 1;
    return acc;
  }, {});
  return comLatencia(contagem);
}
