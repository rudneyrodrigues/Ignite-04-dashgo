import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex
      align="center"
    >
      <Box mr="4" textAlign="right">
        <Text>Rudney Rodrigues</Text>
        <Text
          color="gray.300"
          fontSize="small"
        >
          rudney.un2016@gmail.com
        </Text>
      </Box>

      <Avatar size="md" name="Rudney Rodrigues" src="https://github.com/rudneyrodrigues.png" />
    </Flex>
  )
}