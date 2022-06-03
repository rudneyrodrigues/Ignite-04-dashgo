import { createServer, Factory, Model } from 'miragejs';
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
          return faker.date.recent(10).toLocaleDateString();
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
      this.get('/users');
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