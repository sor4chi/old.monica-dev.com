import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { dateToRichDisplay } from '#/utils/date';

interface Props {
  name: string;
  username: string;
  created_at: Date;
  quote?: boolean;
  id?: string;
}

export const AccountHeader = ({
  name,
  username,
  created_at,
  quote,
  id,
}: Props) => (
  <div className="flex w-full items-start justify-between">
    <p
      className={clsx(
        'flex',
        quote && 'items-center gap-2',
        !quote && 'flex-col items-start',
      )}
    >
      <Link
        href={`https://twitter.com/${username}`}
        passHref
        target="_blank"
        className="font-bold hover:underline"
      >
        {name}
      </Link>
      <span className="text-sm text-neutral-400">
        @{username}
        {quote && `・${dateToRichDisplay(created_at)}`}
      </span>
    </p>
    {!quote && id && (
      <Link
        href={`https://twitter.com/${username}/status/${id}`}
        passHref
        target="_blank"
      >
        <Image src="/twitter.svg" width={24} height={24} alt="Tweet Link" />
      </Link>
    )}
  </div>
);
