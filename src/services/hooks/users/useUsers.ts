import { useQuery } from "react-query";

import { api } from "../../api";

interface UserProps {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface getUserProps {
  users: UserProps[];
  totalCount: number;
}

// Função que busca os usuários em nosso servidor
// É legal separarmos estas ações, pois caso queiramos buscar algum dado de
// um usuário, não estaremos dependentes do react-query.
export async function getUsers(page: number): Promise<getUserProps> {
  // Aqui estamos fazendo uma chamada à API, que retorna um array de usuários.
  const { data, headers } = await api.get("users", {
    params: {
      page,
    }
  });

  const totalCount = Number(headers["x-total-count"]);

  // Aqui estamos retornando os dados da API, formatados.
  const users = data.users.map((user: UserProps) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-br', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
    }
  })

  return {
    users,
    totalCount,
  };
}

// Hook que busca os usuários
export const useUsers = (page: number) => {
  // Variável que define o tempo em que a query será executada novamente.
  const thirtyMinutes = 1000 * 60 * 30;

  // Aqui retornamos os dados dos usuários e estabelecemos o tempo em que
  // a query será executada novamente.
  return (
    useQuery(["users", page], () => getUsers(page), {
      staleTime: thirtyMinutes,
    })
  )
}