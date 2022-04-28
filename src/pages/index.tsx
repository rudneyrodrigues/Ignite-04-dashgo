import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, Flex, Stack } from '@chakra-ui/react';

import { Input } from '../components/Form/Input';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | dashgo</title>
      </Head>

      <Flex
        w="100vw"
        h="100vh"
        align="center"
        justify="center"
      >
        <Flex
          as="form"
          flexDirection="column"
          w="100%"
          maxW="360px"
          bg="gray.800"
          p="8"
          borderRadius=".5rem"
        >
          <Stack spacing={4}>
            <Input name='email' label='E-mail' type="email" />
            <Input name='password' label='Senha' type="password" />
          </Stack>

          <Button type='submit' mt="6" colorScheme="pink" size="lg">Entrar</Button>
        </Flex>
      </Flex>
    </>
  )
}

export default Home;
