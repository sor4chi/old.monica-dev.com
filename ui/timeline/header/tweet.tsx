

import Link from 'next/link';

import { TWITTER_ACCOUNT_NAME } from '#/constants/site';

export const TweetHeader = () => {
  return (
    <>
      <span className="font-medium">New Tweet posted by</span>
      <Link
        className="font-bold text-neutral-700 transition-colors hover:text-neutral-900 dark:text-gray-200 dark:hover:text-gray-100"
        href={`https://twitter.com/${TWITTER_ACCOUNT_NAME}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        @{TWITTER_ACCOUNT_NAME}
      </Link>
    </>
  );
};
