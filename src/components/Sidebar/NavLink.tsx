import { Icon, Text, Link, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";

interface NavLinkProps extends ChakraLinkProps {
  title: string;
  icon: ElementType; //Definimos uma propriedade do tipo ElementType, quando recebemos apenas a referência do componente, não precisamos definir o tipo do componente
}

export function NavLink({ title, icon, ...rest }: NavLinkProps) {
  return (
    <Link display="flex" alignItems="center" py="1" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">{title}</Text>
    </Link>
  )
}