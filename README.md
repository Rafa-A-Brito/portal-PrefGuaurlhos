# 🏛️ Patrimônio Histórico de Guarulhos — Portal Cultural & Mapeamento

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=black)
![Google Maps API](https://img.shields.io/badge/Google%20Maps%20API-v3-4285F4?style=flat&logo=googlemaps&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS-3.0-1572B6?style=flat&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-REST%20API-339933?style=flat&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

Aplicação web interativa para o mapeamento, consulta e preservação da memória dos patrimônios históricos da cidade de Guarulhos. A plataforma permite a navegação por rotas culturais, visualização em mapa interativo via Google Maps, análise de dados estatísticos e mecanismos avançados de pesquisa e filtragem.

---

## 📌 Funcionalidades Principais

- **🗺️ Mapeamento Interativo & Rotas:** Geolocalização dos bens patrimoniais em Guarulhos utilizando a API do Google Maps com suporte a traçamento de rotas históricas.
- **🔍 Pesquisa & Filtros Avançados:** Filtros dinâmicos por categoria (arquitetônico, imaterial, natural), época histórica, bairro e estado de conservação.
- **📊 Painel Estatístico & Análises:** Gráficos interativos para análise de visitação, tombamentos e distribuição geográfica dos patrimônios.
- **🌐 Consumo de API REST:** Comunicação completa com API Backend para busca performática e persistência de dados.
- **🎨 Estilização Customizada:** Interface responsiva construída com CSS puro, sem dependência de frameworks visuais.

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Core:** React.js, JavaScript (ES6+), HTML5
- **Estilização:** CSS3 Puro (Flexbox, CSS Grid, Custom Properties/Variables)
- **Mapeamento & Geolocalização:** `@react-google-maps/api` / Google Maps JavaScript API
- **Gráficos & Dashboards:** `recharts` / `chart.js`
- **Ícones:** `lucide-react`
- **Requisições HTTP:** `axios`

### Backend & API _(Arquitetura Integrada)_

- **API RESTful:** Node.js / Express (ou NestJS)
- **Banco de Dados:** PostgreSQL / MongoDB / Prisma ORM

---

## 📐 Arquitetura do Sistema

```text
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                       │
│ (UI Components, Pure CSS, Google Maps API, Recharts)    │
└───────────────────────────┬─────────────────────────────┘
                            │  HTTP / JSON (REST API)
┌───────────────────────────▼─────────────────────────────┐
│                    Backend Server                       │
│      (Controllers, Routing, Auth & Geolocation)        │
└───────────────────────────┬─────────────────────────────┘
                            │  Queries / ORM
┌───────────────────────────▼─────────────────────────────┐
│                       Database                          │
│               (Patrimônios, Rotas, Usuários)            │
└───────────────────────────┴─────────────────────────────┘
```
