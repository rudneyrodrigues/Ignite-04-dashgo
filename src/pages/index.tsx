import { Button, Flex, Stack } from '@chakra-ui/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import type { NextPage } from 'next';
import Head from 'next/head';

import { Input } from '../components/Form/Input';

const Home: NextPage = () => {
  const { register, handleSubmit, formState } = useForm();

  const handleSignIn: SubmitHandler<FieldValues> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(values);
  }

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
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={4}>
            <Input
              // name='email'
              label='E-mail'
              type="email"
              {...register('email')}
            />
            <Input
              // name='password'
              label='Senha'
              type="password"
              {...register('password')}
            />
          </Stack>

          <Button
            type='submit'
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default Home;
