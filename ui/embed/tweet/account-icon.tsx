import Image from 'next/image';

interface Props {
  username: string;
  profile_image_url: string;
}

export const AccountIcon = ({ username, profile_image_url }: Props) => (
  <span className="shrink-0">
    <Image
      src={profile_image_url}
      alt={username}
      width={48}
      height={48}
      className="rounded-full hover:opacity-90"
    />
  </span>
);
