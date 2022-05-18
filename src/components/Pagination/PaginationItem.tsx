import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: boolean;
  page: number;
}

export function PaginationItem({ isCurrent = false, page }: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button size="sm" fontSize="xs" width="4" colorScheme="pink" disabled _disabled={{
        bgColor: "pink.500",
        cursor: "default",
      }}>{page}</Button>
    )
  } else {
    return (
      <Button size="sm" fontSize="xs" width="4" bg="gray.700" _hover={{
        bg: "gray.500"
      }}>{page}</Button>
    )
  }
}