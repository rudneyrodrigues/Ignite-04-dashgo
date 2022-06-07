import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
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
// import { useEffect } from "react";
import { RiAddLine } from "react-icons/ri";
import { AiOutlineReload } from "react-icons/ai";
import { useQuery } from "react-query";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export default function UsersList() {
  const thirtyMinutes = 1000 * 60 * 30;

  const {
    data,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useQuery("users", async () => {
    const response = await fetch("http://localhost:3000/api/users");
    const data = await response.json();

    const users = data.users.map((user: any) => {
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

    return users;
  }, {
    staleTime: thirtyMinutes,
  });

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
                <Button size="md" fontSize="md" colorScheme="pink" onClick={
                  () => refetch()
                }>
                  <Icon as={AiOutlineReload} />
                </Button>

                <Link href="/users/create" passHref>
                  <Button as="a" size="md" fontSize="md" colorScheme="pink">
                    <Icon as={RiAddLine} />
                  </Button>
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
                    {data.map((user: User) => (
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

                <Pagination />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  )
}