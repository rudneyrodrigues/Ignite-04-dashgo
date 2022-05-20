import { Box, Button, Divider, Flex, Heading, SimpleGrid, Stack, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export default function CreateUser() {
  return (
    <>
      <Head>
        <title>Create User | Dashgo.</title>
      </Head>

      <Box>
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1"borderRadius={8} bg="gray.800" p={["6", "8"]}>
            <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input name="name" label="Nome completo" />
                <Input name="email" type="email" label="E-mail" />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input name="password" type="password" label="Senha" />
                <Input name="password_confirmation" type="password" label="Confirmação sua senha" />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end" >
              <Stack spacing="4" direction={['column', 'row']} w={["full", "auto"]}>
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha" w={["full", "auto"]}>Cancelar</Button>
                </Link>
                <Button colorScheme="pink" w={["full", "auto"]}>Salvar</Button>
              </Stack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  )
}