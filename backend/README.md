### ⚙️ Backend

src/
├── config/ # Configurações globais (banco de dados, env)
├── controllers/ # Tratamento de requisições e respostas HTTP
├── services/ # Regras de negócio e lógica da aplicação
├── models/ # Mapeamento e esquemas de dados (Mongoose/Prisma)
├── middlewares/ # Interceptadores (validação, upload, auth, erros)
├── routes/ # Mapeamento e declaração dos endpoints REST
├── utils/ # Auxiliares genéricos do servidor
├── app.js # Configuração dos middlewares do Express
└── server.js # Inicialização do servidor HTTP e conexão com BD

| Diretório / Pasta  | Responsabilidade Principal                                                                                           | Exemplos de Arquivos                               |
| :----------------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------- |
| `src/config/`      | Gerencia e centraliza as conexões com bancos de dados, chaves de API e a validação de variáveis de ambiente.         | `database.js`, `env.js`                            |
| `src/controllers/` | Entrada HTTP: extrai parâmetros (`req.body`/`req.params`), aciona a camada de serviço e retorna JSON (`res.json()`). | `patrimonioController.js`, `sugestaoController.js` |
| `src/services/`    | Concentra todas as regras de negócio da aplicação, validações de domínio e orquestração de persistência.             | `patrimonioService.js`, `sugestaoService.js`       |
| `src/models/`      | Define os esquemas de dados e a estrutura de tabelas ou coleções do banco de dados (ORM/ODM).                        | `Patrimonio.js`, `Sugestao.js`                     |
| `src/middlewares/` | Intercepta requisições HTTP para checagens de segurança, validação de entrada, uploads e tratamento de erros.        | `uploadMiddleware.js`, `errorMiddleware.js`        |
| `src/routes/`      | Mapeia os endpoints REST da aplicação e conecta as rotas HTTP aos respectivos métodos dos controllers.               | `patrimonioRoutes.js`, `sugestaoRoutes.js`         |
| `src/utils/`       | Reúne funções auxiliares reutilizáveis no servidor, como manipuladores de log e disparadores de e-mail.              | `emailHelper.js`, `logger.js`                      |
