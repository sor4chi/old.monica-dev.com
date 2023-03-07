import Link from 'next/link';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof Link> & {
  href: string;
};

export const Anchor = ({ children, href }: Props) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  return (
    <>
      {isInternalLink ? (
        <Link href={href} passHref>
          {children}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )}
    </>
  );
};
