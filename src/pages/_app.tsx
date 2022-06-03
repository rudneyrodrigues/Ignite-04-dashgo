import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { SidebarDrawProvider } from '../contexts/SidebarDrawerContext';

import { theme } from '../styles/theme';
import { makeServer } from '../services/mirage';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawProvider>
        <Component {...pageProps} />
      </SidebarDrawProvider>
    </ChakraProvider>
  )
}

export default MyApp
