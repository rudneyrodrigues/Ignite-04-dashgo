import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../styles/theme';
import { SidebarDrawProvider } from '../contexts/SidebarDrawerContext';

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
