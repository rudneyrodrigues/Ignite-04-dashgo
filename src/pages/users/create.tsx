import * as yup from 'yup';
import Head from "next/head";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, Flex, Heading, SimpleGrid, Stack, VStack } from "@chakra-ui/react";

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'Senha deve ter no mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Senhas não conferem'),
});

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  })

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<FieldValues> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(values);
  }

  return (
    <>
      <Head>
        <title>Create User | Dashgo.</title>
      </Head>

      <Box>
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box
            as="form"
            flex="1"
            borderRadius={8}
            bg="gray.800"
            p={["6", "8"]}
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input
                  // name="name"
                  label="Nome completo"
                  error={errors.name}
                  {...register('name')}
                />
                <Input
                  // name="email"
                  type="email"
                  label="E-mail"
                  error={errors.email}
                  {...register('email')}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input
                  // name="password"
                  type="password"
                  label="Senha"
                  error={errors.password}
                  {...register('password')}
                />
                <Input
                  // name="password_confirmation"
                  type="password"
                  label="Confirmação sua senha"
                  error={errors.password_confirmation}
                  {...register('password_confirmation')}
                />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end" >
              <Stack spacing="4" direction={['column', 'row']} w={["full", "auto"]}>
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha" w={["full", "auto"]}>Cancelar</Button>
                </Link>
                <Button
                  type="submit"
                  colorScheme="pink"
                  w={["full", "auto"]}
                  isLoading={formState.isSubmitting}
                >
                  Salvar
                </Button>
              </Stack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  )
}