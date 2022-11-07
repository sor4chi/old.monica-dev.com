'use client';
import Link from 'next/link';

export const Anchor = ({ href, children }: JSX.IntrinsicElements['a']) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  return (
    <>
      {isInternalLink ? (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )}
    </>
  );
};
