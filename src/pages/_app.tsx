import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from 'react-query/devtools'

import { QueryClientProvider } from 'react-query';
import { SidebarDrawProvider } from '../contexts/SidebarDrawerContext';

import { theme } from '../styles/theme';
import { makeServer } from '../services/mirage';
import { queryClient } from '../services/queryClient';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

// Cria um novo cliente no React Query


function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Provider do React Query, que recebe a constante criada acima.
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawProvider>
          <Component {...pageProps} />
        </SidebarDrawProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
