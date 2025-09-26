"use client";

import { type ComponentProps, useState } from "react";
import NextLink from "next/link";

type Props = ComponentProps<typeof NextLink>;

export default function Link({ href, children, ...props }: Props) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <NextLink
      href={href}
      prefetch={active ? null : false}
      onMouseEnter={() => setActive(true)}
      {...props}
    >
      {children}
    </NextLink>
  );
}
