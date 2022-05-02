import Head from "next/head";
import { Flex } from '@chakra-ui/react';

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Head>
        <title>Dashboard | dashgo</title>
      </Head>

      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
      </Flex>
    </Flex>
  )
}