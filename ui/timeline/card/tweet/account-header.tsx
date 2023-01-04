import { dateToRichDisplay } from '#/utils/date';

interface Props {
  name: string;
  username: string;
  created_at: string;
}

export const AccountHeader = ({ name, username, created_at }: Props) => (
  <p className="flex items-center gap-2">
    <span className="font-bold hover:underline">{name}</span>
    <span className="text-sm text-neutral-400">
      @{username}・{dateToRichDisplay(created_at)}
    </span>
  </p>
);
