import Image from 'next/image';
import Link from 'next/link';

interface Props {
  username: string;
  profile_image_url?: string;
}

export const AccountIcon = ({ username, profile_image_url }: Props) => (
  <span className="shrink-0">
    {profile_image_url ? (
      <Link href={`https://twitter.com/${username}`} passHref target="_blank">
        <Image
          src={profile_image_url}
          alt={username}
          width={48}
          height={48}
          className="rounded-full hover:opacity-90"
        />
      </Link>
    ) : (
      <div className="h-12 w-12 rounded-full bg-slate-200 hover:opacity-90" />
    )}
  </span>
);
