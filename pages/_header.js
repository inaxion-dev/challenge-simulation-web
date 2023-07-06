import React from "react";
import { HamburgerIcon, HStack, Link, Menu, Pressable, useBreakpointValue } from "native-base";

export default function Header() {
  const flexDir = useBreakpointValue({
    base: "column",
    md: "row"
  });
  const isDeskTop = flexDir === "row";
  return (
    isDeskTop ?
      <HStack space="md">
        <Link href="/">Home</Link>
        <Link href="/products">Catalog</Link>
      </HStack>
      :
      <Menu trigger={triggerProps => (
        <Pressable {...triggerProps}>
          <HamburgerIcon size="lg" />
        </Pressable>
      )}>
        <Menu.Item><Link href="/">Home</Link></Menu.Item>
        <Menu.Item><Link href="/products">Catalog</Link></Menu.Item>
      </Menu>
  )
}
