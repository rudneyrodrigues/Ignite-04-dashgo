import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  // Numero total de registros
  totalCountOfRegisters: number;
  // Numero de registros por pagina
  registersPerPage?: number;
  // Numero da pagina atual
  currentPage?: number;
  // Funcao que sera executada ao clicar em um item do paginador
  onChangePage: (page: number) => void;
}

// Quantidade de páginas que serão exibidas ao lado da pagina atual
const siblingsCount = 1;

// Quantidade de páginas que serão exibidas no início e no fim do paginador
function generatePagesArray(from: number, to: number) {
  // Array que será retornado com as páginas do paginador
  return [...new Array(to - from)]
  .map((_, index) => {
    return from + index + 1;
  })
  .filter(page => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onChangePage,
}: PaginationProps) {
  const userStart = (currentPage - 1) * registersPerPage;
  const userEnd = userStart + registersPerPage;

  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  // Variável que verifica as paginas anteriores da pagina atual
  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : [];

  // Variável que verifica as paginas posteriores da pagina atual
  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  return (
    <Stack direction={["column", "row"]} mt="8" justify="space-between" align="center" spacing="6">
      <Box>
        <strong>{userStart}</strong> - <strong>{userEnd}</strong> de <strong>{totalCountOfRegisters}</strong>
      </Box>
      <Stack direction="row" spacing="2">

        {/* Caso a pagina atual seja maior que 2,
            este componente será exibido */}
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onChangePage={onChangePage} page={1} />
            {currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" w="8" textAlign="center">...</Text>
            )}
          </>
        )}

        {/* Este componente será exibido caso a previousPages
            seja maior que zero */}
        {previousPages.length > 0 && previousPages.map(page => {
          return (
            <PaginationItem onChangePage={onChangePage} key={page} page={page} />
        )})}
        
        <PaginationItem onChangePage={onChangePage} page={currentPage} isCurrent />

        {/* Este componente será exibido caso a nextPages
            seja maior que zero */}
        {nextPages.length > 0 && nextPages.map(page => {
          return (
            <PaginationItem onChangePage={onChangePage} key={page} page={page} />
        )})}
        
        {/* Caso a ultima pagina seja maior que a pagina atual + 1,
            este componente será exibido */}
        {(currentPage + siblingsCount) < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage && (
              <Text color="gray.300" w="8" textAlign="center">...</Text>
            )}
            <PaginationItem onChangePage={onChangePage} page={lastPage} />
          </>
        )}
        
      </Stack>
    </Stack>
  );
}