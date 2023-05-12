import Link from 'next/link';
import type { ComponentProps } from 'react';
import { MdOpenInNew } from 'react-icons/md';

type Props = ComponentProps<typeof Link> & {
  href: string;
};

export const Anchor = ({ children, href, ...rest }: Props) => {
  if (href.startsWith('/')) {
    return (
      <Link href={href} passHref {...rest}>
        {children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      <span>{children}</span>
      <MdOpenInNew />
    </a>
  );
};
