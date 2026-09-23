# IA — Mapeamento de tendências culturais

Este documento descreve uma proposta de módulo de inteligência artificial
para o Portal do Patrimônio Cultural de Guarulhos: um modelo que identifica
quais patrimônios, categorias e exposições estão "em alta" — ou seja, com
maior engajamento do público — e expõe isso tanto para quem visita o site
quanto para o administrador no painel `/admin`.

Importante: isto é uma **proposta de arquitetura**, não código pronto. O
objetivo é dar o caminho para implementar de forma incremental, sem exigir
um time de ciência de dados desde o primeiro commit.

---

## 1. Por que isso importa

Hoje o `PatrimoniosProvider` já calcula `estatisticas` (total de bens, total
de categorias) — dado agregado, mas estático: não diz _quais_ patrimônios as
pessoas mais visitam, buscam ou favoritam. Um módulo de tendências resolve
duas dores diferentes:

- **Para o visitante público** — a seção "Destaques" (`.destaques-carousel`,
  já existente na Home) deixa de ser uma lista fixa e passa a refletir o que
  está realmente sendo mais visto naquela semana/mês.
- **Para o admin** — em vez de olhar a lista completa de patrimônios sem
  priorização, o painel `/admin` mostra "isso está em alta, considere
  destacar/atualizar/divulgar".

## 2. De onde vêm os dados (sinais de engajamento)

Nenhum desses sinais existe ainda no código atual — precisam ser
instrumentados primeiro. Em ordem de facilidade de implementação:

| Sinal                                       | Onde capturar                                                 | Esforço                 |
| ------------------------------------------- | ------------------------------------------------------------- | ----------------------- |
| Visualização de página de detalhe           | `PatrimonioDetalhe` (rota `/patrimonios/:id`, ainda a criar)  | Baixo                   |
| Clique em card na Home/carousel             | `.destaque-card` (`onClick`)                                  | Baixo                   |
| Seleção no mapa                             | `mapa-sidebar-item` / marcador no `Mapa.jsx`                  | Baixo                   |
| Favoritar (`.destaque-fav`)                 | Já existe o botão na UI; falta persistir o evento             | Baixo                   |
| Termo buscado na searchbar / `.mapa-search` | Input de busca                                                | Baixo                   |
| Tempo de permanência na página              | `document.visibilitychange` + timestamp                       | Médio                   |
| Menções externas (redes sociais, imprensa)  | API externa (ex.: busca por "Guarulhos" + nome do patrimônio) | Alto — opcional, fase 3 |

Cada evento pode ser enviado para um endpoint simples, por exemplo:

```
POST /eventos
{ "tipo": "visualizacao", "patrimonioId": "2", "timestamp": "..." }
```

No ambiente de dev atual (json-server), isso pode virar uma nova coleção
`eventos` no `db.json`, só para prototipar o formato antes de existir um
backend real.

## 3. Do dado bruto ao "em alta" — três fases

### Fase 1 — Score sem IA (comece aqui)

Antes de qualquer modelo, um **score ponderado simples** já resolve 80% do
problema e é totalmente explicável para o admin:

```
score(patrimonio) =
    3 × visualizações_7d
  + 5 × favoritos_7d
  + 2 × cliques_no_mapa_7d
  + 4 × aparições_em_busca_7d
```

Ordenar os patrimônios por esse score já responde "o que está em alta esta
semana" — e serve de baseline para comparar qualquer modelo mais sofisticado
depois. Isso pode rodar como uma função agendada (cron) ou, no NestJS que já
é usado no dashboard-esg, como um serviço com `@Cron()` recalculando o score
a cada X horas.

### Fase 2 — Tendência de verdade (variação, não só volume)

"Em alta" não é o mesmo que "mais visto" — um patrimônio pode ter muitas
visualizações de forma estável há meses, sem ser tendência. O que indica
tendência é a **variação** no engajamento:

```
tendencia(patrimonio) = score_semana_atual / média(score_últimas_4_semanas)
```

Valores > 1 indicam alta; > 1.5 já é um sinal forte o suficiente para
destacar no admin como "🔥 crescendo". Isso ainda não é machine learning —
é estatística simples — mas já é o que a maioria dos produtos chama de
"trending".

### Fase 3 — Modelo preditivo (opcional, quando houver histórico suficiente)

Só faz sentido com pelo menos alguns meses de dados de eventos acumulados.
Nesse ponto dá para treinar um modelo leve (ex.: regressão ou um classificador
simples) para **prever** quais patrimônios/categorias tendem a crescer nas
próximas semanas, considerando sazonalidade (ex.: a Festa de Bonsucesso
provavelmente pica todo ano na mesma época). Isso pode ser servido via API do
Claude (ver `<anthropic_api_in_artifacts>` deste ambiente) enviando o
histórico de scores e pedindo uma classificação/explicação em linguagem
natural — sem precisar treinar um modelo próprio do zero.

## 4. Onde isso aparece na interface

- **Home / carousel de destaques** — ordenar `.destaques-track` pelo score
  da Fase 1 ou 2 em vez de ordem fixa; adicionar um selo visual (reaproveitar
  o padrão de `.novidade-tag` deste projeto) tipo "Em alta".
- **Painel `/admin`** — um card por patrimônio com score, variação e um
  motivo legível ("+40% de visualizações essa semana"), para o admin decidir
  o que promover, atualizar ou investigar (ex.: um pico de busca pode indicar
  que saiu uma notícia sobre aquele patrimônio, e vale aproveitar o momento
  para divulgar).
- **Seção de exposições/artistas** (como a que foi adicionada em
  `ConhecaMais.jsx`) — o mesmo princípio de score pode ranquear quais
  exposições merecem destaque no topo da grid, em vez de ordem de cadastro.

## 5. Limites e cuidados

- **Não inflar dados**: o score deve refletir comportamento real de uso, não
  virar métrica de vaidade. Cuidado ao expor "queda de tendência" de forma
  pública — pode ser mal interpretado.
- **Privacidade**: eventos de navegação não devem carregar dado pessoal
  identificável. Um `sessionId` anônimo (gerado no cliente, sem login) é
  suficiente para contar visualizações únicas sem rastrear pessoas.
- **Não é uma decisão automática**: o modelo sugere, o admin decide. Isso é
  especialmente importante em um portal de patrimônio público — o que "está
  em alta" não deve, sozinho, decidir o que a Prefeitura escolhe preservar
  ou divulgar.

## 6. Próximo passo concreto

O menor incremento útil, dado o estágio atual do projeto (mock em
`json-server`), é:

1. Adicionar uma coleção `eventos` no `db.json`.
2. Disparar um `POST /eventos` simples ao abrir `/patrimonios/:id` (quando
   essa rota existir) e ao clicar em um `.destaque-card`.
3. Calcular o score da Fase 1 no frontend mesmo (soma simples sobre os
   eventos retornados por `GET /eventos`), só para validar a ideia antes de
   mover isso para o backend real.
