import NextImage from 'next/image';
import type { ComponentProps } from 'react';

import * as styles from './image.css';

type Props = ComponentProps<typeof NextImage>;

export const Image = (props: Props) => {
  return <NextImage {...props} width={640} height={480} className={styles.image} />;
};
