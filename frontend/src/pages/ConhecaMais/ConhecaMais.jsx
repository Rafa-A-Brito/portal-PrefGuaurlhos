import { useNavigate } from "react-router-dom";
import {
  AcademicCapIcon,
  SparklesIcon,
  UsersIcon,
  MapIcon,
  Squares2X2Icon,
  MegaphoneIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/outline";
import { usePatrimoniosContext } from "../../hooks/usePatrimoniosContext";

/**
 * NOVIDADES DA PREFEITURA
 * -------------------------------------------------------------------------
 * Mock de conteúdo editorial. Em produção isso deve vir de uma rota real
 * (ex.: GET /novidades, alimentada pela Secretaria de Cultura) em vez de
 * ficar hardcoded aqui — deixei como array estático só para o protótipo
 * ter algo real para renderizar.
 *
 * "url" aponta para o portal oficial da Prefeitura porque ainda não existe
 * uma página de notícia própria dentro deste app (ver App.jsx: não há rota
 * "/novidades/:id"). Assim o CTA "Saiba mais" já funciona de verdade hoje,
 * em vez de linkar para uma rota inexistente.
 */
const PORTAL_PREFEITURA = "https://www.guarulhos.sp.gov.br";

const novidades = [
  {
    id: "fomento-pontos-cultura",
    tag: "Edital",
    data: "Fomento aos Pontos de Cultura",
    titulo: "Programa Municipal de Fomento aos Pontos de Cultura",
    resumo:
      "Instituído pela Lei nº 8.113/2023, o programa reconhece coletivos e núcleos culturais de Guarulhos como Pontos de Cultura, com apoio financeiro via seleção pública.",
    url: PORTAL_PREFEITURA,
  },
  {
    id: "restauro-paco",
    tag: "Patrimônio",
    data: "Restauro em andamento",
    titulo: "Restauro da Antiga Sede da Prefeitura e da Câmara",
    resumo:
      "O prédio histórico do antigo Paço Municipal segue em processo de restauração, acompanhado pelo Conselho de Patrimônio Histórico, Artístico e Ambiental (CPHAA).",
    url: PORTAL_PREFEITURA,
  },
  {
    id: "plano-municipal-cultura",
    tag: "Política pública",
    data: "Plano Municipal de Cultura 2020–2029",
    titulo: "Plano Municipal de Cultura orienta a próxima década",
    resumo:
      "Instituído pela Lei nº 7.834/2020, o PMC é o documento que planeja a política cultural do município para os dez anos seguintes.",
    url: PORTAL_PREFEITURA,
  },
];

/**
 * EXPOSIÇÕES E ARTISTAS EM DESTAQUE
 * -------------------------------------------------------------------------
 * Conteúdo de exemplo/placeholder — inclusive a entrada do artista citado
 * (Roberto Faria). Não encontrei uma biografia oficial verificável para
 * usar aqui, então deixei os campos de texto genéricos de propósito
 * (sem inventar datas, obras ou citações). Antes de publicar, troque
 * "bio" e "imagem" pelo material real fornecido pela Secretaria de
 * Cultura/pelo próprio artista.
 *
 * "imagem" segue o mesmo padrão do restante do projeto (caminho em
 * /src/assets/..., como em patrimonios em db.json) — os arquivos ainda
 * precisam ser adicionados por vocês.
 */
const exposicoes = [
  {
    id: "expo-roberto-farias",
    periodo: "Em cartaz",
    titulo: "Mostra individual — Roberto Farias",
    artista: "Roberto Faria",
    local: "Centro Cultural de Guarulhos",
    bio: "Artista convidado desta edição. [Substituir por biografia oficial fornecida pela Secretaria de Cultura.]",
    imagem: "/src/assets/exposicoes/roberto_farias.jpg",
    ctaSaibaMais: PORTAL_PREFEITURA,
  },
  {
    id: "expo-coletiva-bairros",
    periodo: "Próxima edição",
    titulo: "Coletiva de artistas dos bairros",
    artista: "Diversos artistas locais",
    local: "A definir",
    bio: "Mostra coletiva reunindo produção de artistas visuais ligados aos Pontos de Cultura do município. [Conteúdo de exemplo — atualizar com a programação real.]",
    imagem: "/src/assets/exposicoes/coletiva_bairros.jpg",
    ctaSaibaMais: PORTAL_PREFEITURA,
  },
];

/**
 * E-mail de contato do CTA "Quero expor meu trabalho". Assim como o
 * placeholder já usado em LoginAdmin ("servidor@guarulhos.sp.gov.br"),
 * este endereço é ilustrativo — troque pelo canal real da Secretaria
 * de Cultura antes de publicar.
 */
const EMAIL_CULTURA = "cultura@guarulhos.sp.gov.br";

export default function ConhecaMais() {
  const navigate = useNavigate();
  const { estatisticas, carregando } = usePatrimoniosContext();

  return (
    <div>
      <div className="page-hero">
        <h1>Conheça mais sobre o projeto</h1>
        <p>
          Um mapeamento colaborativo da memória histórica e cultural de
          Guarulhos, feito para aproximar a população da própria história.
        </p>
      </div>

      <section className="sobre" style={{ marginTop: 0 }}>
        <div className="sobre-inner">
          <div className="section-head">
            <div>
              <h2>Nossa missão</h2>
              <p className="sub">
                Três frentes guiam o que essa plataforma se propõe a fazer.
              </p>
            </div>
          </div>
          <div className="sobre-grid">
            <div className="sobre-card">
              <AcademicCapIcon width={24} height={24} />
              <h3>Educar</h3>
              <p>
                Aproximar estudantes e o público jovem da história e da memória
                artística de Guarulhos.
              </p>
            </div>
            <div className="sobre-card">
              <SparklesIcon width={24} height={24} />
              <h3>Preservar</h3>
              <p>
                Centralizar documentos, imagens e curiosidades sobre cada bem
                tombado num só lugar.
              </p>
            </div>
            <div className="sobre-card">
              <UsersIcon width={24} height={24} />
              <h3>Conectar</h3>
              <p>
                Incentivar o turismo cultural e aproximar moradores e visitantes
                da própria história.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Novidades da Prefeitura ===== */}
      <section className="sobre">
        <div className="sobre-inner">
          <div className="section-head">
            <div>
              <h2>Novidades da Prefeitura</h2>
              <p className="sub">
                Editais, restauros e políticas públicas de cultura em andamento
                no município.
              </p>
            </div>
          </div>

          <div className="novidades-grid">
            {novidades.map((n) => (
              <article key={n.id} className="novidade-card">
                <span className="novidade-tag">
                  <MegaphoneIcon width={12} height={12} />
                  {n.tag}
                </span>
                <span className="data">{n.data}</span>
                <h3>{n.titulo}</h3>
                <p>{n.resumo}</p>
                <a
                  className="verlink"
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Saiba mais →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Exposições e artistas em destaque ===== */}
      <section className="sobre">
        <div className="sobre-inner">
          <div className="section-head">
            <div>
              <h2>Exposições e artistas em destaque</h2>
              <p className="sub">
                Mostras em cartaz e artistas locais apoiados pela política
                cultural do município.
              </p>
            </div>
          </div>

          <div className="expo-grid">
            {exposicoes.map((e) => (
              <article key={e.id} className="expo-card">
                <figure>
                  <img src={e.imagem} alt={e.titulo} loading="lazy" />
                </figure>
                <div className="expo-card-body">
                  <span className="periodo">{e.periodo}</span>
                  <h3>{e.titulo}</h3>
                  <span className="artista">{e.artista}</span>
                  <span className="local">{e.local}</span>
                  <p>{e.bio}</p>
                  <div className="expo-cta-row">
                    <a
                      className="btn-solid"
                      href={e.ctaSaibaMais}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Saiba mais
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="expo-callout">
            <div>
              <h3>É artista e quer expor em Guarulhos?</h3>
              <p>
                Fale com a Secretaria de Cultura e saiba como participar dos
                Pontos de Cultura e dos editais municipais.
              </p>
            </div>
            <a className="btn-solid" href={`mailto:${EMAIL_CULTURA}`}>
              <PaintBrushIcon width={16} height={16} />
              Quero expor meu trabalho
            </a>
          </div>
        </div>
      </section>

      <section className="destaques">
        <div className="section-head">
          <div>
            <h2>Como usar a plataforma</h2>
            <p className="sub">
              Hoje o acervo reúne{" "}
              {carregando ? "vários" : (estatisticas?.totalBens ?? 0)} bens
              catalogados em{" "}
              {carregando ? "algumas" : (estatisticas?.totalCategorias ?? 0)}{" "}
              categorias diferentes.
            </p>
          </div>
        </div>
        <div className="sobre-grid">
          <div className="sobre-card">
            <Squares2X2Icon width={24} height={24} />
            <h3>Navegue pelo acervo</h3>
            <p>
              Filtre por categoria e leia o resumo histórico de cada patrimônio
              catalogado.
            </p>
            <button
              className="map-cta-btn"
              style={{
                marginTop: 12,
                color: "#fff",
                background: "var(--blue)",
              }}
              onClick={() => navigate("/patrimonios")}
            >
              Ver patrimônios
            </button>
          </div>
          <div className="sobre-card">
            <MapIcon width={24} height={24} />
            <h3>Explore no mapa</h3>
            <p>
              Veja onde cada bem está localizado na cidade e compare distâncias
              entre eles.
            </p>
            <button
              className="map-cta-btn"
              style={{
                marginTop: 12,
                color: "#fff",
                background: "var(--blue)",
              }}
              onClick={() => navigate("/mapa")}
            >
              Abrir o mapa
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
