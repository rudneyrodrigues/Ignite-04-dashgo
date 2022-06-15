import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

import { RiAddLine } from "react-icons/ri";
import { AiOutlineReload } from "react-icons/ai";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../services/hooks/users/useUsers";
import { Pagination } from "../../components/Pagination";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function UsersList() {
  const {
    data,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useUsers();
  // Através do hooks useUsers, pegamos os dados retornados do nosso
  // servidor fake.

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

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
                    {data?.map((user: User) => (
                      <>
                        <Tr key={user.id}>
                          <Td px={["4", "4", "6"]}>
                            <Checkbox colorScheme="pink" />
                          </Td>
                          <Td>
                            <Box>
                              <Text fontWeight="bold">{user.name}</Text>
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
                  currentPage={10}
                  onChangePage={() => {}}
                  totalCountOfRegisters={200}
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