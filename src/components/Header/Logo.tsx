import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      // w="64"
      mr={["2", "40"]}
    >
      dashgo
      <Text as="span" ml="1" color="pink.500">.</Text>
    </Text>
  )
}