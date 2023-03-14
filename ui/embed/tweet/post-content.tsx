import Link from 'next/link';
import { Suspense } from 'react';

import { MediaGrid } from '#/ui/embed/tweet/media-grid';

import { TweetEmbed } from '.';

const UrlLink = (url: string, text?: string) => (
  <Link
    key={url}
    href={url}
    passHref
    target="_blank"
    className="main-gradient-text"
  >
    {text || url}
  </Link>
);

const replaceUrl = (text: string) => {
  const regex = /(https?:\/\/[^\s]+|@[a-zA-Z0-9_]+)/g;
  const split = text.split(regex);
  return split.map((str) => {
    if (str.match(regex) === null) return str;
    if (str.match(/https?:\/\/[^\s]+/g)) return UrlLink(str);
    if (str.match(/@[a-zA-Z0-9_]+/g))
      return UrlLink(`https://twitter.com/${str.slice(1)}`, str);
  });
};

interface Props {
  text: string;
  quote_id?: string;
  media_urls: string[];
}

export const PostContent = ({ text, media_urls, quote_id }: Props) => (
  <>
    <span className="whitespace-pre-wrap text-sm">{replaceUrl(text)}</span>
    {media_urls.length > 0 && <MediaGrid media_urls={media_urls} />}
    {quote_id && (
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error Async Server Component */}
        <TweetEmbed id={quote_id} quote />
      </Suspense>
    )}
  </>
);
