import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  id: string;
}

export const Container = ({ children, id }: Props) => (
  <div className="flex w-full items-center justify-center rounded-md bg-neutral-900">
    <Link
      className="common-card m-4 flex max-w-lg cursor-pointer items-start gap-2 p-4"
      href={`https://twitter.com/0/status/${id}`}
      passHref
      target="_blank"
    >
      {children}
    </Link>
  </div>
);
