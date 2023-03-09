import Link from 'next/link';

import * as styles from './list.css';

type Tag = {
  name: string;
  slug: string;
};

interface Props {
  tags: Tag[];
}

export const TagList = ({ tags }: Props) => {
  return (
    <ul className={styles.container}>
      {tags.map((tag) => (
        <li key={tag.name} className={styles.item}>
          <Link href={`/blog/tags/${tag.slug}`} className={styles.link} passHref>
            {tag.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
