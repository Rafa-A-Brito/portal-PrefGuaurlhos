import ESTACAO_IMG from "../../assets/sra_bonsucesso.png";
import IGREJA_IMG from "../../assets/festa_bonsucesso.jpg";
import HOSPITAL_IMG from "../../assets/hospital_padre_bento.jpg";

/**
 * Conteúdo específico do Hero da Home — não faz parte do catálogo de
 * patrimônios (esse vem de features/mocks/patrimoniosMock.js, a mesma
 * fonte usada pela página de Patrimônios/Mapa). Aqui fica só o card em
 * destaque flutuante.
 */
export const heroDestaqueMock = {
  nome: "Antigo hospital municipal",
  bairro: "Centro, Guarulhos",
  resumo: "Um marco da história e da saúde pública da cidade.",
  imagens: [HOSPITAL_IMG, ESTACAO_IMG, IGREJA_IMG],
  extra: 5,
};
