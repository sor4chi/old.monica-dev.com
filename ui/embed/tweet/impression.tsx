import { ReactElement } from 'react';
import { AiOutlineRetweet } from 'react-icons/ai';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';

const ImpressionWithIcon = ({
  children,
  count,
}: {
  children: ReactElement;
  count: number;
}) => (
  <span className="flex items-center gap-2 text-sm text-neutral-400">
    {children}
    {count}
  </span>
);

interface Props {
  replyCount: number;
  retweetCount: number;
  likeCount: number;
}

export const Impressions = ({ replyCount, retweetCount, likeCount }: Props) => (
  <div className="flex w-full justify-evenly gap-2">
    <ImpressionWithIcon count={replyCount}>
      <FaRegComment />
    </ImpressionWithIcon>
    <ImpressionWithIcon count={retweetCount}>
      <AiOutlineRetweet />
    </ImpressionWithIcon>
    <ImpressionWithIcon count={likeCount}>
      <FaRegHeart />
    </ImpressionWithIcon>
  </div>
);
