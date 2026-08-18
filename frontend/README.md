## 📁 Estrutura de Pastas e Arquitetura

O projeto adota os princípios de **Clean Architecture**, **Desacoplamento de Camadas** e **Organização por Domínio (Feature-based)**. Abaixo está a especificação da árvore de diretórios e a responsabilidade de cada pasta no Frontend e no Backend.

---

### 🎨 Frontend

Estruturado com foco na separação por funcionalidades (features), reutilização de componentes visuais e isolamento de integrações externas.

```text
src/
├── assets/                 # Mídias estáticas importadas via JS/JSX
├── components/             # Componentes de UI genéricos e reutilizáveis
│   └── ui/
├── features/               # Módulos principais isolados por regra de negócio
│   ├── mapa/               # Feature: Mapa Interativo de Patrimônios
│   │   ├── components/
│   │   └── styles/
│   └── sugestoes/          # Feature: Envio de Sugestões pelos Cidadãos
│       ├── components/
│       └── styles/
├── services/               # Configuração de API e chamadas HTTP desacopladas
├── mocks/                  # Dados simulados para desenvolvimento local/testes
├── utils/                  # Funções utilitárias e formatadores puros
├── App.jsx                 # Componente raiz e estrutura de layout
└── main.jsx                # Ponto de entrada do React com Vite
```

| Diretório / Pasta         | Responsabilidade Principal                                                                               | Exemplos de Arquivos                          |
| :------------------------ | :------------------------------------------------------------------------------------------------------- | :-------------------------------------------- |
| `src/assets/`             | Armazena mídias estáticas importadas diretamente dentro dos arquivos JS/JSX.                             | `logo-guarulhos.svg`, `hero-banner.png`       |
| `src/components/ui/`      | Concentra componentes visuais genéricos sem regra de negócio acoplada (Design System básico).            | `Button.jsx`, `Modal.jsx`                     |
| `src/features/mapa/`      | Agrupa a renderização do mapa, pins interativos, janelas de informação (InfoWindows) e seus estilos CSS. | `MapaPatrimonios.jsx`, `mapa.css`             |
| `src/features/sugestoes/` | Contém o formulário de envio, o gerenciamento de estado local e as validações para a colaboração cidadã. | `FormularioSugestao.jsx`, `formulario.css`    |
| `src/services/`           | Centraliza a instância do Axios e isola todas as chamadas HTTP para a API fora do ciclo do React.        | `api.js`, `sugestoesService.js`               |
| `src/mocks/`              | Fornece massas de dados JSON simuladas para desenvolvimento e testes offline sem consumir APIs pagas.    | `patrimoniosMock.json`, `categoriasMock.json` |
| `src/utils/`              | Reúne funções utilitárias puras, sem estado e sem dependência direta do ciclo de vida do React.          | `formatters.js`, `validators.js`              |

---
