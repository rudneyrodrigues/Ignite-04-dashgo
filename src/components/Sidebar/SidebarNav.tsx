import { Flex, Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Flex gap="12" flexDir="column" align="flex-start" position="sticky" top="2rem">
      <NavSection title="Geral">
        <NavLink href="/dashboard" icon={RiDashboardLine} title="Dashboard" />
        <NavLink href="/users" icon={RiContactsLine} title="Usuários" />
      </NavSection>

      <NavSection title="Automação">
        <NavLink href="#" icon={RiInputMethodLine} title="Formulários" />
        <NavLink href="#" icon={RiGitMergeLine} title="Automação" />
      </NavSection>
    </Flex>
  )
}