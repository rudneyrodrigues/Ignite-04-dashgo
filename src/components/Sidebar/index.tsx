import { Box, Stack, Text, Link, Icon } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSection title="Geral">
          <NavLink icon={RiDashboardLine} title="Dashboard" />
          <NavLink icon={RiContactsLine} title="Usuários" />
        </NavSection>

        <NavSection title="Automação">
          <NavLink icon={RiInputMethodLine} title="Formulários" />
          <NavLink icon={RiGitMergeLine} title="Automação" />
        </NavSection>
      </Stack>
    </Box>
  )
}