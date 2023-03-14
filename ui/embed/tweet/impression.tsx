import { ReactElement } from 'react';
import { AiOutlineRetweet } from 'react-icons/ai';
import { BiBarChart } from 'react-icons/bi';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';

const ImpressionWithIcon = ({
  children,
  count,
}: {
  children: ReactElement;
  count: number;
}) => (
  <span className="flex flex-1 items-center gap-4 text-base text-neutral-400">
    {children}
    {count}
  </span>
);

interface Props {
  impressionCount: number;
  replyCount: number;
  retweetCount: number;
  likeCount: number;
}

export const Impressions = ({
  impressionCount,
  replyCount,
  retweetCount,
  likeCount,
}: Props) => (
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
    <ImpressionWithIcon count={impressionCount}>
      <BiBarChart />
    </ImpressionWithIcon>
  </div>
);
