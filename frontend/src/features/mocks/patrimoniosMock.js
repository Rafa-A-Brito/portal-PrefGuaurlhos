import ESTACAO_IMG from "../../assets/sra_bonsucesso.png";
import BOSQUE_IMG from "../../assets/bosque_maia.jpg";
import IGREJA_IMG from "../../assets/festa_bonsucesso.jpg";
import HOSPITAL_IMG from "../../assets/hospital_padre_bento.jpg";

/**
 * Catálogo único de patrimônios mockados — fonte de dados compartilhada
 * entre a Home (Destaques) e a página de Patrimônios/Mapa, usada pelo
 * fakeApi enquanto não há um backend real no ar. Categorias seguem o
 * enum de features/categoriaMeta.js (arquitetonico | imaterial | natural
 * | documental) para que filtros, badges e legendas fiquem consistentes
 * em toda a aplicação. "endereco" e "cep" alimentam a busca por CEP e as
 * informações exibidas nas páginas de detalhe/mapa.
 */
export const patrimoniosMock = [
  {
    id: "1",
    nome: "Estação Ferroviária de Guarulhos",
    categoria: "arquitetonico",
    bairro: "Centro",
    endereco: "Praça Vereador Vicente Alves de Souza, s/n",
    cep: "07011-040",
    resumo:
      "Antiga estação que integrou Guarulhos à Estrada de Ferro Central do Brasil, hoje um marco arquitetônico do Centro da cidade.",
    imagemPrincipal: ESTACAO_IMG,
    localizacao: { lat: -23.4543, lng: -46.5333 },
  },
  {
    id: "2",
    nome: "Parque Bosque Maia",
    categoria: "natural",
    bairro: "Jardim Maia",
    endereco: "Rua Alberto Byington, s/n",
    cep: "07097-030",
    resumo:
      "Maior parque urbano de Guarulhos, considerado o pulmão verde do município e espaço de convivência.",
    imagemPrincipal: BOSQUE_IMG,
    localizacao: { lat: -23.4565, lng: -46.5292 },
  },
  {
    id: "3",
    nome: "Igreja Matriz Nossa Senhora da Conceição",
    categoria: "arquitetonico",
    bairro: "Centro",
    endereco: "Praça Tereza Cristina, 60",
    cep: "07011-040",
    resumo:
      "Igreja que dá nome à padroeira da cidade, referência religiosa e arquitetônica do Centro histórico.",
    imagemPrincipal: IGREJA_IMG,
    localizacao: { lat: -23.455, lng: -46.5325 },
  },
  {
    id: "4",
    nome: "Antigo Hospital Municipal",
    categoria: "arquitetonico",
    bairro: "Centro",
    endereco: "Rua Dr. Jorge Ramos, s/n",
    cep: "07013-030",
    resumo: "Um marco da história e da saúde pública da cidade.",
    imagemPrincipal: HOSPITAL_IMG,
    localizacao: { lat: -23.453, lng: -46.531 },
  },
  {
    id: "5",
    nome: "Parque do Tietê",
    categoria: "natural",
    bairro: "Cumbica",
    endereco: "Av. Tancredo Neves, s/n",
    cep: "07231-000",
    resumo:
      "Área verde às margens do Rio Tietê, importante para o equilíbrio ambiental da região de Cumbica.",
    imagemPrincipal: BOSQUE_IMG,
    localizacao: { lat: -23.4368, lng: -46.4614 },
  },
  {
    id: "6",
    nome: "Capela de Nossa Senhora do Bonsucesso",
    categoria: "arquitetonico",
    bairro: "Bonsucesso",
    endereco: "Rua Silva Bueno, s/n",
    cep: "07162-160",
    resumo:
      "Construção histórica datada de meados do século XVIII, ponto central da tradicional Festa de Bonsucesso.",
    imagemPrincipal: ESTACAO_IMG,
    localizacao: { lat: -23.4182, lng: -46.4111 },
  },
  {
    id: "7",
    nome: "Festa de Bonsucesso",
    categoria: "imaterial",
    bairro: "Bonsucesso",
    endereco: "Rua Silva Bueno, s/n",
    cep: "07162-160",
    resumo:
      "Uma das manifestações religiosas e culturais mais antigas da Região Metropolitana de São Paulo.",
    imagemPrincipal: IGREJA_IMG,
    localizacao: { lat: -23.419, lng: -46.4105 },
  },
];
