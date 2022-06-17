import {
  Td,
  Th,
  Tr,
  Box,
  Flex,
  Icon,
  Text,
  Table,
  Thead,
  Tbody,
  Heading,
  Spinner,
  Checkbox,
  IconButton,
  useBreakpointValue,
  Link as ChakraLink
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

import { RiAddLine } from "react-icons/ri";
import { AiOutlineReload } from "react-icons/ai";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../services/hooks/users/useUsers";
import { Pagination } from "../../components/Pagination";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function UsersList() {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    error,
    isFetching,
    refetch
  } = useUsers(page);
  // Através do hooks useUsers, pegamos os dados retornados do nosso
  // servidor fake.

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  // Função que realiza o pré-carregamento dos dados do usuário e os salva em cache.
  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`);

      return response.data;
    }, {
      staleTime: 1000 * 60 * 5, // 5 minutos
    })
  }

  return (
    <>
      <Head>
        <title>Users | Dashgo.</title>
      </Head>
      <Box>
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["1rem", "6"]}>
          <Sidebar />

          <Box flex="1" borderRadius={8} bg="gray.800" p={["4", "8"]}>
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Usuários

                {!isLoading && isFetching && (
                  <Spinner
                    size="sm"
                    color="gray.500"
                    ml="4"
                  />
                )}
              </Heading>

              <Flex gap={4}>
                <IconButton
                  aria-label="Recarregar"
                  colorScheme="pink"
                  icon={<Icon as={AiOutlineReload} />}
                  onClick={() => refetch()}
                />

                <Link href="/users/create" passHref>
                  <IconButton
                  as="a"
                  aria-label="Recarregar"
                  colorScheme="pink"
                  icon={<Icon as={RiAddLine} />}
                />
                </Link>
              </Flex>
            </Flex>

            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter dados dos usuários</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha" overflowX="auto">
                  <Thead>
                    <Tr>
                      <Th px={["4", "4", "6"]} color="gray.300" width="8">
                        <Checkbox colorScheme="pink" />
                      </Th>
                      <Th>Usuários</Th>
                      {isWideVersion && <Th>Data de cadastro</Th>}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* O data possivelmente pode ser nulo, então é adicionado
                    um Optional Chaining para evitar uma mensagem de erro */}
                    {data.users?.map((user: User) => (
                      <>
                        <Tr key={user.id}>
                          <Td px={["4", "4", "6"]}>
                            <Checkbox colorScheme="pink" />
                          </Td>
                          <Td>
                            <Box>
                              <ChakraLink color="purple.500" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                <Text fontWeight="bold">{user.name}</Text>
                              </ChakraLink>
                              
                              <Text fontSize="sm" color="gray.300">{user.email}</Text>
                            </Box>
                          </Td>
                          {isWideVersion && <Td>{user.createdAt}</Td>}
                        </Tr>
                      </>
                    ))}
                  </Tbody>
                </Table>

                <Pagination
                  currentPage={page}
                  onChangePage={setPage}
                  totalCountOfRegisters={data.totalCount}
                  registersPerPage={10}
                />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  )
}