import { gql } from 'graphql-request';
import Link from 'next/link';

import * as styles from './list.css';

export const TagListFragment = gql`
  fragment TagListFragment on Tag {
    name
    slug
  }
`;

export type TagListFragmentResponse = {
  name: string;
  slug: string;
};

interface Props {
  tags: TagListFragmentResponse[];
  hrefGenerator: (tag: string) => string;
}

export const TagList = ({ hrefGenerator, tags }: Props) => {
  return (
    <ul className={styles.container}>
      {tags.map((tag) => (
        <li key={tag.name} className={styles.item}>
          <Link href={hrefGenerator(tag.slug)} className={styles.link} passHref>
            {tag.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
