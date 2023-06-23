import type { ComponentPropsWithoutRef } from 'react';
import type { LinkMeta } from 'remark-link-meta/dist/types';

import { LinkCard } from './card';

type Props = ComponentPropsWithoutRef<'a'> & {
  href: string;
  title?: LinkMeta['title'];
  description?: LinkMeta['description'];
  thumbnailurl?: LinkMeta['thumbnailUrl'];
  iconurl?: LinkMeta['iconUrl'];
};

export const Link = (props: Props) => {
  if (!props.title) return;

  return (
    <LinkCard
      title={props.title}
      href={props.href}
      description={props.description}
      thumbnailurl={props.thumbnailurl}
      iconurl={props.iconurl}
    />
  );
};
