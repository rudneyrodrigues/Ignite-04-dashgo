import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Geral">
        <NavLink href="/dashboard" icon={RiDashboardLine} title="Dashboard" />
        <NavLink href="/users" icon={RiContactsLine} title="Usuários" />
      </NavSection>

      <NavSection title="Automação">
        <NavLink href="#" icon={RiInputMethodLine} title="Formulários" />
        <NavLink href="#" icon={RiGitMergeLine} title="Automação" />
      </NavSection>
    </Stack>
  )
}