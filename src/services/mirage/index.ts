import { createServer, Factory, Model, Response } from 'miragejs';
// Biblioteca utilizada para gerar valores fakes
import { faker } from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const numberOfUsers = 200;

  const server = createServer({
    // Cria um modelo de usuário
    models: {
      // O modelo de usuário recebe um array de usuários parcial do tipo User
      user: Model.extend<Partial<User>>({}),
    },

    // Cria um factory de usuário, para que possamos gerar usuários aleatórios
    // em grande quantidades
    factories: {
      // O factory deve possuir o mesmo nome do modelo
      user: Factory.extend({
        name() {
          // Retorna um nome aleatório
          return faker.name.findName();
        },
        email() {
          // Retorna um email aleatório
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          // Retorna uma data aleatória
          return faker.date.recent(10);
        },
      }),
    },

    // Cria uma lista de usuários para ser carregada assim que o servidor
    // for iniciado
    seeds(server) {
      // Cria uma lista de usuários utilizando o factory user.
      // O número de usuários criados é definido pelo parâmetro "numberOfUsers"
      server.createList('user', numberOfUsers);
    },

    routes() {
      // Define o namespace do servidor
      this.namespace = "api";
      // Define a duração para carregamento dos dados
      this.timing = 750; // 750 milisegundos

      // Cria uma rota de get para o endpoint /users
      this.get('/users', function (schema, req) {
        // Através do queryParams, recebemos 2 parametros. O numero de paginas e
        // a quantidade de dados por pagina.
        const { page = 1, per_page = 10 } = req.queryParams;

        // Calculamos a quantidade de usuarios que há em nossa aplicação.
        const total = schema.all('user').length;

        // Calculamos o numero de usuarios que será exibido por paginas.
        // Como nossos registros começas do zero, realizamos o seguinte calculo:
        // (Numero de paginas - 1) * Numero de usuarios por pagina.
        const pageStart = (Number(page) - 1) * Number(per_page);
        // Pagina inicial + Numero de usuarios por pagina.
        const pageEnd = pageStart + Number(per_page);
        // O resultado ficara desta forma:

        // (1-1) * 10 = 0 // 0 + 10 = 10; // Primeira pagina ira exibir os usuarios de 0 a 10
        // (2-1) * 10 = 10 // 10 + 20 = 20; // Segunda pagina ira exibir os usuarios de 10 a 20
        // E assim em diante.

        // Nesta variavel, guardamos os usuarios da pagina exibida.
        const users = this.serialize(schema.all('user')).users.slice(pageStart, pageEnd);

        // Retornamos uma resposta contendo o status da requisiçao, uma variavel
        // com o numero total de paginas e os usuarios encontrados para a pagina
        // atual.
        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        )
      });

      this.get('/users/:id');
      
      // Cria uma rota de post para o endpoint /users
      this.post('/users');

      this.namespace = "";
      
      // Esta função é utilizada apenas no Next.js, para que todas as solicitações
      // a API passem pelo servidor Mirage . E caso não haja nenhuma rota definida,
      // será redirecionado para as API Routes do Next.js
      this.passthrough();
    },
  });

  return server;
}