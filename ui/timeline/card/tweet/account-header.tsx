import clsx from 'clsx';

import { dateToRichDisplay } from '#/utils/date';

interface Props {
  name: string;
  username: string;
  created_at: Date;
  vertical?: boolean;
}

export const AccountHeader = ({
  name,
  username,
  created_at,
  vertical,
}: Props) => (
  <p
    className={clsx(
      'flex',
      !vertical && 'items-center gap-2',
      vertical && 'flex-col items-start',
    )}
  >
    <span className="font-bold hover:underline">{name}</span>
    <span className="text-sm text-neutral-400">
      @{username}
      {!vertical && `・${dateToRichDisplay(created_at)}`}
    </span>
  </p>
);
